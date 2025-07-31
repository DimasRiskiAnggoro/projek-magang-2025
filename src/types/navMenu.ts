export interface NavChild {
  name: string;
  href: string;
}

export interface NavItem {
  name: string;
  href?: string;
  children?: NavChild[];
}

// 2. Data NAV_MENU yang sudah sesuai interface
const NAV_MENU: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Berita", href: "/berita" },
  {
    name: "Pemerintah Kota Madiun",
    children: [
      { name: "PPID Kota Madiun", href: "#" },
      { name: "Kecamatan Taman", href: "#" },
      { name: "Maguharjo", href: "#" },
      { name: "Kartoharjo", href: "#" },
    ],
  },
  {
    name: "Kelurahan",
    children: [
      { name: "Kelurahan Taman", href: "#" },
      { name: "Kelurahan Banjarejo", href: "#" },
      { name: "Kelurahan Demangan", href: "#" },
      { name: "Kelurahan Kejuron", href: "#" },
      { name: "Kelurahan Josenan", href: "#" },
      { name: "Kelurahan Pandean", href: "#" },
      { name: "Kelurahan Manisrejo", href: "#" },
      { name: "Kelurahan Mojorejo", href: "#" },
      { name: "Kelurahan Kuncen", href: "#" },
      { name: "Prodeskel PMD", href: "#" },
    ],
  },
  {
    name: "Tentang",
    children: [
      { name: "Profil OPD", href: "#" },
      { name: "Profil Camat Taman Kota Madiun", href: "#" },
      { name: "Visi Dan Misi", href: "#" },
      { name: "STANDAR PELAYANAN KECAMATAN TAMAN TAHUN 2024 (6 Komponen)", href: "#" },
      { name: "Data Pegawai", href: "#" },
      { name: "Tupoksi", href: "#" },
      { name: "SK", href: "#" },
      { name: "Struktur Organisasi", href: "#" },
      { name: "Maklumat Pelayanan", href: "#" },
    ],
  },
  {
    name: "PPID",
    children: [
      { name: "Kontak, Struktur Organisasi, Visi Misi PPID Kecamatan Taman", href: "/category/ppid/kontak" },
      { name: "TUGAS DAN FUNGSI PPID PELAKSANA KECAMATAN TAMAN", href: "#" },
      { name: "Informasi Secara Berkala", href: "#" },
      { name: "SK PPID", href: "#" },
      { name: "Informasi Setiap Saat", href: "#" },
      { name: "Informasi Serta Merta", href: "#" },
      { name: "Informasi Dikecualikan", href: "#" },
      { name: "Laporan PPID", href: "#" },
      { name: "Daftar Informasi Publik Kecamatan Taman", href: "#" },
    ],
  },
  {
    name: "Layanan Publik",
    children: [
      { name: "Jam Pelayanan Kecamatan Taman", href: "#" },
      { name: "Standar Pelayanan Kecamatan Taman", href: "#" },
      { name: "Rekapitulasi Umpan Balik Konsultasi Dan Pengaduan Di Kecamatan Taman", href: "#" },
      { name: "RINGKASAN PERMOHONAN INFORMASI PUBLIK KECAMATAN TAMAN TAHUN 2022", href: "#" },
      { name: "Permohonan Informasi Publik", href: "#" },
      { name: "Pengajuan Keberatan Informasi", href: "#" },
      { name: "INOVASI", href: "#" },
    ],
  },
  {
    name: "Hubungi Kami",
    children: [
      { name: "TATA CARA PERMOHONAN INFORMASI PUBLIK", href: "#" },
      { name: "TATA CARA PENGAJUAN KEBERATAN DAN PROSES PENYELESAIAN SENGKETA INFORMASI PUBLIK", href: "#" },
      { name: "Tata Cara Aspirasi Dan Pengaduan Masyarakat", href: "#" },
      { name: "APLIKASI ONLINE KECAMATAN TAMAN", href: "#" },
    ],
  },
  { name: "FAQ", children: [] },
  { name: "VISIT TAMAN", children: [] },
  { name: "JALUR WISATA", children: [] },
];

export default NAV_MENU;
