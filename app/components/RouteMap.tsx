import type { CSSProperties } from "react";
import type { RoutePoint, TourRoute } from "../site-content";

type RouteStyle = CSSProperties & Record<`--${string}`, string>;

function segmentStyle(from: RoutePoint, to: RoutePoint, index: number): RouteStyle {
  const deltaX = to.x - from.x;
  const deltaY = (to.y - from.y) * 1.18;
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  return {
    left: `${from.x}%`,
    top: `${from.y}%`,
    width: `${distance}%`,
    "--route-angle": `${angle}deg`,
    "--route-delay": `${index * 120}ms`,
  };
}

function pointStyle(point: RoutePoint, index: number): RouteStyle {
  return {
    left: `${point.x}%`,
    top: `${point.y}%`,
    "--route-delay": `${180 + index * 120}ms`,
  };
}

export function RouteMap({ route, compact = false, variant = 0 }: { route: TourRoute; compact?: boolean; variant?: number }) {
  return (
    <div className={`animated-route-map map-variant-${variant % 5} ${compact ? "map-compact" : ""}`} aria-label={route.label}>
      <div className="route-map-stage">
        <span className="map-aura" />
        <span className="island-shape" />
        <span className="island-contours" />
        <span className="map-scan" />
        {route.points.slice(0, -1).map((point, index) => (
          <span className="map-segment" style={segmentStyle(point, route.points[index + 1], index)} key={`segment-${index}`} />
        ))}
        {route.points.map((point, index) => (
          <span className="map-point" style={pointStyle(point, index)} key={`${point.name}-${index}`}>
            <span className="map-point-dot" />
            <span className="map-point-label">{point.name}</span>
          </span>
        ))}
        <span className="map-compass"><b>N</b><i /></span>
      </div>
      {!compact && (
        <ol className="route-map-key">
          {route.points.map((point, index) => <li key={`${point.name}-key-${index}`}><span>{String(index + 1).padStart(2, "0")}</span>{point.name}</li>)}
        </ol>
      )}
    </div>
  );
}

