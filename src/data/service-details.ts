export type ServiceDetail = {
  description: string;
  includes: string[];
  relatedSlugs: string[];
  heroImage?: string;
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  haircut: {
    description:
      "Час работы вместо стандартных тридцати минут. Стрижка по структуре волос, детокс кожи головы, укладка и парфюмирование — всё включено в стоимость.",
    includes: [
      "Детокс кожи головы",
      "Стрижка по структуре волос",
      "Моделирование формы",
      "Укладка и парфюмирование",
    ],
    relatedSlugs: ["haircut-beard", "beard", "outline"],
    heroImage: "/images/B43A7874.jpg",
  },
  "haircut-beard": {
    description:
      "Стрижка и борода за один визит. Один мастер ведёт от начала до конца — полтора часа работы с единым взглядом на пропорции лица.",
    includes: [
      "Детокс кожи головы",
      "Стрижка по структуре волос",
      "Моделирование бороды",
      "Укладка и финишный уход",
    ],
    relatedSlugs: ["haircut", "beard", "shave"],
    heroImage: "/images/B43A7806.jpg",
  },
  beard: {
    description:
      "Форма, которая держится больше трёх недель. Мастер работает с учётом направления роста — не просто стрижёт, а выстраивает геометрию лица.",
    includes: [
      "Консультация и подбор формы",
      "Моделирование и коррекция линий",
      "Горячее полотенце",
      "Уход Solomon's или Davines",
    ],
    relatedSlugs: ["haircut-beard", "beard-premium", "shave"],
    heroImage: "/images/B43A7735.jpg",
  },
  "beard-premium": {
    description:
      "Моделирование с косметикой Solomon's — профессиональная линейка ухода за бородой. Час работы, максимальное внимание к деталям.",
    includes: [
      "Консультация и подбор формы",
      "Моделирование Solomon's",
      "Горячее полотенце и компресс",
      "Финишный уход Solomon's",
    ],
    relatedSlugs: ["beard", "shave", "face-london"],
    heroImage: "/images/B43A7792.jpg",
  },
  shave: {
    description:
      "Опасная бритва, горячий компресс и полное расслабление. Классическое мужское бритьё — медленное, внимательное, безупречное.",
    includes: [
      "Горячий компресс",
      "Нанесение пены и подготовка кожи",
      "Бритьё опасной бритвой",
      "Успокаивающий завершающий уход",
    ],
    relatedSlugs: ["head-shave", "beard", "face-london"],
    heroImage: "/images/B43A7596.jpg",
  },
  "head-shave": {
    description:
      "Бритьё головы опасной бритвой с горячим компрессом. Тщательная подготовка кожи и увлажняющий финиш.",
    includes: [
      "Горячий компресс",
      "Подготовка кожи",
      "Бритьё опасной бритвой",
      "Увлажнение в финале",
    ],
    relatedSlugs: ["shave", "clipper", "beard"],
    heroImage: "/images/B43A7735.jpg",
  },
  "face-london": {
    description:
      "Тридцать минут с косметикой The London Grooming Company. Очищение, тонизирование, увлажнение — кожа чувствует результат в течение всего дня.",
    includes: ["Глубокое очищение", "Тонизирование", "Маска или сыворотка", "Увлажнение с SPF"],
    relatedSlugs: ["scrub", "beard-premium", "haircut"],
    heroImage: "/images/B43A7792.jpg",
  },
  scrub: {
    description:
      "Скраб и чёрная маска за двадцать пять минут. Очищение пор, выравнивание тона — мгновенный видимый результат.",
    includes: [
      "Мягкий скраб",
      "Нанесение чёрной маски",
      "Снятие горячим полотенцем",
      "Успокаивающий финиш",
    ],
    relatedSlugs: ["face-london", "beard", "haircut"],
    heroImage: "/images/B43A7596.jpg",
  },
  manicure: {
    description:
      "Только гигиена и эстетика — без покрытий. Отдельный кабинет Fresh Hands, инструменты стерилизуются после каждого клиента.",
    includes: ["Обработка кутикулы", "Придание формы", "Полировка", "Массаж рук в финале"],
    relatedSlugs: ["manicure-express", "pedicure-full", "combo-manicure"],
    heroImage: "/images/B43A7767.jpg",
  },
  "manicure-express": {
    description:
      "Экспресс-уход за пятнадцать минут. Форма, кутикула, полировка — результат заметен сразу.",
    includes: ["Обработка кутикулы", "Придание формы", "Полировка"],
    relatedSlugs: ["manicure", "combo-express", "hand-massage"],
    heroImage: "/images/B43A7767.jpg",
  },
  "pedicure-full": {
    description:
      "Гигиенический педикюр пальцев и стоп в кабинете Fresh Hands. Аппаратная и ручная обработка, без покрытий.",
    includes: [
      "Размягчение в ванночке",
      "Аппаратная обработка стоп",
      "Коррекция ногтей и кутикулы",
      "Завершающий увлажняющий уход",
    ],
    relatedSlugs: ["manicure", "foot-massage", "pedicure-toes"],
    heroImage: "/images/B43A7767.jpg",
  },
  "pedicure-toes": {
    description:
      "Педикюр только пальцев без обработки стоп. Коррекция ногтей, кутикула, полировка.",
    includes: ["Размягчение", "Коррекция ногтей", "Обработка кутикулы", "Полировка"],
    relatedSlugs: ["pedicure-full", "manicure", "foot-massage"],
    heroImage: "/images/B43A7767.jpg",
  },
  "pedicure-express": {
    description: "Экспресс-педикюр за пятнадцать минут: форма ногтей и базовый уход.",
    includes: ["Коррекция ногтей", "Обработка кутикулы", "Полировка"],
    relatedSlugs: ["pedicure-full", "pedicure-toes", "foot-massage"],
    heroImage: "/images/B43A7767.jpg",
  },
  "foot-massage": {
    description:
      "Пятнадцать минут массажа стоп. Расслабление мышц, улучшение кровообращения, увлажнение.",
    includes: ["Массаж стоп", "Увлажняющий крем"],
    relatedSlugs: ["pedicure-full", "manicure", "hand-massage"],
    heroImage: "/images/B43A7767.jpg",
  },
  "hand-massage": {
    description: "Десять минут: массаж рук и нанесение увлажняющего крема.",
    includes: ["Массаж рук", "Увлажняющий крем"],
    relatedSlugs: ["manicure", "manicure-express", "foot-massage"],
    heroImage: "/images/B43A7767.jpg",
  },
  "combo-express": {
    description:
      "Стрижка и экспресс-маникюр одновременно — в четыре руки. Один час вместо двух, без ожидания.",
    includes: [
      "Мужская стрижка",
      "Экспресс-маникюр",
      "Параллельная работа в четыре руки",
      "Экономия времени",
    ],
    relatedSlugs: ["haircut", "manicure-express", "combo-manicure"],
    heroImage: "/images/B43A7874.jpg",
  },
  "combo-manicure": {
    description:
      "Два мастера работают одновременно — голова и руки за один визит. Скидка пятнадцать процентов от суммарной стоимости услуг.",
    includes: [
      "Мужская стрижка",
      "Мужской маникюр",
      "Параллельная работа в четыре руки",
      "Скидка 15% включена в цену",
    ],
    relatedSlugs: ["haircut", "manicure", "combo-express"],
    heroImage: "/images/B43A7735.jpg",
  },
  kids: {
    description:
      "Стрижка для мальчиков от пяти до десяти лет. Спокойная атмосфера, профессиональный подход, результат который нравится родителям и детям.",
    includes: ["Консультация с родителем", "Стрижка по структуре волос", "Укладка"],
    relatedSlugs: ["haircut", "clipper", "outline"],
    heroImage: "/images/B43A7645.jpg",
  },
  clipper: {
    description: "Стрижка машинкой с насадками. Аккуратный результат за тридцать минут.",
    includes: ["Стрижка машинкой", "Выравнивание линий", "Окантовка по контуру"],
    relatedSlugs: ["haircut", "outline", "head-shave"],
    heroImage: "/images/B43A7806.jpg",
  },
  outline: {
    description:
      "Чёткая окантовка по линии роста. Освежает стрижку между визитами и восстанавливает форму.",
    includes: ["Коррекция линии роста", "Окантовка висков", "Оформление затылка"],
    relatedSlugs: ["haircut", "clipper", "beard"],
    heroImage: "/images/B43A7874.jpg",
  },
  waxing: {
    description: "Ваксинг нос, уши или брови за десять минут. Чистый аккуратный результат.",
    includes: ["Воск в нужной зоне", "Успокаивающий финиш"],
    relatedSlugs: ["eyebrows", "haircut", "beard"],
    heroImage: "/images/B43A7667.jpg",
  },
  detox: {
    description:
      "Детокс кожи головы Graham Hill за пятнадцать минут. Снимает зуд, восстанавливает баланс, освежает ощущение.",
    includes: ["Нанесение состава Graham Hill", "Массаж кожи головы", "Смывание"],
    relatedSlugs: ["haircut", "scrub", "face-london"],
    heroImage: "/images/B43A7667.jpg",
  },
  eyebrows: {
    description: "Оформление бровей с учётом формы лица. Чёткие линии и аккуратный результат.",
    includes: ["Подбор формы", "Коррекция", "Оформление линий"],
    relatedSlugs: ["waxing", "haircut", "scrub"],
    heroImage: "/images/B43A7667.jpg",
  },
  camouflage: {
    description:
      "Камуфляж седины без яркого перекраса. Натуральный результат, который не привлекает лишнего внимания.",
    includes: ["Подбор оттенка", "Нанесение состава", "Выдержка и смывание", "Укладка"],
    relatedSlugs: ["haircut", "color", "styling"],
    heroImage: "/images/B43A7806.jpg",
  },
  color: {
    description:
      "Полное окрашивание профессиональными составами. Насыщенный цвет и минимальная нагрузка на структуру волос.",
    includes: [
      "Консультация и подбор цвета",
      "Нанесение красителя",
      "Выдержка и смывание",
      "Укладка",
    ],
    relatedSlugs: ["camouflage", "haircut", "styling"],
    heroImage: "/images/B43A7806.jpg",
  },
  styling: {
    description:
      "Профессиональная укладка с косметикой Davines или Graham Hill. Форма, которая держится.",
    includes: ["Нанесение стайлинга", "Укладка по структуре волос"],
    relatedSlugs: ["haircut", "detox", "haircut-beard"],
    heroImage: "/images/B43A7874.jpg",
  },
  massage: {
    description:
      "Двадцать минут массажа шейно-воротниковой зоны и лица. Снимает напряжение, улучшает кровообращение и самочувствие.",
    includes: ["Массаж шеи и воротниковой зоны", "Массаж лица", "Расслабляющий финиш"],
    relatedSlugs: ["face-london", "scrub", "haircut"],
    heroImage: "/images/B43A7792.jpg",
  },
};

// Barbers shown per service category
export const BARBERS_BY_CATEGORY: Record<
  string,
  Array<{ slug: string; name: string; role: string; reviews: number }>
> = {
  barbershop: [
    { slug: "marat", name: "Марат", role: "Старший мастер", reviews: 300 },
    { slug: "vyacheslav", name: "Вячеслав", role: "Мужской парикмахер", reviews: 276 },
    { slug: "sayod", name: "Сайод", role: "Мужской парикмахер", reviews: 239 },
  ],
  nails: [{ slug: "arina", name: "Арина", role: "Мастер ногтевого сервиса", reviews: 75 }],
  combo: [
    { slug: "marat", name: "Марат", role: "Старший мастер", reviews: 300 },
    { slug: "vyacheslav", name: "Вячеслав", role: "Мужской парикмахер", reviews: 276 },
    { slug: "arina", name: "Арина", role: "Мастер ногтевого сервиса", reviews: 75 },
  ],
};
