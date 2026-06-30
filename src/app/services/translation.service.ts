import { Injectable, signal } from '@angular/core';

export type Lang = 'uz' | 'ru' | 'en';

export interface Translations {
  nav: { home: string; products: string; about: string; location: string; contact: string; };
  hero: { badge: string; title1: string; title2: string; title3: string; desc: string; cta: string; ctaSecondary: string; stat1: string; stat1label: string; stat2: string; stat2label: string; stat3: string; stat3label: string; };
  products: { title: string; subtitle: string; electric: string; plumbing: string; electricItems: string[]; plumbingItems: string[]; };
  about: { title: string; subtitle: string; desc1: string; desc2: string; feature1: string; feature2: string; feature3: string; feature1d: string; feature2d: string; feature3d: string; };
  location: { title: string; subtitle: string; address: string; addressVal: string; district: string; districtVal: string; hours: string; hoursVal: string; navigate: string; };
  contact: { title: string; subtitle: string; phone: string; email: string; telegram: string; address: string; addressVal: string; };
  footer: { rights: string; tagline: string; };
}

const UZ: Translations = {
  nav: { home: "Bosh sahifa", products: "Mahsulotlar", about: "Biz haqimizda", location: "Manzil", contact: "Aloqa" },
  hero: {
    badge: "Farg'ona viloyati, Xonqiz qishlog'i",
    title1: "Elektr va", title2: "Santexnika", title3: "Do'koni",
    desc: "Lyustradan izolentagacha, trubadan nasossacha — hamma narsa bir joyda. Xonqiz Nur — ishonchli va sifatli ta'minot manbaingiz.",
    cta: "Biz bilan bog'laning", ctaSecondary: "Manzilni ko'rish",
    stat1: "2021", stat1label: "Tashkil etilgan", stat2: "500+", stat2label: "Mahsulot turi", stat3: "100%", stat3label: "Sifat kafolati"
  },
  products: {
    title: "Mahsulotlar", subtitle: "Keng assortiment va sifatli tovarlar",
    electric: "Elektr mahsulotlar", plumbing: "Santexnika mahsulotlar",
    electricItems: ["Lyustra va chiroqlar", "Rozetka va kalitlar", "Kabel va simlar", "Avtomatik uzgichlar", "Rubilniklar", "Elektr asbob-uskunalar", "Izolenta va qoplamalar", "Energiya hisoblagichlari"],
    plumbingItems: ["Truba va ulagichlar", "Kran va ventillar", "Unitaz va rakovina", "Suv nasosi", "Shlang va tirkamalar", "Dush va vanna uskunalari", "Suv filtrlari", "Qaychi va asboblar"]
  },
  about: {
    title: "Biz haqimizda", subtitle: "Xonqiz Nur — ishonchli hamkoringiz",
    desc1: "2021 yildan buyon Farg'ona viloyati, Xonqiz qishlog'ida elektr va santexnika mahsulotlari sohasida xizmat ko'rsatib kelamiz.",
    desc2: "\"XONQIZ NUR\" xususiy korxonasi sifatida rasmiy ro'yxatdan o'tgan va mahalliy aholi va tadbirkorlarning ishonchli ta'minot manbaiga aylangan.",
    feature1: "Katta assortiment", feature2: "Sifat kafolati", feature3: "Tez xizmat",
    feature1d: "500 dan ortiq turdagi elektr va santexnika mahsulotlari", feature2d: "Faqat sertifikatli va sifatli tovarlar savdosi", feature3d: "Tez va qulay xizmat ko'rsatish"
  },
  location: {
    title: "Bizning manzil", subtitle: "Bizni topish oson",
    address: "Manzil", addressVal: "Xonqiz qishlog'i, Farg'ona tumani",
    district: "Viloyat", districtVal: "Farg'ona viloyati, O'zbekiston",
    hours: "Ish vaqti", hoursVal: "Dushanba–Shanba: 09:00–18:00",
    navigate: "Yo'l ko'rsatish (Yandex Maps)"
  },
  contact: {
    title: "Aloqa", subtitle: "Biz bilan bog'laning",
    phone: "Telefon", email: "Email", telegram: "Telegram", address: "Manzil",
    addressVal: "Xonqiz qishlog'i, Farg'ona tumani, Farg'ona viloyati"
  },
  footer: { rights: "Barcha huquqlar himoyalangan", tagline: "Elektr va santexnika mahsulotlari" }
};

const RU: Translations = {
  nav: { home: "Главная", products: "Товары", about: "О нас", location: "Адрес", contact: "Контакты" },
  hero: {
    badge: "Ферганская область, сел. Хонкиз",
    title1: "Электро и", title2: "Сантехника", title3: "Магазин",
    desc: "От люстры до изоленты, от трубы до насоса — всё в одном месте. Xonqiz Nur — ваш надёжный источник качественных товаров.",
    cta: "Связаться с нами", ctaSecondary: "Посмотреть адрес",
    stat1: "2021", stat1label: "Основан", stat2: "500+", stat2label: "Видов товаров", stat3: "100%", stat3label: "Гарантия качества"
  },
  products: {
    title: "Товары", subtitle: "Широкий ассортимент качественных товаров",
    electric: "Электротовары", plumbing: "Сантехника",
    electricItems: ["Люстры и светильники", "Розетки и выключатели", "Кабель и провода", "Автоматические выключатели", "Рубильники", "Электроинструменты", "Изолента и покрытия", "Счётчики электроэнергии"],
    plumbingItems: ["Трубы и фитинги", "Краны и вентили", "Унитазы и раковины", "Водяной насос", "Шланги и соединители", "Душ и ванное оборудование", "Фильтры воды", "Ножницы и инструменты"]
  },
  about: {
    title: "О нас", subtitle: "Xonqiz Nur — ваш надёжный партнёр",
    desc1: "С 2021 года предоставляем услуги в сфере электро- и сантехнических товаров в Ферганской области, сел. Хонкиз.",
    desc2: "ЧП «XONQIZ NUR» зарегистрировано официально и стало надёжным источником снабжения для местных жителей и предпринимателей.",
    feature1: "Большой ассортимент", feature2: "Гарантия качества", feature3: "Быстрое обслуживание",
    feature1d: "Более 500 видов электро- и сантехнических товаров", feature2d: "Только сертифицированные и качественные товары", feature3d: "Быстрое и удобное обслуживание"
  },
  location: {
    title: "Наш адрес", subtitle: "Нас легко найти",
    address: "Адрес", addressVal: "сел. Хонкиз, Ферганский район",
    district: "Область", districtVal: "Ферганская область, Узбекистан",
    hours: "Режим работы", hoursVal: "Пн–Сб: 09:00–18:00",
    navigate: "Маршрут (Яндекс Карты)"
  },
  contact: {
    title: "Контакты", subtitle: "Свяжитесь с нами",
    phone: "Телефон", email: "Email", telegram: "Telegram", address: "Адрес",
    addressVal: "сел. Хонкиз, Ферганский район, Ферганская область"
  },
  footer: { rights: "Все права защищены", tagline: "Электро- и сантехнические товары" }
};

const EN: Translations = {
  nav: { home: "Home", products: "Products", about: "About", location: "Location", contact: "Contact" },
  hero: {
    badge: "Fergana Region, Xonqiz Village",
    title1: "Electrical &", title2: "Plumbing", title3: "Store",
    desc: "From chandeliers to tape, from pipes to pumps — everything in one place. Xonqiz Nur is your reliable source for quality supplies.",
    cta: "Contact Us", ctaSecondary: "View Location",
    stat1: "2021", stat1label: "Founded", stat2: "500+", stat2label: "Product types", stat3: "100%", stat3label: "Quality guarantee"
  },
  products: {
    title: "Products", subtitle: "Wide range of quality products",
    electric: "Electrical Products", plumbing: "Plumbing Products",
    electricItems: ["Chandeliers & lights", "Sockets & switches", "Cables & wires", "Circuit breakers", "Main switches", "Power tools", "Tape & insulation", "Energy meters"],
    plumbingItems: ["Pipes & fittings", "Faucets & valves", "Toilets & sinks", "Water pumps", "Hoses & connectors", "Shower & bath equipment", "Water filters", "Scissors & tools"]
  },
  about: {
    title: "About Us", subtitle: "Xonqiz Nur — your trusted partner",
    desc1: "Since 2021, we have been serving the Fergana region in Xonqiz village with electrical and plumbing products.",
    desc2: "Officially registered as \"XONQIZ NUR\" private enterprise, we have become a reliable supply source for local residents and entrepreneurs.",
    feature1: "Large Selection", feature2: "Quality Assured", feature3: "Fast Service",
    feature1d: "Over 500 types of electrical and plumbing products", feature2d: "Only certified and quality-tested goods", feature3d: "Quick and convenient customer service"
  },
  location: {
    title: "Our Location", subtitle: "Easy to find us",
    address: "Address", addressVal: "Xonqiz Village, Fergana District",
    district: "Region", districtVal: "Fergana Region, Uzbekistan",
    hours: "Working hours", hoursVal: "Mon–Sat: 09:00–18:00",
    navigate: "Get Directions (Yandex Maps)"
  },
  contact: {
    title: "Contact", subtitle: "Get in touch with us",
    phone: "Phone", email: "Email", telegram: "Telegram", address: "Address",
    addressVal: "Xonqiz Village, Fergana District, Fergana Region"
  },
  footer: { rights: "All rights reserved", tagline: "Electrical & Plumbing Supplies" }
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private _lang = signal<Lang>('uz');
  lang = this._lang.asReadonly();

  private langs: Record<Lang, Translations> = { uz: UZ, ru: RU, en: EN };

  get t(): Translations {
    return this.langs[this._lang()];
  }

  setLang(lang: Lang) {
    this._lang.set(lang);
    localStorage.setItem('xn-lang', lang);
  }

  init() {
    const saved = localStorage.getItem('xn-lang') as Lang | null;
    if (saved && ['uz','ru','en'].includes(saved)) this._lang.set(saved);
  }
}
