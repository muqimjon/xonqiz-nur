import { Routes } from '@angular/router';
import { langResolver } from './shared/lang.resolver';

const pages: Routes = [
  { path: '', loadComponent: () => import('./pages/landing/landing.page').then((m) => m.LandingPage) },
  { path: 'katalog', loadComponent: () => import('./pages/catalog-hub/catalog-hub.page').then((m) => m.CatalogHubPage) },
  { path: 'katalog/:world', loadComponent: () => import('./pages/category/category.page').then((m) => m.CategoryPage) },
  { path: 'biz-haqimizda', loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage) },
  { path: 'aloqa', loadComponent: () => import('./pages/contact/contact.page').then((m) => m.ContactPage) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage) },
];

export const routes: Routes = [
  { path: 'ru', data: { lang: 'ru' }, resolve: { lang: langResolver }, children: pages },
  { path: 'en', data: { lang: 'en' }, resolve: { lang: langResolver }, children: pages },
  { path: '', data: { lang: 'uz' }, resolve: { lang: langResolver }, children: pages },
];
