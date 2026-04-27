import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — BASE Premier",
  description: "Политика обработки персональных данных ИП Шайхутдинов Айрат Рафаэлевич.",
  alternates: {
    canonical: "https://basepremier.ru/privacy",
  },
  robots: {
    index: false,
  },
};

export default function PrivacyPage() {
  return (
    <main id="main" className="bg-bg-primary pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-screen-xl px-6 md:px-8">
        <div className="mx-auto max-w-[720px]">
          <h1
            className="mb-10 font-display font-normal text-fg-primary"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Политика конфиденциальности
          </h1>

          <div className="space-y-8 font-sans text-body leading-relaxed text-fg-muted">
            <section>
              <h2 className="mb-3 font-display font-normal text-[1.125rem] text-fg-primary">
                1. Общие положения
              </h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты
                персональных данных физических лиц, использующих сайт{" "}
                <span className="text-fg-primary">basepremier.ru</span>.
              </p>
              <p className="mt-3">
                Оператор персональных данных: ИП Шайхутдинов Айрат Рафаэлевич, ИНН 163207031442,
                ОГРНИП 321169000005742. Адрес: Республика Татарстан, г. Казань.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display font-normal text-[1.125rem] text-fg-primary">
                2. Какие данные мы обрабатываем
              </h2>
              <p>
                Настоящий сайт не собирает персональные данные через формы. Запись на услуги
                производится через виджет сервиса YClients — оператора персональных данных в части
                обработки информации о записях. Их политика конфиденциальности размещена на сайте
                yclients.com.
              </p>
              <p className="mt-3">
                Сайт использует файлы cookie для корректной работы и сбора статистики посещаемости
                через Яндекс.Метрику. Данные Яндекс.Метрики обрабатываются в соответствии с
                политикой Яндекса.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display font-normal text-[1.125rem] text-fg-primary">
                3. Файлы cookie
              </h2>
              <p>
                Мы используем технические cookie (необходимые для работы сайта) и аналитические
                cookie (Яндекс.Метрика). При первом посещении вы можете принять или отклонить
                использование аналитических cookie через баннер на сайте.
              </p>
              <p className="mt-3">
                Отказ от аналитических cookie не влияет на функциональность сайта.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display font-normal text-[1.125rem] text-fg-primary">
                4. Ваши права
              </h2>
              <p>
                В соответствии с Федеральным законом № 152-ФЗ «О персональных данных» вы имеете
                право на доступ к своим персональным данным, их исправление и удаление. Запросы
                принимаются по телефону +7 (917) 918-38-77 или в мессенджерах.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display font-normal text-[1.125rem] text-fg-primary">
                5. Изменения политики
              </h2>
              <p>
                Оператор вправе вносить изменения в настоящую политику. Актуальная версия всегда
                доступна по адресу <span className="text-fg-primary">basepremier.ru/privacy</span>.
              </p>
            </section>

            <p className="pt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-muted/40">
              Последнее обновление: апрель 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
