import { RenderMode, ServerRoute } from '@angular/ssr';
import { WORLDS } from './shared/catalog.config';

const LANGS = ['uz', 'ru', 'en'];
const langParams = async () => LANGS.map((lang) => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/katalog', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  {
    path: ':lang/katalog/:world',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => LANGS.flatMap((lang) => WORLDS.map((w) => ({ lang, world: w.slug }))),
  },
  { path: ':lang/biz-haqimizda', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/aloqa', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/**', renderMode: RenderMode.Client },
];
