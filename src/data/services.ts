export type Service = {
  id: string;
  name: string;
  duration: number; // minutes
  price: number | [number, number];
  from?: boolean;
  note?: string;
};

export type ServiceCategory = {
  id: string;
  name: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "barbershop",
    name: "Парикмахерский зал",
    services: [
      { id: "haircut", name: "Мужская стрижка", duration: 60, price: [1800, 2700] },
      { id: "haircut-beard", name: "Мужская стрижка с бородой", duration: 90, price: [3200, 4600] },
      { id: "beard", name: "Моделирование бороды", duration: 30, price: [1400, 1900] },
      {
        id: "beard-premium",
        name: "Премиальное моделирование SOLOMON'S",
        duration: 60,
        price: 3000,
      },
      {
        id: "face-london",
        name: "Премиальный уход за лицом London Grooming",
        duration: 30,
        price: 2150,
      },
      {
        id: "kids",
        name: "Детская стрижка",
        duration: 60,
        price: [1600, 2400],
        note: "5–10 лет",
      },
      { id: "clipper", name: "Стрижка машинкой", duration: 30, price: [1400, 2000] },
      { id: "outline", name: "Окантовка", duration: 30, price: [1200, 1500] },
      { id: "waxing", name: "Ваксинг (нос / уши / брови)", duration: 10, price: 700 },
      { id: "detox", name: "Детокс кожи головы Graham Hill", duration: 15, price: 600 },
      { id: "eyebrows", name: "Оформление бровей", duration: 20, price: 1200 },
      { id: "head-shave", name: "Бритьё головы", duration: 60, price: 2000 },
      { id: "shave", name: "Гладкое бритьё лица", duration: 45, price: 1800 },
      { id: "camouflage", name: "Камуфляж седины", duration: 30, price: 1600, from: true },
      { id: "color", name: "Окрашивание", duration: 60, price: 7000, from: true },
      { id: "scrub", name: "Скраб + чёрная маска", duration: 25, price: 1500 },
      { id: "styling", name: "Укладка", duration: 15, price: 600 },
      { id: "massage", name: "Массаж шейно-воротниковой зоны и лица", duration: 20, price: 1200 },
    ],
  },
  {
    id: "combo",
    name: "Комплексные услуги",
    services: [
      {
        id: "combo-express",
        name: "Стрижка + Экспресс маникюр",
        duration: 60,
        price: [2800, 3700],
        note: "В 4 руки, одновременно",
      },
      {
        id: "combo-manicure",
        name: "Стрижка + Маникюр",
        duration: 120,
        price: [3100, 4000],
        note: "Экономия 15%",
      },
    ],
  },
  {
    id: "nails",
    name: "Ногтевой зал «Fresh Hands»",
    services: [
      { id: "manicure", name: "Мужской маникюр", duration: 60, price: 1900 },
      { id: "manicure-express", name: "Экспресс маникюр", duration: 15, price: 1000 },
      {
        id: "pedicure-full",
        name: "Педикюр гигиенический (пальцы + стопы)",
        duration: 60,
        price: 3000,
      },
      {
        id: "pedicure-toes",
        name: "Педикюр гигиенический (только пальцы)",
        duration: 60,
        price: 2300,
      },
      { id: "pedicure-express", name: "Экспресс педикюр", duration: 15, price: 1200 },
      { id: "foot-massage", name: "Массаж стоп", duration: 15, price: 1500 },
      { id: "hand-massage", name: "Массаж рук", duration: 10, price: 500 },
    ],
  },
];
