/**
 * All user-facing copy for verzio.hu lives here, so it can be reviewed with the client in one place.
 * Tone: tegező, informal-professional. Hungarian typography: „…” quotes, en dash only for ranges.
 *
 * Anything marked `sample: true` or `// TODO` is placeholder content and MUST be replaced
 * with real, client-approved material before launch.
 */

// TODO: confirm brand name, legal entity and contact details.
export const brand = {
  name: 'Verzió',
  legalName: 'Verzió (TODO: cégnév)',
  domain: 'verzio.hu',
  url: 'https://verzio.hu',
  email: 'hello@verzio.hu', // TODO: real address
  phone: '+36 30 123 4567', // TODO: real number
  phoneHref: 'tel:+36301234567',
  city: 'Budapest', // TODO: confirm
};

export const meta = {
  title: 'Verzió | Weboldal, egyedi szoftver és IT-háttér cégeknek',
  description:
    'Weboldalakat, egyedi szoftvereket és megbízható IT-hátteret építünk cégeknek. Egy csapat, átlátható folyamat, kézzelfogható eredmény.',
  ogImageAlt: 'Verzió: építsük meg a céged következő verzióját',
};

export const cta = {
  label: 'Kérj ajánlatot',
  href: '#kapcsolat',
};

export const nav = [
  { label: 'Szolgáltatások', href: '#szolgaltatasok' },
  { label: 'Folyamat', href: '#folyamat' },
  { label: 'Kapcsolat', href: '#kapcsolat' },
];

export const hero = {
  // Each entry is one visual line. Tokens in {braces} become inline animated icons.
  lines: ['Építsük meg', 'a céged következő', '{code} verzióját {spark}'],
  // Screen-reader version of the headline (icons are decorative).
  label: 'Építsük meg a céged következő verzióját',
  sub: 'Weboldalak, egyedi szoftverek és megbízható IT-háttér. Egy csapattól, amelyik a kódot és az üzletedet is érti.',
};

export const services = {
  id: 'szolgaltatasok',
  title: ['Három terület,', 'egy', 'csapat'],
  sub: 'Nem kell három beszállítót összehangolnod. Megtervezzük, megépítjük és üzemeltetjük, egy kézben.',
  items: [
    {
      key: 'web',
      title: 'Weboldal-fejlesztés',
      text: 'Gyors, mérhető weboldalak és webshopok, amelyek ügyfelet hoznak, nem csak jól mutatnak.',
      points: ['Egyedi design, sablonok nélkül', 'Keresőoptimalizálás és mérhető konverzió', 'A tartalmat te magad is szerkesztheted'],
    },
    {
      key: 'software',
      title: 'Egyedi szoftver',
      text: 'Belső rendszerek, ügyfélportálok és integrációk, a te folyamataidra szabva.',
      points: ['Szétszórt táblázatok helyett egy rendszer', 'Összekötjük a meglévő eszközeiddel', 'Folyamatos fejlesztés, nem egyszeri átadás'],
    },
    {
      key: 'it',
      title: 'IT-szolgáltatás',
      text: 'Szerverek, mentések, biztonság és felhasználói támogatás, hogy a háttér egyszerűen működjön.',
      points: ['Folyamatos felügyelet és napi mentés', 'Biztonsági frissítések időben', 'Gyors segítség, ha baj van'],
    },
  ],
  // Mock UI inside the cards. Illustrative only.
  mock: {
    webUrl: 'pelda-studio.hu',
    webHeadline: 'Foglalj időpontot két kattintással',
    webVitals: [
      { label: 'Betöltés', value: '1,1 s' },
      { label: 'Mobilbarát', value: 'Igen' },
      { label: 'Akadálymentes', value: 'AA' },
    ],
    statusTitle: 'Rendszerállapot',
    statusRows: [
      { label: 'Webszerver', state: 'Működik' },
      { label: 'Napi mentés', state: 'Kész, 03:00' },
      { label: 'SSL-tanúsítvány', state: 'Érvényes' },
      { label: 'Frissítések', state: 'Naprakész' },
    ],
  },
};

export const process = {
  id: 'folyamat',
  title: ['Átlátható lépések,', 'meglepetések', 'nélkül'],
  steps: [
    {
      key: 'discover',
      name: 'Feltérképezés',
      title: 'Előbb megértjük, mire van szükséged.',
      text: 'Egy beszélgetés a céljaidról, a felhasználóidról és a meglévő rendszereidről. Ebből lesz a pontos ajánlat.',
    },
    {
      key: 'design',
      name: 'Tervezés',
      title: 'Megmutatjuk, mielőtt megépítjük.',
      text: 'Kattintható tervet kapsz, amelyet a csapatoddal együtt kipróbálhatsz, még az első sor kód előtt.',
    },
    {
      key: 'build',
      name: 'Fejlesztés',
      title: 'Kéthetente látod, hol tartunk.',
      text: 'Rövid szakaszokban dolgozunk, és mindegyik végén működő verziót mutatunk. Nincs hónapokig tartó csend.',
    },
    {
      key: 'run',
      name: 'Üzemeltetés',
      title: 'Az átadás után is veled maradunk.',
      text: 'Felügyeljük, frissítjük és továbbfejlesztjük, amit építettünk. Egy elérhetőség, ha bármi történik.',
    },
  ],
  mock: {
    brief: ['Üzleti célok', 'Célközönség', 'Meglévő rendszerek', 'Határidő és keret'],
    commits: [
      { hash: 'a41f2c9', msg: 'Online foglalás: naptár-szinkron' },
      { hash: '9be03d1', msg: 'Számlázó-integráció kész' },
      { hash: '57c1e80', msg: 'Mobil nézet finomítása' },
    ],
    uptimeLabel: 'Elérhetőség, elmúlt 30 nap',
  },
  // TODO: replace with a real team / office photo.
  imageAlt: 'Fejlesztő laptopon dolgozik egy faasztalnál',
};

export const work = {
  id: 'munkaink',
  title: ['Automatizáljuk', 'azt, ami ma órákat visz el.'],
  sub: 'Táblázatokból, e-mail-láncokból és kézi adatbevitelből rendezett rendszert építünk. A csapatod pedig a fontos munkára figyelhet.',
  board: {
    before: 'Kézi munka',
    after: 'Automatizálva',
    tag: 'Automatikus',
    cards: [
      { title: 'Megrendelések átvezetése a számlázóba', owner: 'Kata B.', time: 'Naponta kb. 2 óra' },
      { title: 'Heti értékesítési riport összeállítása', owner: 'Gergő T.', time: 'Hetente kb. 3 óra' },
    ],
    annotation: 'automatizálva!',
  },
  // TODO: replace with a real project or team photo.
  imageAlt: 'Billentyűzet és bögre egy sötét íróasztalon',
};

export const contact = {
  id: 'kapcsolat',
  title: ['Mesélj a', 'projektedről.'],
  sub: 'Pár mondat is elég. Egy munkanapon belül jelentkezünk, és megbeszéljük a következő lépést.',
  directLabel: 'Inkább írnál vagy hívnál?',
  form: {
    name: 'Név',
    email: 'E-mail-cím',
    phone: 'Telefonszám',
    optional: 'nem kötelező',
    topicLegend: 'Miben segíthetünk?',
    topics: ['Weboldal', 'Egyedi szoftver', 'IT-szolgáltatás', 'Még nem tudom'],
    message: 'Néhány mondat a projektről',
    messageHint: 'Mi a cél, mi a mostani helyzet, és van-e határidő?',
    consentBefore: 'Elolvastam és elfogadom az ',
    consentLink: 'adatkezelési tájékoztatót',
    consentAfter: '.',
    honeypot: 'Ezt a mezőt hagyd üresen',
    submit: 'Ajánlatkérés elküldése',
    sending: 'Küldés…',
  },
  errors: {
    name: 'Add meg a neved.',
    email: 'Adj meg egy érvényes e-mail-címet.',
    message: 'Írj pár mondatot a projektről (legalább 20 karakter).',
    consent: 'A küldéshez fogadd el az adatkezelési tájékoztatót.',
    summary: 'Néhány mezőt még ki kell javítani.',
  },
  // FormSubmit AJAX endpoint (https://formsubmit.co/documentation).
  // Random alias issued by FormSubmit after activation (keeps the target e-mail out of the page source).
  endpoint: 'https://formsubmit.co/ajax/a88774650d40e813b5c1412473a30209',
  // Labels of the fields as they appear in the delivered e-mail.
  mail: {
    subject: 'Új ajánlatkérés a verzio.hu-ról',
    name: 'Név',
    phone: 'Telefon',
    topics: 'Téma',
    message: 'Üzenet',
    consent: 'Adatkezelési tájékoztató',
    consentValue: 'Elfogadva',
    empty: '-',
  },
  success: {
    title: 'Köszönjük, megkaptuk!',
    text: 'Hamarosan jelentkezünk a megadott e-mail-címen.',
    again: 'Új üzenet küldése',
  },
  status: {
    failure: 'Hiba történt a küldéskor. Próbáld újra, vagy írj közvetlenül ide:',
  },
};

export const legal = [
  { label: 'Adatkezelési tájékoztató', href: '/adatkezeles' },
  { label: 'ÁSZF', href: '/aszf' },
  { label: 'Impresszum', href: '/impresszum' },
];

export const footer = {
  line: 'Weboldal, egyedi szoftver és IT-háttér cégeknek.',
  rights: 'Minden jog fenntartva.',
  backToTop: 'Vissza az oldal tetejére',
};

export const notFound = {
  title: 'Ez az oldal nem létezik',
  text: 'Lehet, hogy elírás történt, vagy az oldal már nem érhető el.',
  back: 'Vissza a főoldalra',
};
