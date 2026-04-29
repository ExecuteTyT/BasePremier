import { Metadata } from "next";

import { CharReveal } from "@/components/motion/CharReveal";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { breadcrumbJsonLd, faqPageJsonLd, hairSalonJsonLd } from "@/lib/seo/jsonLd";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "О нас — BASE Premier | Премиальный барбершоп, Казань",
  description:
    "BASE Premier — премиальный барбершоп на Шаляпина 26 в Казани. Открылись в 2022 году. Десять мастеров, косметика Graham Hill и Davines. Ежедневно 10–21.",
  alternates: {
    canonical: "https://basepremier.ru/about",
  },
  openGraph: {
    title: "О нас — BASE Premier | Барбершоп Казань",
    description:
      "Барбершоп BASE Premier открылся в 2022 году. 10 мастеров, профессиональная косметика, тишина и высокие стандарты. Шаляпина 26.",
    url: "https://basepremier.ru/about",
    siteName: "BASE Premier",
    locale: "ru_RU",
    type: "website",
  },
};

const FAQ_ITEMS = [
  {
    question: "Сколько длится стрижка?",
    answer:
      "Час. Это базовая длительность для большинства услуг. Если у вас борода — добавляется 30 минут. Точная длительность каждой услуги указана на странице услуги.",
  },
  {
    question: "Можно ли записаться без онлайн-записи?",
    answer:
      "Можно. Позвоните по номеру +7 (917) 918-38-77 или напишите в WhatsApp / Telegram на этот же номер. Но онлайн-запись через сайт — быстрее: вы видите свободные окна всех мастеров и записываетесь в один клик.",
  },
  {
    question: "Что значат разные цены на одну услугу — 1 800 и 2 700 ₽?",
    answer:
      "Это категории мастеров. У младших мастеров — стартовая цена. У старших — финальная. Все мастера прошли одинаковое обучение внутри BASE Premier; разница в опыте, скорости и количестве отработанных случаев. Выбор — за вами.",
  },
  {
    question: "Делаете ли вы детские стрижки?",
    answer:
      "Да, для детей от 5 до 10 лет. Длительность — час, как и у взрослого клиента. Цена — 1 600–2 400 ₽. Если ребёнку нужно отвлечься, у нас есть планшет с играми и наушниками.",
  },
  {
    question: "Какие средства используются на полках?",
    answer:
      "Graham Hill (Германия), Davines (Италия), The London Grooming Co (Великобритания), Solomon's (Великобритания). Это профессиональная косметика, а не «парикмахерский ширпотреб». Подбор делает мастер по типу ваших волос и кожи головы.",
  },
  {
    question: "Есть ли мужской маникюр и педикюр?",
    answer:
      "Да. Ногтевой зал называется «Fresh Hands» — отдельный кабинет внутри барбершопа. Маникюр — 1 900 ₽, педикюр — от 2 300 ₽. Покрытий не делаем: только гигиеническая и эстетическая обработка.",
  },
  {
    question: "Можно ли совместить стрижку и маникюр?",
    answer:
      "Да, и это выгодно. Есть два варианта: одновременно (мастера работают в 4 руки, час, 2 800–3 700 ₽) или последовательно (два часа, 3 100–4 000 ₽, скидка до 15 %). При записи на комплекс выбирайте «Комплекс» в виджете записи.",
  },
  {
    question: "Принимаете ли вы по картам лояльности?",
    answer:
      "У нас есть накопительная программа в YClients — она автоматически активируется после первого визита. Скидку получаете на 5-й, 10-й и 15-й визит. Дополнительной карты иметь не нужно.",
  },
  {
    question: "Что с алкогольными напитками в зале?",
    answer:
      "В нашем зале не предлагают алкоголь. Это сознательное решение: мы не «мужской клуб с виски», мы — барбершоп. Кофе, чай, вода — в любое время. Если вы предпочитаете кофе с молоком или особый сорт чая, скажите администратору при входе.",
  },
  {
    question: "Есть ли подарочные сертификаты?",
    answer:
      "Да, в физическом виде, на любую сумму. Купить можно на ресепшене салона. Срок действия — 12 месяцев с даты покупки. Онлайн-покупки сертификатов пока нет.",
  },
  {
    question: "Сколько у вас филиалов в Казани?",
    answer:
      "Один. Шаляпина, 26, в самом центре, в трёхстах метрах от Концертного зала Филармонии. Парковка — по периметру здания и на соседних улицах.",
  },
  {
    question: "Как добраться от метро?",
    answer:
      "Ближайшие станции метро — «Площадь Тукая» (8 минут пешком) и «Кремлёвская» (10 минут пешком).",
  },
];

const VALUES = [
  {
    num: "01",
    title: "Час, а не 30 минут",
    body: "Большинство барбершопов выделяют 30 минут на стрижку. Мы — час. В этот час входит детокс кожи головы, мытьё, стрижка по структуре волос, моделирование, укладка и завершающее парфюмирование. В среднем — в два раза больше работы.",
  },
  {
    num: "02",
    title: "Профессиональная косметика",
    body: "В нашем зале на полках — Graham Hill, Davines, The London Grooming Co и Solomon's. Шампунь для тонких волос, шампунь для жирной кожи головы, тоник с никотиновой кислотой, восемь видов укладочных средств. Под вашу структуру волос мы подбираем средство, а не используем универсальное.",
  },
  {
    num: "03",
    title: "Десять мастеров, не один универсал",
    body: "В нашем зале десять мастеров. Каждый — со своим почерком и любимыми техниками. Если ваша задача — fade с короткими висками и длинной макушкой, к Сайоду вы попадёте быстрее, чем к универсальному мастеру в массмаркете. Мы не назначаем мастера автоматически — вы выбираете.",
  },
  {
    num: "04",
    title: "Тишина, а не open space",
    body: "В нашем зале — пять рабочих мест и десять минут между визитами. Это значит: вы не сидите рядом с другим клиентом «локоть в локоть», вас не отвлекает разговор соседа, и мастер не торопится — он работает с вашими волосами, а не «успевает до следующего».",
  },
];

export default function AboutPage() {
  const jsonLd = [
    hairSalonJsonLd(),
    faqPageJsonLd(FAQ_ITEMS),
    breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "О нас", url: "/about" },
    ]),
  ];

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <main id="main">
        {/* Hero */}
        <section className="bg-bg-primary pb-0 pt-28 md:pt-40">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <p className="mb-6 font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted">
              С 2022 · Казань
            </p>
            <CharReveal
              as="h1"
              className="font-display font-normal text-fg-primary"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              О нас
            </CharReveal>
          </div>
        </section>

        {/* Manifesto */}
        <section className="bg-bg-primary py-20 md:py-28">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="mx-auto max-w-[640px]">
              <div className="space-y-6 font-sans text-[1.125rem] leading-relaxed text-fg-muted [&_strong]:font-normal [&_strong]:text-fg-primary">
                <p>
                  BASE Premier — премиальный барбершоп в Казани. Мы открылись в 2022 году в самом
                  центре города, на улице Шаляпина, 26 — в трёхстах метрах от Концертного зала
                  Филармонии.
                </p>
                <p>
                  <strong>Мы делаем три вещи: стрижём, ухаживаем, заботимся.</strong>
                </p>
                <p>И ничего больше.</p>
                <p>
                  В этом — суть. У нас нет бильярда, кальянной комнаты, дорогого виски и притворной
                  мужской атмосферы. Если вам нужно мужское пространство в стиле американского клуба
                  — мы посоветуем коллег. Здесь — другое.
                </p>
                <p>
                  Здесь тишина. Свет, который не режет глаз. Музыка, которую можно не слушать. Один
                  час, в течение которого десять человек команды работают для одного клиента.
                </p>
                <p>
                  В нашем зале — десять мастеров, каждый из которых за плечами имеет от ста до
                  трёхсот стрижек. В работе мы используем профессиональные средства от{" "}
                  <strong>Graham Hill, Davines, The London Grooming Co и Solomon&apos;s</strong> —
                  те же, которыми пользуются в Лондоне, Милане и Берлине.
                </p>
                <p>
                  Каждая стрижка длится не меньше часа. В этот час входит детокс кожи головы, мытьё,
                  стрижка по структуре волос, моделирование, укладка, бритьё шеи. Если у вас борода
                  — добавляется получасовая работа над контурами и компресс.
                </p>
                <p>
                  Мы знаем, что у людей, которые приходят к нам, — бизнес, переговоры, дети,
                  тренажёры, утренние кофе и вечерние самолёты. Поэтому мы держим зал открытым семь
                  дней в неделю, с десяти утра до девяти вечера. Записаться можно за один клик —
                  прямо здесь, на сайте.
                </p>
                <p>
                  Мы не обещаем «преобразить вас». Мы обещаем час покоя и чёткую, продуманную
                  работу. Это всё, что нужно. Этого, как правило, достаточно.
                </p>
                <p className="text-fg-primary/60">
                  — BASE Premier
                  <br />
                  <span className="font-mono text-[13px] uppercase tracking-[0.15em]">
                    ул. Шаляпина, 26 · Казань · с 2022
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values — 4 principles */}
        <section className="border-t border-border-default bg-bg-secondary py-20 md:py-28">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <p className="mb-7 font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted">
              Стандарты
            </p>
            <div className="grid gap-7 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {VALUES.map((v) => (
                <div key={v.num}>
                  <p
                    aria-hidden="true"
                    className="mb-4 font-mono text-[2rem] font-normal leading-none text-fg-muted/60"
                  >
                    {v.num}
                  </p>
                  <h2 className="mb-3 font-display font-normal text-[1.25rem] leading-tight text-fg-primary">
                    {v.title}
                  </h2>
                  <p className="font-sans text-body leading-relaxed text-fg-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-border-default bg-bg-primary py-20 md:py-28">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="grid gap-16 md:grid-cols-[1fr_2fr]">
              <div>
                <p className="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-fg-muted">
                  FAQ
                </p>
                <h2 className="font-display font-normal text-[2rem] leading-tight text-fg-primary">
                  Частые
                  <br />
                  вопросы
                </h2>
              </div>
              <FaqAccordion items={FAQ_ITEMS} defaultOpen={0} />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border-default bg-bg-primary py-16 md:py-20">
          <div className="mx-auto max-w-screen-xl px-6 md:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="font-sans text-body leading-relaxed text-fg-muted">
                Остались вопросы?{" "}
                <span className="text-fg-primary">Позвоните — ответим на всё.</span>
              </p>
              <a
                href="tel:+79179183877"
                className="font-mono text-[1rem] text-fg-primary transition-opacity duration-base hover:opacity-70 md:text-[1.125rem]"
              >
                +7 (917) 918-38-77
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
