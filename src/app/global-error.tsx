"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ru">
      <body
        style={{
          margin: 0,
          background: "#0A0A0B",
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
        <h1 style={{ fontSize: "1.5rem", fontWeight: 400, margin: 0 }}>Что-то пошло не так</h1>
        <button
          onClick={reset}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#1B2A4E",
            color: "#F5F5F2",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: "0.875rem",
          }}
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
