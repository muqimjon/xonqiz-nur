import { RenderMode, ServerRoute } from '@angular/ssr';
import { WORLDS } from './shared/catalog.config';

const worldParams = async () => WORLDS.map((w) => ({ world: w.slug }));

const pageRoutes = (p: string): ServerRoute[] => {
  const base = p ? `${p}/` : '';
  return [
    { path: p, renderMode: RenderMode.Prerender },
    { path: `${base}katalog`, renderMode: RenderMode.Prerender },
    { path: `${base}katalog/:world`, renderMode: RenderMode.Prerender, getPrerenderParams: worldParams },
    { path: `${base}biz-haqimizda`, renderMode: RenderMode.Prerender },
    { path: `${base}aloqa`, renderMode: RenderMode.Prerender },
  ];
};

export const serverRoutes: ServerRoute[] = [
  ...pageRoutes(''),
  ...pageRoutes('ru'),
  ...pageRoutes('en'),
  { path: '**', renderMode: RenderMode.Client },
];
