export type BarberTag = "senior" | "barber" | "nails";

export type Barber = {
  slug: string;
  name: string;
  role: string;
  reviews: number;
  tags: BarberTag[];
  isBestEmployee?: boolean;
  isSenior?: boolean;
  imageSrc?: string;
  quote?: string;
  bio?: string;
  techniques?: string[];
};

export const BARBERS: Barber[] = [
  {
    slug: "marat",
    name: "Марат",
    role: "Старший мастер",
    reviews: 300,
    tags: ["senior"],
    isSenior: true,
    quote: "Стрижка — это не работа с волосами, это работа с пропорциями.",
    techniques: ["Classic taper", "Crew cut", "Текстурная стрижка"],
  },
  {
    slug: "vyacheslav",
    name: "Вячеслав",
    role: "Мужской парикмахер",
    reviews: 276,
    tags: ["barber"],
    techniques: ["Fade", "Undercut", "Бороды"],
  },
  {
    slug: "sayod",
    name: "Сайод",
    role: "Мужской парикмахер",
    reviews: 239,
    tags: ["senior", "barber"],
    isBestEmployee: true,
    quote: "Каждый клиент — новая задача. Шаблонов не существует.",
    techniques: ["Skin fade", "Drop fade", "Современные стрижки"],
  },
  {
    slug: "aleksey",
    name: "Алексей",
    role: "Мужской парикмахер",
    reviews: 213,
    tags: ["barber"],
    techniques: ["Taper", "Классика", "Контуринг бороды"],
  },
  {
    slug: "timerlan",
    name: "Тимерлан",
    role: "Мужской парикмахер",
    reviews: 177,
    tags: ["barber"],
    techniques: ["Fade", "Текстура", "Укладка"],
  },
  {
    slug: "nikolay",
    name: "Николай",
    role: "Мужской парикмахер",
    reviews: 153,
    tags: ["barber"],
    techniques: ["Classic cut", "Taper", "Бритьё"],
  },
  {
    slug: "dzhim",
    name: "Джим",
    role: "Мужской парикмахер",
    reviews: 113,
    tags: ["barber"],
    techniques: ["Skin fade", "Геометрия", "Бороды"],
  },
  {
    slug: "arina",
    name: "Арина",
    role: "Мастер ногтевого сервиса",
    reviews: 75,
    tags: ["nails"],
    quote: "Ухоженные руки — это знак уважения к себе.",
    techniques: ["Мужской маникюр", "Педикюр", "Экспресс-уход"],
  },
  {
    slug: "murat",
    name: "Мурат",
    role: "Мужской парикмахер",
    reviews: 15,
    tags: ["barber"],
    techniques: ["Fade", "Стрижка машинкой"],
  },
  {
    slug: "diana",
    name: "Диана",
    role: "Мужской парикмахер",
    reviews: 9,
    tags: ["barber"],
    techniques: ["Taper", "Классика"],
  },
];
