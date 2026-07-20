import { SitePage } from "./components/SitePage";
import { SiteShell } from "./components/SiteShell";
import { pages } from "./site-content";

export default function Home() {
  return <SiteShell><SitePage page={pages.home} /></SiteShell>;
}
