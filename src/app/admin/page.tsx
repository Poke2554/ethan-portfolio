import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin — Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <section className="page-shell pt-28">
      <AdminPanel />
    </section>
  );
}
