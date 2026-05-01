import { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Страница не найдена — BASE Premier",
  description: "Запрошенная страница не существует. Вернитесь на главную или выберите раздел сайта.",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          background: "#18181b",
          color: "#F5F5F2",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: "1.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            position: "absolute",
            fontSize: "clamp(10rem, 30vw, 22rem)",
            opacity: 0.04,
            fontWeight: 400,
            margin: 0,
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: "-0.05em",
          }}
          aria-hidden="true"
        >
          404
        </p>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>Страница не найдена</h1>
        <Link
          href="/"
          style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            background: "#1B2A4E",
            color: "#F5F5F2",
            textDecoration: "none",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          На главную
        </Link>
      </body>
    </html>
  );
}
