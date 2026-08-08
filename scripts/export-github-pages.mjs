import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "minoli-lanka-tours";
const basePath = `/${repositoryName}`;
const outputDirectory = new URL("../out/", import.meta.url);
const clientDirectory = new URL("../dist/client/", import.meta.url);
const workerUrl = new URL(`../dist/server/index.js?static-export=${Date.now()}`, import.meta.url);

const routes = [
  "/",
  "/about",
  "/tours",
  "/contact",
  "/kandy-city-tour",
  "/sigiriya-day-tour-from-kandy",
  "/nuwara-eliya-day-tour-from-kandy",
  "/kitulgala-day-tour-from-kandy",
  "/polonnaruwa-day-tour-from-kandy",
  "/sri-lanka-classic-highlights-4-days",
  "/sri-lanka-grand-highlights-7-days",
  "/sri-lanka-coastal-cultural-odyssey-8-days",
  "/sri-lanka-complete-discovery-10-days",
  "/sri-lanka-grand-odyssey-14-days",
];

function directImagePath(_match, encodedPath) {
  return decodeURIComponent(encodedPath);
}

const staticFormScript = `<script>
document.addEventListener("submit", function (event) {
  var form = event.target;
  if (!form.matches(".inquiry-form")) return;
  event.preventDefault();
  var data = new FormData(form);
  var subject = encodeURIComponent("Sri Lanka tour inquiry from " + (data.get("name") || "a guest"));
  var body = [
    "Full Name: " + (data.get("name") || ""),
    "Email Address: " + (data.get("email") || ""),
    "WhatsApp / Phone Number: " + (data.get("phone") || ""),
    "Travel Dates: " + (data.get("dates") || ""),
    "Number of Travelers: " + (data.get("travelers") || ""),
    "Type of Tour Interested In: " + (data.get("tourType") || ""),
    "Interests: " + (data.get("interests") || ""),
    "",
    data.get("message") || ""
  ].join("\\n");
  window.location.href = "mailto:info@minolilankatours.com?subject=" + subject + "&body=" + encodeURIComponent(body);
});
</script>`;

function rewriteHtml(html) {
  return html
    .replace(/\/_vinext\/image\?url=([^&"'\\\s]+)(?:&amp;|&)w=\d+(?:&amp;|&)q=\d+/g, directImagePath)
    .replace(/(["'])\/(?=[A-Za-z0-9_])/g, `$1${basePath}/`)
    .replace(/(["'])\/\1/g, `$1${basePath}/$1`)
    .replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`)
    .replace(/<link\s+rel="modulepreload"[^>]*\/?>/g, "")
    .replace(/<script(?:\s[^>]*)?>[\s\S]*?<\/script>/g, "")
    .replace(/\snovalidate=""/gi, "")
    .replace("</body>", `${staticFormScript}</body>`);
}

async function cssFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await cssFiles(path));
    if (entry.isFile() && extname(entry.name) === ".css") files.push(path);
  }
  return files;
}

await cp(clientDirectory, outputDirectory, { recursive: true, force: true });

const { default: worker } = await import(workerUrl.href);
const environment = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const context = { waitUntil() {}, passThroughOnException() {} };

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`http://localhost${route}`, { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  if (!response.ok) throw new Error(`Static export failed for ${route}: ${response.status}`);
  const destination = route === "/"
    ? new URL("index.html", outputDirectory)
    : new URL(`.${route}/index.html`, outputDirectory);
  await mkdir(dirname(destination.pathname), { recursive: true });
  await writeFile(destination, rewriteHtml(await response.text()));
}

for (const file of await cssFiles(outputDirectory.pathname)) {
  const css = await readFile(file, "utf8");
  await writeFile(file, css.replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`));
}

await writeFile(new URL(".nojekyll", outputDirectory), "");
await cp(new URL("index.html", outputDirectory), new URL("404.html", outputDirectory));
console.log(`Exported ${routes.length} routes for GitHub Pages at ${basePath}/`);
