export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ animation: "pageEnter 0.5s cubic-bezier(0.19,1,0.22,1) forwards" }}>
      {children}
    </div>
  );
}
