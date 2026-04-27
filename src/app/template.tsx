"use client";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        animation: "pageEnter 0.5s cubic-bezier(0.19,1,0.22,1) both",
      }}
    >
      <style>{`
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pageEnter { from { opacity: 0; } to { opacity: 1; } }
        }
      `}</style>
      {children}
    </div>
  );
}
