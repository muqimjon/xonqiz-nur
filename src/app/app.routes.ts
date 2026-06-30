import { Routes } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { langResolver } from './shared/lang.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      let lang = 'uz';
      if (isPlatformBrowser(inject(PLATFORM_ID))) {
        try {
          const s = localStorage.getItem('xn-lang');
          if (s === 'uz' || s === 'ru' || s === 'en') lang = s;
        } catch {}
      }
      return `/${lang}`;
    },
  },
  {
    path: ':lang',
    resolve: { lang: langResolver },
    children: [
      { path: '', loadComponent: () => import('./pages/landing/landing.page').then((m) => m.LandingPage) },
      { path: 'katalog', loadComponent: () => import('./pages/catalog-hub/catalog-hub.page').then((m) => m.CatalogHubPage) },
      { path: 'katalog/:world', loadComponent: () => import('./pages/category/category.page').then((m) => m.CategoryPage) },
      { path: 'biz-haqimizda', loadComponent: () => import('./pages/about/about.page').then((m) => m.AboutPage) },
      { path: 'aloqa', loadComponent: () => import('./pages/contact/contact.page').then((m) => m.ContactPage) },
      { path: '**', loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage) },
    ],
  },
];
