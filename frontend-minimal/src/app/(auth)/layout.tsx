export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100vw',
      }}
    >
      {children}
    </div>
  );
}
