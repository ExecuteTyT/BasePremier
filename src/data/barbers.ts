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
};

export const BARBERS: Barber[] = [
  {
    slug: "marat",
    name: "Марат",
    role: "Старший мастер",
    reviews: 300,
    tags: ["senior"],
    isSenior: true,
  },
  {
    slug: "vyacheslav",
    name: "Вячеслав",
    role: "Мужской парикмахер",
    reviews: 276,
    tags: ["barber"],
  },
  {
    slug: "sayod",
    name: "Сайод",
    role: "Мужской парикмахер",
    reviews: 239,
    tags: ["senior", "barber"],
    isBestEmployee: true,
  },
  {
    slug: "aleksey",
    name: "Алексей",
    role: "Мужской парикмахер",
    reviews: 213,
    tags: ["barber"],
  },
  {
    slug: "timerlan",
    name: "Тимерлан",
    role: "Мужской парикмахер",
    reviews: 177,
    tags: ["barber"],
  },
  {
    slug: "nikolay",
    name: "Николай",
    role: "Мужской парикмахер",
    reviews: 153,
    tags: ["barber"],
  },
  {
    slug: "dzhim",
    name: "Джим",
    role: "Мужской парикмахер",
    reviews: 113,
    tags: ["barber"],
  },
  {
    slug: "arina",
    name: "Арина",
    role: "Мастер ногтевого сервиса",
    reviews: 75,
    tags: ["nails"],
  },
  {
    slug: "murat",
    name: "Мурат",
    role: "Мужской парикмахер",
    reviews: 15,
    tags: ["barber"],
  },
  {
    slug: "diana",
    name: "Диана",
    role: "Мужской парикмахер",
    reviews: 9,
    tags: ["barber"],
  },
];
