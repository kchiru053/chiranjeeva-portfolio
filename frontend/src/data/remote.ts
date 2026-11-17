import * as data from './portfolio';

/**
 * Optional: when the Spring Boot backend is running it serves the same data as JSON at /api/portfolio.
 * We load it before the first render and copy it into the bundled objects, so editing
 * backend/src/main/resources/portfolio.json (and restarting the server) changes the site
 * without rebuilding the frontend. If the request fails (e.g. `npm run dev` with no backend),
 * the data bundled in portfolio.ts is used instead.
 */
type Json = Record<string, unknown>;

/** True once /api/portfolio answered, i.e. the Spring Boot backend is serving this page. */
export const runtime = { backend: false };

export async function loadRemotePortfolio(): Promise<'remote' | 'bundled'> {
  try {
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 2500);
    const res = await fetch('/api/portfolio', { signal: ctrl.signal, headers: { Accept: 'application/json' } });
    window.clearTimeout(timer);
    if (!res.ok) return 'bundled';
    const remote = (await res.json()) as Json;
    if (!remote || typeof remote !== 'object' || !remote.profile || !Array.isArray(remote.projects)) return 'bundled';

    const target = data as unknown as Json;
    for (const key of Object.keys(remote)) {
      const live = target[key];
      const next = remote[key];
      if (Array.isArray(live) && Array.isArray(next)) {
        live.splice(0, live.length, ...next);
      } else if (live && typeof live === 'object' && next && typeof next === 'object') {
        // Replace keys outright so removed optional fields (e.g. portrait, linkedin) disappear.
        for (const k of Object.keys(live as Json)) delete (live as Json)[k];
        Object.assign(live as Json, next);
      }
    }
    runtime.backend = true;
    return 'remote';
  } catch {
    return 'bundled';
  }
}
