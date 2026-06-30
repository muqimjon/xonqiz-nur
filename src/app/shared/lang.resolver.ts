import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TranslationService, Lang } from '../services/translation.service';

export const langResolver: ResolveFn<boolean> = (route) => {
  const lang = route.paramMap.get('lang');
  if (lang === 'uz' || lang === 'ru' || lang === 'en') {
    inject(TranslationService).setLang(lang as Lang, false);
  }
  return true;
};
