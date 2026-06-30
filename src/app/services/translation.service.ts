import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WorldId } from '../shared/catalog.config';

export type Lang = 'uz' | 'ru' | 'en';

export interface CatalogItem {
  name: string;
  descriptor: string;
}
export interface CatalogWorld {
  name: string;
  blurb: string;
  items: CatalogItem[];
}
export interface Feature {
  title: string;
  desc: string;
}
export interface QA {
  q: string;
  a: string;
}
export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
export interface SeoEntry {
  title: string;
  description: string;
}

export interface Translations {
  nav: { home: string; catalog: string; about: string; contact: string };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    desc: string;
    cta: string;
    ctaSecondary: string;
    stats: Stat[];
  };
  trust: { since: string; registered: string; products: string; wholesale: string };
  catalog: {
    title: string;
    subtitle: string;
    askCta: string;
    notFound: string;
    itemsLabel: string;
    backToCatalog: string;
    worlds: Record<WorldId, CatalogWorld>;
  };
  spotlight: {
    badge: string;
    heading: string;
    sub: string;
    body: string;
    cta: string;
    cta2: string;
    chips: string[];
  };
  whyUs: { title: string; subtitle: string; items: Feature[]; inlineCta: string };
  stats: { title: string; subtitle: string; items: Stat[] };
  about: {
    title: string;
    subtitle: string;
    desc1: string;
    desc2: string;
    desc3: string;
    features: Feature[];
    tinLabel: string;
    sctaLabel: string;
    regLabel: string;
    regDate: string;
    cta: string;
  };
  location: {
    title: string;
    subtitle: string;
    address: string;
    addressVal: string;
    district: string;
    districtVal: string;
    hours: string;
    hoursVal: string;
    navigate: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    telegram: string;
    address: string;
    addressVal: string;
    form: {
      title: string;
      sub: string;
      name: string;
      namePh: string;
      phone: string;
      phonePh: string;
      world: string;
      worldPh: string;
      message: string;
      messagePh: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  faq: { title: string; subtitle: string; items: QA[] };
  footer: { tagline: string; rights: string; nav: string; contactTitle: string };
  floating: { call: string; telegram: string };
  seo: Record<'home' | 'catalog' | WorldId | 'about' | 'contact', SeoEntry>;
}

const UZ: Translations = {
  nav: { home: 'Bosh sahifa', catalog: 'Katalog', about: 'Biz haqimizda', contact: 'Aloqa' },
  hero: {
    badge: "Farg'ona viloyati, Xonqiz qishlog'i",
    title1: 'Elektr, santexnika,',
    title2: 'asbob va dizayn',
    title3: '— hammasi bir joyda',
    desc: "Lyustradan sementgacha, trubadan dizayner chiroqlargacha — Xonqiz Nur biznesingiz va uyingiz uchun ishonchli ta'minot manbai. 4 yo'nalish, 500+ mahsulot turi.",
    cta: "Biz bilan bog'laning",
    ctaSecondary: "Katalogni ko'rish",
    stats: [
      { value: 2021, suffix: '', label: 'Tashkil etilgan' },
      { value: 500, suffix: '+', label: 'Mahsulot turi' },
      { value: 4, suffix: '', label: "Yo'nalish" },
    ],
  },
  trust: {
    since: '2021 yildan beri',
    registered: 'Rasmiy korxona · STIR 309002339',
    products: '500+ mahsulot turi',
    wholesale: 'Optom va chakana',
  },
  catalog: {
    title: 'Mahsulot katalogi',
    subtitle: "4 yo'nalish, 500+ mahsulot turi",
    askCta: "Shu bo'yicha so'rang",
    notFound: 'Kerakli mahsulotni topa olmayapsizmi? Bizga yozing —',
    itemsLabel: 'turkum',
    backToCatalog: 'Katalogga qaytish',
    worlds: {
      elektr: {
        name: 'Elektr mahsulotlari',
        blurb: 'Yoritishdan himoya avtomatlarigacha — uy va obʻyekt uchun.',
        items: [
          { name: 'Lyustra va chiroqlar', descriptor: 'Zal, oshxona va ofis uchun shift chiroqlari' },
          { name: 'Rozetka va kalitlar', descriptor: 'Yevro standart, ishonchli va xavfsiz' },
          { name: 'Kabel va simlar', descriptor: "Mis va alyumin, har xil kesim, metrlab" },
          { name: 'Avtomat uzgichlar', descriptor: 'Bir va uch fazali himoya avtomatlari' },
          { name: 'Rubilniklar', descriptor: 'Yuk uzgichlar va shchit uchun' },
          { name: 'Elektr asbob-uskunalar', descriptor: "O'rnatish uchun asbob va aksessuarlar" },
          { name: 'Izolenta va qoplamalar', descriptor: 'Izolyatsiya lentasi, gofra, naychalar' },
          { name: 'Energiya hisoblagichlari', descriptor: 'Bir va uch fazali elektr hisoblagichlar' },
        ],
      },
      santexnika: {
        name: 'Santexnika mahsulotlari',
        blurb: "Trubadan suv filtrigacha — to'liq santexnika yechimi.",
        items: [
          { name: 'Truba va ulagichlar', descriptor: "PPR, metalloplastik, PVX — barcha o'lchamlar" },
          { name: 'Kran va ventillar', descriptor: 'Sharli kran, ventil va smesitellar' },
          { name: 'Unitaz va rakovina', descriptor: "Santexnika to'plamlari va keramika" },
          { name: 'Suv nasosi', descriptor: 'Quduq, hovuz va uy uchun nasoslar' },
          { name: 'Shlang va tirkamalar', descriptor: 'Moslashuvchan shlang va fitinglar' },
          { name: 'Dush va vanna uskunalari', descriptor: 'Dush kabina, leyka va aksessuarlar' },
          { name: 'Suv filtrlari', descriptor: "Ichimlik va xo'jalik suvi uchun" },
          { name: 'Qaychi va asboblar', descriptor: 'Truba kesish va payvand asboblari' },
        ],
      },
      qurilish: {
        name: 'Qurilish materiallari',
        blurb: 'Poydevordan pardozgacha — qurilishning har bosqichi uchun.',
        items: [
          { name: "Sement va g'isht", descriptor: "M400–M500 sement, g'isht va bloklar" },
          { name: 'Gips va gipskarton', descriptor: 'Listlar, profil va gips qorishmalari' },
          { name: "Bo'yoq va gruntovka", descriptor: 'Ichki va tashqi ishlar uchun' },
          { name: 'Quruq aralashmalar', descriptor: 'Shpaklovka, plitonit va qorishmalar' },
          { name: 'Profil va metall', descriptor: 'Profil, armatura, metall konstruksiya' },
          { name: 'Izolyatsiya va germetiklar', descriptor: 'Penoplast, mineral paxta, germetik' },
          { name: 'Plitka va yopishtiruvchilar', descriptor: 'Devor/pol plitalari va plitka yelimi' },
          { name: "Qum, shag'al va to'ldiruvchilar", descriptor: 'Beton va qorishma uchun inert materiallar' },
        ],
      },
      asboblar: {
        name: 'Asbob-uskunalar',
        blurb: 'Professional va uy ustasi uchun ishonchli asboblar.',
        items: [
          { name: 'Drel va perforatorlar', descriptor: 'Simli va akkumulyatorli teshish asboblari' },
          { name: 'Bolgʻa va zarb asboblari', descriptor: 'Bolgʻa, keska va zubilolar' },
          { name: "O'lchov asboblari", descriptor: 'Ruletka, nivelir va lazer oʻlchagich' },
          { name: 'Arra va kesish asboblari', descriptor: 'Bolgarka, elektr arra va disklar' },
          { name: 'Payvandlash apparatlari', descriptor: 'Invertor payvand va elektrodlar' },
          { name: "Qo'l asboblari", descriptor: "Otvyortka, kalit va ombur to'plamlari" },
          { name: 'Himoya vositalari', descriptor: "Qo'lqop, ko'zoynak, kaska va niqob" },
          { name: 'Asbob aksessuarlari', descriptor: 'Burgʻi, disk, batareya va ehtiyot qismlar' },
        ],
      },
      dizayn: {
        name: 'Noyob dizaynli chiroqlar',
        blurb: "Oddiy yorug'lik emas — interyeringizga xarakter beruvchi dizayn.",
        items: [
          { name: 'Dizayner lyustralar', descriptor: 'Zal va mehmonxona uchun hashamatli lyustralar' },
          { name: 'Vintage va Edison lampalar', descriptor: 'Retro uslubdagi dekorativ lampalar' },
          { name: 'Dizaynli devor chiroqlari', descriptor: 'Bra va devor yoritish yechimlari' },
          { name: 'Osma chiroqlar', descriptor: 'Oshxona va bar uchun pendant chiroqlar' },
          { name: 'LED dekorativ yoritish', descriptor: 'Lenta, neon va kontur yoritish' },
          { name: 'Aqlli yoritish tizimlari', descriptor: 'Masofadan boshqariladigan smart chiroqlar' },
          { name: 'Tashqi va landshaft yoritish', descriptor: 'Hovli, fasad va bogʻ uchun' },
          { name: 'Noyob plafon va abajurlar', descriptor: "Qo'lda ishlangan shisha/metall plafonlar" },
        ],
      },
    },
  },
  spotlight: {
    badge: 'Noyob kolleksiya',
    heading: 'Noyob dizaynli chiroqlar',
    sub: "Har bir interyerga — o'ziga xos yorug'lik",
    body: "Oddiy lyustra emas — xonangizga xarakter beradigan dizayner yoritish. Vintage Edison lampalardan aqlli LED tizimlargacha. Tanlashda mutaxassislarimiz yordam beradi.",
    cta: "Dizayn chiroqlarni ko'rish",
    cta2: 'Maslahat olish',
    chips: ['Vintage / Edison', 'Dizayner lyustra', 'Aqlli LED'],
  },
  whyUs: {
    title: 'Nega Xonqiz Nur?',
    subtitle: 'Biznesingiz uchun ishonchli hamkor',
    items: [
      { title: "Optom ta'minot", desc: "Ob'yekt va do'konlar uchun katta hajmda, qulay shartlarda." },
      { title: 'Ishonchli va barqaror', desc: '2021 yildan beri uzluksiz, kafolatli taʻminot.' },
      { title: 'Keng assortiment', desc: "4 yo'nalish, 500+ mahsulot turi bitta manzilda." },
      { title: 'Bepul maslahat', desc: 'Tajribali mutaxassislardan texnik yordam va tanlov boʻyicha maslahat.' },
    ],
    inlineCta: "Optom narxlar uchun bog'laning",
  },
  stats: {
    title: 'Raqamlarda Xonqiz Nur',
    subtitle: 'Ishonchni raqamlar tasdiqlaydi',
    items: [
      { value: 2021, suffix: '', label: 'Tashkil etilgan yil' },
      { value: 500, suffix: '+', label: 'Mahsulot turi' },
      { value: 4, suffix: '', label: 'Mahsulot yoʻnalishi' },
      { value: 100, suffix: '%', label: 'Sifat kafolati' },
    ],
  },
  about: {
    title: 'Biz haqimizda',
    subtitle: 'Xonqiz Nur — ishonchli hamkoringiz',
    desc1: "2021 yildan buyon Farg'ona viloyati, Xonqiz qishlog'ida elektr va santexnika mahsulotlari sohasida xizmat ko'rsatib kelamiz.",
    desc2: "\"XONQIZ NUR\" xususiy korxonasi sifatida rasmiy ro'yxatdan o'tgan va mahalliy aholi va tadbirkorlarning ishonchli ta'minot manbaiga aylangan.",
    desc3: "Bugun Xonqiz Nur to'rtta yo'nalish — elektr, santexnika, asbob-uskunalar va noyob dizaynli chiroqlar bo'yicha 500 dan ortiq mahsulot turini taklif etadi. Mahalliy quruvchilar, pudratchilar va do'konlar uchun ishonchli ulgurji va chakana ta'minotchiga aylandik.",
    features: [
      { title: 'Katta assortiment', desc: "500 dan ortiq turdagi mahsulotlar — 4 yo'nalishda" },
      { title: 'Sifat kafolati', desc: 'Faqat sertifikatli va sifatli tovarlar savdosi' },
      { title: 'Tez xizmat', desc: "Tez va qulay xizmat ko'rsatish" },
    ],
    tinLabel: 'STIR',
    sctaLabel: 'SCTEA (OKED)',
    regLabel: "Ro'yxatga olingan",
    regDate: '29.10.2021',
    cta: 'Batafsil',
  },
  location: {
    title: 'Bizning manzil',
    subtitle: 'Bizni topish oson',
    address: 'Manzil',
    addressVal: "Xonqiz qishlog'i, Farg'ona tumani",
    district: 'Viloyat',
    districtVal: "Farg'ona viloyati, O'zbekiston",
    hours: 'Ish vaqti',
    hoursVal: 'Dushanba–Shanba: 09:00–18:00',
    navigate: "Yo'l ko'rsatish (Yandex Maps)",
  },
  contact: {
    title: 'Aloqa',
    subtitle: "Biz bilan bog'laning",
    phone: 'Telefon',
    email: 'Email',
    telegram: 'Telegram',
    address: 'Manzil',
    addressVal: "Xonqiz qishlog'i, Farg'ona tumani, Farg'ona viloyati",
    form: {
      title: 'Soʻrov qoldiring',
      sub: "Tez orada siz bilan bog'lanamiz",
      name: 'Ismingiz',
      namePh: 'Masalan: Akmal',
      phone: 'Telefon',
      phonePh: '+998 __ ___ __ __',
      world: "Yo'nalish",
      worldPh: 'Tanlang',
      message: 'Xabar',
      messagePh: 'Qanday mahsulot yoki xizmat kerak?',
      submit: 'Soʻrov yuborish',
      sending: 'Yuborilmoqda…',
      success: 'Rahmat! Soʻrovingiz qabul qilindi — tez orada bogʻlanamiz.',
      error: "Xatolik yuz berdi. Iltimos telefon orqali bog'laning.",
    },
  },
  faq: {
    title: 'Tez-tez beriladigan savollar',
    subtitle: 'Eng kerakli javoblar',
    items: [
      { q: 'Optom (ulgurji) narxlar bormi?', a: "Ha. Ob'yekt va do'konlar uchun alohida optom narxlar mavjud, telefon orqali kelishiladi." },
      { q: 'Yetkazib berasizmi?', a: "Katta buyurtmalar uchun Farg'ona tumani bo'ylab yetkazib berish kelishiladi." },
      { q: "To'lov qanday?", a: "Naqd, plastik karta va bank o'tkazmasi (perechisleniya) qabul qilinadi." },
      { q: 'Tovarlar sertifikatlanganmi?', a: 'Ha, faqat sertifikatli va sifatli mahsulotlar sotiladi.' },
      { q: "Sizda yo'q tovarni topib bera olasizmi?", a: 'Ha, buyurtma asosida kerakli mahsulotni keltirib beramiz.' },
      { q: 'Ish vaqtingiz qanday?', a: 'Dushanba–Shanba, 09:00–18:00. Yakshanba — dam olish.' },
      { q: "Maslahat olsam bo'ladimi?", a: 'Albatta. Qaysi material kerakligini bilmasangiz, mutaxassislarimiz yordam beradi.' },
      { q: 'Manzilingiz qayerda?', a: "Xonqiz qishlog'i, Farg'ona tumani. Yandex xaritada aniq joylashuv ko'rsatilgan." },
    ],
  },
  footer: {
    tagline: 'Elektr, santexnika, asbob va dizayn taʻminoti',
    rights: 'Barcha huquqlar himoyalangan',
    nav: 'Sahifalar',
    contactTitle: 'Aloqa',
  },
  floating: { call: "Qo'ng'iroq qilish", telegram: 'Telegram orqali yozish' },
  seo: {
    home: {
      title: "Xonqiz Nur — Elektr, santexnika, asbob va dizayn mollari | Farg'ona",
      description: "Xonqiz qishlog'idagi elektr, santexnika, asbob-uskuna va dizayner chiroqlar do'koni. 500+ mahsulot turi. Optom va chakana. Tel +998 99 060 05 24.",
    },
    catalog: {
      title: 'Katalog — Elektr, santexnika, asbob va chiroqlar | Xonqiz Nur',
      description: "4 yo'nalish, 500+ mahsulot turi. Optom narxlar uchun bog'laning. Xonqiz Nur, Farg'ona.",
    },
    elektr: {
      title: 'Elektr mahsulotlari — lyustra, kabel, avtomat | Xonqiz Nur',
      description: "Lyustra, rozetka, kabel, avtomat uzgichlar va boshqa elektr mollari. Optom va chakana, Farg'ona.",
    },
    santexnika: {
      title: 'Santexnika — truba, kran, nasos, filtr | Xonqiz Nur',
      description: "Truba, kran, unitaz, suv nasosi va filtrlari. Sifatli santexnika, Farg'ona.",
    },
    qurilish: {
      title: "Qurilish materiallari — sement, gips, bo'yoq | Xonqiz Nur",
      description: "Sement, gipskarton, bo'yoq, quruq aralashma va izolyatsiya. Ob'yektlar uchun optom.",
    },
    asboblar: {
      title: "Asbob-uskunalar — drel, payvand, o'lchov | Xonqiz Nur",
      description: "Drel, perforator, bolgarka, payvand va qo'l asboblari. Professional asboblar, Farg'ona.",
    },
    dizayn: {
      title: 'Noyob dizaynli chiroqlar — lyustra, Edison, smart LED | Xonqiz Nur',
      description: 'Dizayner lyustralar, vintage Edison lampalar, bra va aqlli LED yoritish. Noyob yorugʻlik yechimlari.',
    },
    about: {
      title: 'Biz haqimizda — 2021 yildan beri | Xonqiz Nur',
      description: "\"XONQIZ NUR\" xususiy korxonasi — 2021 yildan Farg'onada ishonchli ta'minotchi. STIR 309002339.",
    },
    contact: {
      title: 'Aloqa — telefon, Telegram, manzil | Xonqiz Nur',
      description: "Xonqiz qishlog'i, Farg'ona tumani. Tel +998 99 060 05 24, +998 93 513 78 90. Telegram @xonqiznur.",
    },
  },
};

const RU: Translations = {
  nav: { home: 'Главная', catalog: 'Каталог', about: 'О нас', contact: 'Контакты' },
  hero: {
    badge: 'Ферганская область, сел. Хонкиз',
    title1: 'Электрика, сантехника,',
    title2: 'инструмент и дизайн',
    title3: '— всё в одном месте',
    desc: 'От люстры до цемента, от трубы до дизайнерских светильников — Xonqiz Nur надёжный поставщик для вашего бизнеса и дома. 4 направления, 500+ видов товаров.',
    cta: 'Связаться с нами',
    ctaSecondary: 'Смотреть каталог',
    stats: [
      { value: 2021, suffix: '', label: 'Основан' },
      { value: 500, suffix: '+', label: 'Видов товаров' },
      { value: 4, suffix: '', label: 'Направлений' },
    ],
  },
  trust: {
    since: 'С 2021 года',
    registered: 'Офиц. предприятие · ИНН 309002339',
    products: '500+ видов товаров',
    wholesale: 'Опт и розница',
  },
  catalog: {
    title: 'Каталог товаров',
    subtitle: '4 направления, 500+ видов товаров',
    askCta: 'Спросить по этому',
    notFound: 'Не нашли нужный товар? Напишите нам —',
    itemsLabel: 'групп',
    backToCatalog: 'Назад в каталог',
    worlds: {
      elektr: {
        name: 'Электротовары',
        blurb: 'От освещения до автоматов защиты — для дома и объекта.',
        items: [
          { name: 'Люстры и светильники', descriptor: 'Потолочный свет для зала, кухни и офиса' },
          { name: 'Розетки и выключатели', descriptor: 'Евростандарт, надёжно и безопасно' },
          { name: 'Кабель и провода', descriptor: 'Медь и алюминий, разное сечение, на метраж' },
          { name: 'Автоматы защиты', descriptor: 'Одно- и трёхфазные автоматы' },
          { name: 'Рубильники', descriptor: 'Нагрузочные выключатели для щита' },
          { name: 'Электроинструмент', descriptor: 'Инструмент и аксессуары для монтажа' },
          { name: 'Изолента и гофра', descriptor: 'Изоляция, гофра и трубки' },
          { name: 'Счётчики энергии', descriptor: 'Одно- и трёхфазные электросчётчики' },
        ],
      },
      santexnika: {
        name: 'Сантехника',
        blurb: 'От трубы до фильтра воды — полное решение для сантехники.',
        items: [
          { name: 'Трубы и фитинги', descriptor: 'PPR, металлопластик, ПВХ — все размеры' },
          { name: 'Краны и вентили', descriptor: 'Шаровые краны, вентили и смесители' },
          { name: 'Унитазы и раковины', descriptor: 'Сантехнические комплекты и керамика' },
          { name: 'Водяной насос', descriptor: 'Насосы для скважины, бассейна и дома' },
          { name: 'Шланги и соединители', descriptor: 'Гибкие шланги и фитинги' },
          { name: 'Душ и ванна', descriptor: 'Душевые кабины, лейки и аксессуары' },
          { name: 'Фильтры воды', descriptor: 'Для питьевой и хозяйственной воды' },
          { name: 'Ножницы и инструмент', descriptor: 'Резка труб и пайка' },
        ],
      },
      qurilish: {
        name: 'Стройматериалы',
        blurb: 'От фундамента до отделки — для каждого этапа стройки.',
        items: [
          { name: 'Цемент и кирпич', descriptor: 'Цемент М400–М500, кирпич и блоки' },
          { name: 'Гипс и гипсокартон', descriptor: 'Листы, профиль и гипсовые смеси' },
          { name: 'Краски и грунтовка', descriptor: 'Для внутренних и наружных работ' },
          { name: 'Сухие смеси', descriptor: 'Шпаклёвка, плитонит и растворы' },
          { name: 'Профиль и металл', descriptor: 'Профиль, арматура, металлоконструкции' },
          { name: 'Изоляция и герметики', descriptor: 'Пенопласт, минвата, герметик' },
          { name: 'Плитка и клей', descriptor: 'Плитка для стен/пола и плиточный клей' },
          { name: 'Песок, щебень, наполнители', descriptor: 'Инертные материалы для бетона' },
        ],
      },
      asboblar: {
        name: 'Инструменты',
        blurb: 'Надёжный инструмент для профи и домашнего мастера.',
        items: [
          { name: 'Дрели и перфораторы', descriptor: 'Сетевые и аккумуляторные' },
          { name: 'Молотки и ударный инструмент', descriptor: 'Молотки, кувалды и зубила' },
          { name: 'Измерительный инструмент', descriptor: 'Рулетка, уровень и лазерный дальномер' },
          { name: 'Пилы и резка', descriptor: 'Болгарки, электропилы и диски' },
          { name: 'Сварочные аппараты', descriptor: 'Инверторы и электроды' },
          { name: 'Ручной инструмент', descriptor: 'Отвёртки, ключи и наборы пассатижей' },
          { name: 'Средства защиты', descriptor: 'Перчатки, очки, каска и маска' },
          { name: 'Расходники', descriptor: 'Свёрла, диски, батареи и запчасти' },
        ],
      },
      dizayn: {
        name: 'Дизайнерские светильники',
        blurb: 'Не просто свет — дизайн, который задаёт характер интерьеру.',
        items: [
          { name: 'Дизайнерские люстры', descriptor: 'Роскошные люстры для зала и гостиной' },
          { name: 'Винтаж и Эдисон', descriptor: 'Декоративные лампы в стиле ретро' },
          { name: 'Настенные бра', descriptor: 'Бра и решения для подсветки стен' },
          { name: 'Подвесные светильники', descriptor: 'Подвесы для кухни и бара' },
          { name: 'Декоративный LED', descriptor: 'Лента, неон и контурная подсветка' },
          { name: 'Умный свет', descriptor: 'Светильники с дистанционным управлением' },
          { name: 'Уличный свет', descriptor: 'Для двора, фасада и сада' },
          { name: 'Уникальные плафоны', descriptor: 'Стеклянные/металлические плафоны ручной работы' },
        ],
      },
    },
  },
  spotlight: {
    badge: 'Уникальная коллекция',
    heading: 'Дизайнерские светильники',
    sub: 'Особый свет для каждого интерьера',
    body: 'Не просто люстра — дизайнерский свет, который задаёт характер комнате. От винтажных ламп Эдисона до умных LED-систем. Наши специалисты помогут с выбором.',
    cta: 'Смотреть светильники',
    cta2: 'Получить консультацию',
    chips: ['Винтаж / Эдисон', 'Дизайнерские люстры', 'Умный LED'],
  },
  whyUs: {
    title: 'Почему Xonqiz Nur?',
    subtitle: 'Надёжный партнёр для бизнеса',
    items: [
      { title: 'Оптовые поставки', desc: 'Большие объёмы на удобных условиях для объектов и магазинов.' },
      { title: 'Надёжно и стабильно', desc: 'Бесперебойные поставки с гарантией с 2021 года.' },
      { title: 'Широкий ассортимент', desc: '4 направления, 500+ видов товаров в одном месте.' },
      { title: 'Бесплатная консультация', desc: 'Техпомощь и советы по выбору от опытных специалистов.' },
    ],
    inlineCta: 'Узнать оптовые цены',
  },
  stats: {
    title: 'Xonqiz Nur в цифрах',
    subtitle: 'Доверие подтверждают цифры',
    items: [
      { value: 2021, suffix: '', label: 'Год основания' },
      { value: 500, suffix: '+', label: 'Видов товаров' },
      { value: 4, suffix: '', label: 'Направлений' },
      { value: 100, suffix: '%', label: 'Гарантия качества' },
    ],
  },
  about: {
    title: 'О нас',
    subtitle: 'Xonqiz Nur — ваш надёжный партнёр',
    desc1: 'С 2021 года предоставляем услуги в сфере электро- и сантехнических товаров в Ферганской области, сел. Хонкиз.',
    desc2: 'ЧП «XONQIZ NUR» официально зарегистрировано и стало надёжным источником снабжения для местных жителей и предпринимателей.',
    desc3: 'Сегодня Xonqiz Nur предлагает более 500 видов товаров по четырём направлениям — электрика, сантехника, инструменты и дизайнерские светильники. Мы стали надёжным оптовым и розничным поставщиком для строителей, подрядчиков и магазинов.',
    features: [
      { title: 'Большой ассортимент', desc: 'Более 500 видов товаров — в 4 направлениях' },
      { title: 'Гарантия качества', desc: 'Только сертифицированные и качественные товары' },
      { title: 'Быстрое обслуживание', desc: 'Быстрый и удобный сервис' },
    ],
    tinLabel: 'ИНН',
    sctaLabel: 'ОКЭД',
    regLabel: 'Зарегистрировано',
    regDate: '29.10.2021',
    cta: 'Подробнее',
  },
  location: {
    title: 'Наш адрес',
    subtitle: 'Нас легко найти',
    address: 'Адрес',
    addressVal: 'сел. Хонкиз, Ферганский район',
    district: 'Область',
    districtVal: 'Ферганская область, Узбекистан',
    hours: 'Режим работы',
    hoursVal: 'Пн–Сб: 09:00–18:00',
    navigate: 'Маршрут (Яндекс Карты)',
  },
  contact: {
    title: 'Контакты',
    subtitle: 'Свяжитесь с нами',
    phone: 'Телефон',
    email: 'Email',
    telegram: 'Telegram',
    address: 'Адрес',
    addressVal: 'сел. Хонкиз, Ферганский район, Ферганская область',
    form: {
      title: 'Оставьте заявку',
      sub: 'Скоро свяжемся с вами',
      name: 'Ваше имя',
      namePh: 'Например: Акмаль',
      phone: 'Телефон',
      phonePh: '+998 __ ___ __ __',
      world: 'Направление',
      worldPh: 'Выберите',
      message: 'Сообщение',
      messagePh: 'Какой товар или услуга нужны?',
      submit: 'Отправить заявку',
      sending: 'Отправка…',
      success: 'Спасибо! Заявка принята — скоро свяжемся.',
      error: 'Произошла ошибка. Пожалуйста, позвоните нам.',
    },
  },
  faq: {
    title: 'Частые вопросы',
    subtitle: 'Самые нужные ответы',
    items: [
      { q: 'Есть ли оптовые цены?', a: 'Да. Для объектов и магазинов есть отдельные оптовые цены, обсуждаются по телефону.' },
      { q: 'Есть ли доставка?', a: 'Для крупных заказов доставка по Ферганскому району обсуждается.' },
      { q: 'Как происходит оплата?', a: 'Принимаем наличные, банковскую карту и перечисление.' },
      { q: 'Товары сертифицированы?', a: 'Да, продаются только сертифицированные и качественные товары.' },
      { q: 'Можете найти товар, которого нет?', a: 'Да, привезём нужный товар под заказ.' },
      { q: 'Какой у вас режим работы?', a: 'Пн–Сб, 09:00–18:00. Воскресенье — выходной.' },
      { q: 'Можно получить консультацию?', a: 'Конечно. Если не знаете, какой материал нужен — наши специалисты помогут.' },
      { q: 'Где вы находитесь?', a: 'сел. Хонкиз, Ферганский район. Точное расположение на Яндекс Картах.' },
    ],
  },
  footer: {
    tagline: 'Электрика, сантехника, инструмент и дизайн',
    rights: 'Все права защищены',
    nav: 'Страницы',
    contactTitle: 'Контакты',
  },
  floating: { call: 'Позвонить', telegram: 'Написать в Telegram' },
  seo: {
    home: {
      title: 'Xonqiz Nur — электрика, сантехника, инструмент и дизайн | Фергана',
      description: 'Магазин электрики, сантехники, инструмента и дизайнерских светильников в сел. Хонкиз. 500+ видов товаров. Опт и розница. Тел +998 99 060 05 24.',
    },
    catalog: {
      title: 'Каталог — электрика, сантехника, инструмент и свет | Xonqiz Nur',
      description: '4 направления, 500+ видов товаров. Свяжитесь для оптовых цен. Xonqiz Nur, Фергана.',
    },
    elektr: {
      title: 'Электротовары — люстры, кабель, автоматы | Xonqiz Nur',
      description: 'Люстры, розетки, кабель, автоматы и другие электротовары. Опт и розница, Фергана.',
    },
    santexnika: {
      title: 'Сантехника — трубы, краны, насос, фильтр | Xonqiz Nur',
      description: 'Трубы, краны, унитазы, насосы и фильтры воды. Качественная сантехника, Фергана.',
    },
    qurilish: {
      title: 'Стройматериалы — цемент, гипс, краска | Xonqiz Nur',
      description: 'Цемент, гипсокартон, краска, сухие смеси и изоляция. Опт для объектов.',
    },
    asboblar: {
      title: 'Инструменты — дрель, сварка, измерение | Xonqiz Nur',
      description: 'Дрели, перфораторы, болгарки, сварка и ручной инструмент. Профессиональный инструмент, Фергана.',
    },
    dizayn: {
      title: 'Дизайнерские светильники — люстры, Эдисон, smart LED | Xonqiz Nur',
      description: 'Дизайнерские люстры, винтажные лампы Эдисона, бра и умный LED-свет. Уникальные решения освещения.',
    },
    about: {
      title: 'О нас — с 2021 года | Xonqiz Nur',
      description: 'ЧП «XONQIZ NUR» — надёжный поставщик в Фергане с 2021 года. ИНН 309002339.',
    },
    contact: {
      title: 'Контакты — телефон, Telegram, адрес | Xonqiz Nur',
      description: 'сел. Хонкиз, Ферганский район. Тел +998 99 060 05 24, +998 93 513 78 90. Telegram @xonqiznur.',
    },
  },
};

const EN: Translations = {
  nav: { home: 'Home', catalog: 'Catalog', about: 'About', contact: 'Contact' },
  hero: {
    badge: 'Fergana Region, Xonqiz Village',
    title1: 'Electrical, plumbing,',
    title2: 'tools & design',
    title3: '— all in one place',
    desc: 'From chandeliers to cement, from pipes to designer lighting — Xonqiz Nur is your reliable supplier for business and home. 4 worlds, 500+ product types.',
    cta: 'Contact Us',
    ctaSecondary: 'View Catalog',
    stats: [
      { value: 2021, suffix: '', label: 'Founded' },
      { value: 500, suffix: '+', label: 'Product types' },
      { value: 4, suffix: '', label: 'Worlds' },
    ],
  },
  trust: {
    since: 'Since 2021',
    registered: 'Registered business · TIN 309002339',
    products: '500+ product types',
    wholesale: 'Wholesale & retail',
  },
  catalog: {
    title: 'Product Catalog',
    subtitle: '4 worlds, 500+ product types',
    askCta: 'Ask about this',
    notFound: "Can't find what you need? Message us —",
    itemsLabel: 'groups',
    backToCatalog: 'Back to catalog',
    worlds: {
      elektr: {
        name: 'Electrical',
        blurb: 'From lighting to circuit breakers — for home and site.',
        items: [
          { name: 'Chandeliers & lights', descriptor: 'Ceiling lighting for halls, kitchens and offices' },
          { name: 'Sockets & switches', descriptor: 'Euro standard, reliable and safe' },
          { name: 'Cables & wires', descriptor: 'Copper and aluminium, any gauge, by the metre' },
          { name: 'Circuit breakers', descriptor: 'Single- and three-phase breakers' },
          { name: 'Main switches', descriptor: 'Load switches for the panel' },
          { name: 'Electrical tools', descriptor: 'Tools and accessories for installation' },
          { name: 'Tape & conduit', descriptor: 'Insulation tape, conduit and tubing' },
          { name: 'Energy meters', descriptor: 'Single- and three-phase electric meters' },
        ],
      },
      santexnika: {
        name: 'Plumbing',
        blurb: 'From pipe to water filter — a complete plumbing solution.',
        items: [
          { name: 'Pipes & fittings', descriptor: 'PPR, metal-plastic, PVC — all sizes' },
          { name: 'Faucets & valves', descriptor: 'Ball valves, valves and mixers' },
          { name: 'Toilets & sinks', descriptor: 'Sanitary sets and ceramics' },
          { name: 'Water pumps', descriptor: 'Pumps for wells, pools and homes' },
          { name: 'Hoses & connectors', descriptor: 'Flexible hoses and fittings' },
          { name: 'Shower & bath', descriptor: 'Shower cabins, heads and accessories' },
          { name: 'Water filters', descriptor: 'For drinking and household water' },
          { name: 'Cutters & tools', descriptor: 'Pipe cutting and welding tools' },
        ],
      },
      qurilish: {
        name: 'Construction materials',
        blurb: 'From foundation to finish — for every build stage.',
        items: [
          { name: 'Cement & bricks', descriptor: 'M400–M500 cement, bricks and blocks' },
          { name: 'Gypsum & drywall', descriptor: 'Sheets, profiles and gypsum mixes' },
          { name: 'Paint & primer', descriptor: 'For interior and exterior work' },
          { name: 'Dry mixes', descriptor: 'Putty, plitonit and mortars' },
          { name: 'Profiles & metal', descriptor: 'Profiles, rebar, metal structures' },
          { name: 'Insulation & sealants', descriptor: 'Foam, mineral wool, sealant' },
          { name: 'Tile & adhesives', descriptor: 'Wall/floor tiles and tile glue' },
          { name: 'Sand, gravel & aggregates', descriptor: 'Inert materials for concrete' },
        ],
      },
      asboblar: {
        name: 'Tools & equipment',
        blurb: 'Reliable tools for pros and home masters.',
        items: [
          { name: 'Drills & rotary hammers', descriptor: 'Corded and cordless' },
          { name: 'Hammers & striking tools', descriptor: 'Hammers, sledges and chisels' },
          { name: 'Measuring tools', descriptor: 'Tape, level and laser measure' },
          { name: 'Saws & cutting', descriptor: 'Grinders, power saws and discs' },
          { name: 'Welding machines', descriptor: 'Inverters and electrodes' },
          { name: 'Hand tools', descriptor: 'Screwdrivers, wrenches and plier sets' },
          { name: 'Safety gear', descriptor: 'Gloves, goggles, helmet and mask' },
          { name: 'Accessories', descriptor: 'Bits, discs, batteries and spares' },
        ],
      },
      dizayn: {
        name: 'Designer lighting',
        blurb: 'Not just light — design that gives your interior character.',
        items: [
          { name: 'Designer chandeliers', descriptor: 'Luxury chandeliers for halls and living rooms' },
          { name: 'Vintage & Edison bulbs', descriptor: 'Retro-style decorative bulbs' },
          { name: 'Designer wall sconces', descriptor: 'Sconces and wall-lighting solutions' },
          { name: 'Pendant lights', descriptor: 'Pendants for kitchens and bars' },
          { name: 'Decorative LED', descriptor: 'Strip, neon and contour lighting' },
          { name: 'Smart lighting', descriptor: 'Remote-controlled smart lights' },
          { name: 'Outdoor & landscape', descriptor: 'For yards, facades and gardens' },
          { name: 'Unique shades', descriptor: 'Handmade glass/metal shades' },
        ],
      },
    },
  },
  spotlight: {
    badge: 'Unique collection',
    heading: 'Designer Lighting',
    sub: 'A distinct light for every interior',
    body: 'Not just a chandelier — designer lighting that gives a room its character. From vintage Edison bulbs to smart LED systems. Our specialists help you choose.',
    cta: 'Browse lighting',
    cta2: 'Get advice',
    chips: ['Vintage / Edison', 'Designer chandeliers', 'Smart LED'],
  },
  whyUs: {
    title: 'Why Xonqiz Nur?',
    subtitle: 'A reliable partner for your business',
    items: [
      { title: 'Bulk supply', desc: 'Large volumes on convenient terms for sites and shops.' },
      { title: 'Reliable & stable', desc: 'Uninterrupted, guaranteed supply since 2021.' },
      { title: 'Wide assortment', desc: '4 worlds, 500+ product types in one place.' },
      { title: 'Free expert advice', desc: 'Technical help and selection advice from experienced specialists.' },
    ],
    inlineCta: 'Ask about bulk pricing',
  },
  stats: {
    title: 'Xonqiz Nur in numbers',
    subtitle: 'Trust backed by numbers',
    items: [
      { value: 2021, suffix: '', label: 'Founded' },
      { value: 500, suffix: '+', label: 'Product types' },
      { value: 4, suffix: '', label: 'Worlds' },
      { value: 100, suffix: '%', label: 'Quality assured' },
    ],
  },
  about: {
    title: 'About Us',
    subtitle: 'Xonqiz Nur — your trusted partner',
    desc1: 'Since 2021, we have been serving the Fergana region in Xonqiz village with electrical and plumbing products.',
    desc2: 'Officially registered as "XONQIZ NUR" private enterprise, we have become a reliable supply source for local residents and entrepreneurs.',
    desc3: 'Today Xonqiz Nur offers over 500 product types across four worlds — electrical, plumbing, tools and designer lighting. We have become a reliable wholesale and retail supplier for builders, contractors and shops.',
    features: [
      { title: 'Large selection', desc: 'Over 500 product types — across 4 worlds' },
      { title: 'Quality assured', desc: 'Only certified and quality-tested goods' },
      { title: 'Fast service', desc: 'Quick and convenient customer service' },
    ],
    tinLabel: 'TIN',
    sctaLabel: 'SCTEA',
    regLabel: 'Registered',
    regDate: '29.10.2021',
    cta: 'Learn more',
  },
  location: {
    title: 'Our Location',
    subtitle: 'Easy to find us',
    address: 'Address',
    addressVal: 'Xonqiz Village, Fergana District',
    district: 'Region',
    districtVal: 'Fergana Region, Uzbekistan',
    hours: 'Working hours',
    hoursVal: 'Mon–Sat: 09:00–18:00',
    navigate: 'Get Directions (Yandex Maps)',
  },
  contact: {
    title: 'Contact',
    subtitle: 'Get in touch with us',
    phone: 'Phone',
    email: 'Email',
    telegram: 'Telegram',
    address: 'Address',
    addressVal: 'Xonqiz Village, Fergana District, Fergana Region',
    form: {
      title: 'Leave a request',
      sub: "We'll contact you shortly",
      name: 'Your name',
      namePh: 'e.g. Akmal',
      phone: 'Phone',
      phonePh: '+998 __ ___ __ __',
      world: 'World',
      worldPh: 'Select',
      message: 'Message',
      messagePh: 'What product or service do you need?',
      submit: 'Send request',
      sending: 'Sending…',
      success: "Thank you! We'll be in touch soon.",
      error: 'Something went wrong. Please call us.',
    },
  },
  faq: {
    title: 'Frequently asked questions',
    subtitle: 'The answers you need most',
    items: [
      { q: 'Do you offer wholesale prices?', a: 'Yes. We have separate wholesale prices for sites and shops, agreed by phone.' },
      { q: 'Do you deliver?', a: 'For large orders, delivery across Fergana district is arranged.' },
      { q: 'How can I pay?', a: 'We accept cash, bank card and bank transfer.' },
      { q: 'Are the goods certified?', a: 'Yes, we sell only certified and quality goods.' },
      { q: 'Can you source an item you don’t stock?', a: 'Yes, we can bring in the item you need to order.' },
      { q: 'What are your hours?', a: 'Mon–Sat, 09:00–18:00. Sunday is closed.' },
      { q: 'Can I get advice?', a: "Of course. If you're not sure which material you need, our specialists will help." },
      { q: 'Where are you located?', a: 'Xonqiz village, Fergana district. The exact location is on Yandex Maps.' },
    ],
  },
  footer: {
    tagline: 'Electrical, plumbing, tools & design supplies',
    rights: 'All rights reserved',
    nav: 'Pages',
    contactTitle: 'Contact',
  },
  floating: { call: 'Call', telegram: 'Message on Telegram' },
  seo: {
    home: {
      title: 'Xonqiz Nur — Electrical, Plumbing & Tools Supplies | Fergana',
      description: 'Store for electrical, plumbing, tools and designer lighting in Xonqiz village. 500+ product types. Wholesale & retail. Tel +998 99 060 05 24.',
    },
    catalog: {
      title: 'Catalog — Electrical, Plumbing, Tools & Lighting | Xonqiz Nur',
      description: '4 worlds, 500+ product types. Contact us for bulk pricing. Xonqiz Nur, Fergana.',
    },
    elektr: {
      title: 'Electrical products — chandeliers, cable, breakers | Xonqiz Nur',
      description: 'Chandeliers, sockets, cable, circuit breakers and more. Wholesale & retail, Fergana.',
    },
    santexnika: {
      title: 'Plumbing — pipes, faucets, pumps, filters | Xonqiz Nur',
      description: 'Pipes, faucets, toilets, water pumps and filters. Quality plumbing, Fergana.',
    },
    qurilish: {
      title: 'Construction materials — cement, gypsum, paint | Xonqiz Nur',
      description: 'Cement, drywall, paint, dry mixes and insulation. Wholesale for sites.',
    },
    asboblar: {
      title: 'Tools & equipment — drills, welding, measuring | Xonqiz Nur',
      description: 'Drills, rotary hammers, grinders, welding and hand tools. Professional tools, Fergana.',
    },
    dizayn: {
      title: 'Designer lighting — chandeliers, Edison, smart LED | Xonqiz Nur',
      description: 'Designer chandeliers, vintage Edison bulbs, sconces and smart LED lighting. Unique lighting solutions.',
    },
    about: {
      title: 'About — since 2021 | Xonqiz Nur',
      description: '"XONQIZ NUR" private enterprise — a reliable supplier in Fergana since 2021. TIN 309002339.',
    },
    contact: {
      title: 'Contact — phone, Telegram, address | Xonqiz Nur',
      description: 'Xonqiz village, Fergana district. Tel +998 99 060 05 24, +998 93 513 78 90. Telegram @xonqiznur.',
    },
  },
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private _lang = signal<Lang>('uz');
  lang = this._lang.asReadonly();

  private langs: Record<Lang, Translations> = { uz: UZ, ru: RU, en: EN };

  get t(): Translations {
    return this.langs[this._lang()];
  }

  setLang(lang: Lang, persist = true) {
    this._lang.set(lang);
    if (persist && this.isBrowser) {
      try {
        localStorage.setItem('xn-lang', lang);
      } catch {}
    }
  }

  init() {
    if (!this.isBrowser) return;
    let saved: Lang | null = null;
    try {
      saved = localStorage.getItem('xn-lang') as Lang | null;
    } catch {}
    if (saved && ['uz', 'ru', 'en'].includes(saved)) this._lang.set(saved);
  }
}
