export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>HEADER</header>
      <main>{children}</main>
    </>
  );
}
