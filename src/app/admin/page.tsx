import dynamic from "next/dynamic";

const AdminDashboard = dynamic(() => import("@/components/admin/Dashboard"));

export default function AdminPage() {
  return <AdminDashboard />;
}
