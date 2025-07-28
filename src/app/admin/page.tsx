import AdminLayout from "@/components/layout/AdminLayout";

export default function AdminPage() {
  return (
    <AdminLayout>
      {/* Ganti dengan kelas .themed-card */}
      <div className="themed-card p-6">
        <h2 className="font-semibold text-lg mb-2">Selamat datang di halaman admin!</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Ini adalah dashboard admin. Kamu bisa mengelola data berita dan akun disini.
        </p>
      </div>
    </AdminLayout>
  );
}