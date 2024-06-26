import AdminSideBar from "@/components/AdminSideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-6xl flex justify-between mx-auto pt-8 pb-4 px-4 mt-8">
        <AdminSideBar/>
        <section className="w-full">{children}</section>
    </main>
  );
}
