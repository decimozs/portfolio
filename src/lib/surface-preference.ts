export type SurfacePreference = "web" | "agent";

const SURFACE_PREFERENCE_KEY = "portfolio-surface:v1";

export function saveSurfacePreference(surface: SurfacePreference): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(SURFACE_PREFERENCE_KEY, surface);
  } catch (err) {
    console.error("Failed to save surface preference", err);
  }
}
