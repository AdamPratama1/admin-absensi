// Mock data untuk sistem absensi sekolah

export interface User {
  id_user: number;
  name: string;
  email: string;
  password: string;
  role: 'guru' | 'siswa';
  tanggal: string;
}

export interface Siswa {
  id_siswa: number;
  nama_siswa: string;
  id_user: number;
  id_kelas: number;
}

export interface Guru {
  id_guru: number;
  nama_guru: string;
  jenis_kelamin: 'L' | 'P';
  id_user: number;
}

export interface Kelas {
  id_kelas: number;
  nama_kelas: string;
}

export interface Mapel {
  id_mapel: number;
  nama_mapel: string;
}

export interface AbsensiSiswa {
  id_absen: number;
  tanggal: string;
  jam: string;
  status: 'H' | 'I' | 'S' | 'A';
  lokasi: string;
  foto_wajah: string;
  surat_izin?: string;
  id_siswa: number;
}

export interface AbsensiGuru {
  id_absen: number;
  tanggal: string;
  jam: string;
  status: 'H' | 'I' | 'S' | 'A';
  lokasi: string;
  foto_wajah: string;
  id_guru: number;
}

export interface JurnalGuru {
  id_jurnal: number;
  jumlah_jam: number;
  lokasi: string;
  deskripsi: string;
  tanggal: string;
  id_guru: number;
  id_kelas: number;
}

export interface NilaiSiswa {
  id_nilai: number;
  nilai: number;
  jenis_nilai: 'Harian' | 'Ulangan' | 'UTS' | 'UAS';
  tanggal: string;
  id_siswa: number;
  id_mapel: number;
}

// Data Kelas
export const kelasData: Kelas[] = [
  { id_kelas: 1, nama_kelas: 'X IPA 1' },
  { id_kelas: 2, nama_kelas: 'X IPA 2' },
  { id_kelas: 3, nama_kelas: 'X IPS 1' },
  { id_kelas: 4, nama_kelas: 'XI IPA 1' },
  { id_kelas: 5, nama_kelas: 'XI IPA 2' },
  { id_kelas: 6, nama_kelas: 'XI IPS 1' },
  { id_kelas: 7, nama_kelas: 'XII IPA 1' },
  { id_kelas: 8, nama_kelas: 'XII IPA 2' },
];

// Data Mapel
export const mapelData: Mapel[] = [
  { id_mapel: 1, nama_mapel: 'Matematika' },
  { id_mapel: 2, nama_mapel: 'Bahasa Indonesia' },
  { id_mapel: 3, nama_mapel: 'Bahasa Inggris' },
  { id_mapel: 4, nama_mapel: 'Fisika' },
  { id_mapel: 5, nama_mapel: 'Kimia' },
  { id_mapel: 6, nama_mapel: 'Biologi' },
  { id_mapel: 7, nama_mapel: 'Sejarah' },
  { id_mapel: 8, nama_mapel: 'Ekonomi' },
];

// Data Users
export const usersData: User[] = [
  { id_user: 1, name: 'Ahmad Fauzi', email: 'ahmad.fauzi@sekolah.id', password: 'password123', role: 'guru', tanggal: '2024-01-15' },
  { id_user: 2, name: 'Siti Nurhaliza', email: 'siti.nurhaliza@sekolah.id', password: 'password123', role: 'guru', tanggal: '2024-01-15' },
  { id_user: 3, name: 'Budi Santoso', email: 'budi.santoso@sekolah.id', password: 'password123', role: 'guru', tanggal: '2024-01-20' },
  { id_user: 4, name: 'Dewi Kartika', email: 'dewi.kartika@sekolah.id', password: 'password123', role: 'guru', tanggal: '2024-02-01' },
  { id_user: 5, name: 'Andi Pratama', email: 'andi.pratama@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-10' },
  { id_user: 6, name: 'Rina Wulandari', email: 'rina.wulandari@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-10' },
  { id_user: 7, name: 'Fajar Nugroho', email: 'fajar.nugroho@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-12' },
  { id_user: 8, name: 'Maya Sari', email: 'maya.sari@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-12' },
  { id_user: 9, name: 'Rizky Hidayat', email: 'rizky.hidayat@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-15' },
  { id_user: 10, name: 'Putri Anggraini', email: 'putri.anggraini@siswa.sekolah.id', password: 'password123', role: 'siswa', tanggal: '2024-01-15' },
];

// Data Guru
export const guruData: Guru[] = [
  { id_guru: 1, nama_guru: 'Ahmad Fauzi, S.Pd', jenis_kelamin: 'L', id_user: 1 },
  { id_guru: 2, nama_guru: 'Siti Nurhaliza, M.Pd', jenis_kelamin: 'P', id_user: 2 },
  { id_guru: 3, nama_guru: 'Budi Santoso, S.Pd', jenis_kelamin: 'L', id_user: 3 },
  { id_guru: 4, nama_guru: 'Dewi Kartika, M.Pd', jenis_kelamin: 'P', id_user: 4 },
];

// Data Siswa
export const siswaData: Siswa[] = [
  { id_siswa: 1, nama_siswa: 'Andi Pratama', id_user: 5, id_kelas: 1 },
  { id_siswa: 2, nama_siswa: 'Rina Wulandari', id_user: 6, id_kelas: 1 },
  { id_siswa: 3, nama_siswa: 'Fajar Nugroho', id_user: 7, id_kelas: 2 },
  { id_siswa: 4, nama_siswa: 'Maya Sari', id_user: 8, id_kelas: 2 },
  { id_siswa: 5, nama_siswa: 'Rizky Hidayat', id_user: 9, id_kelas: 4 },
  { id_siswa: 6, nama_siswa: 'Putri Anggraini', id_user: 10, id_kelas: 4 },
];

// Data Absensi Siswa
export const absensiSiswaData: AbsensiSiswa[] = [
  { id_absen: 1, tanggal: '2024-01-30', jam: '07:15', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 1 },
  { id_absen: 2, tanggal: '2024-01-30', jam: '07:10', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 2 },
  { id_absen: 3, tanggal: '2024-01-30', jam: '07:20', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 3 },
  { id_absen: 4, tanggal: '2024-01-30', jam: '00:00', status: 'I', lokasi: '-', foto_wajah: '/placeholder.svg', surat_izin: '/placeholder.svg', id_siswa: 4 },
  { id_absen: 5, tanggal: '2024-01-30', jam: '07:05', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 5 },
  { id_absen: 6, tanggal: '2024-01-30', jam: '07:25', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 6 },
  { id_absen: 7, tanggal: '2024-01-29', jam: '07:00', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 1 },
  { id_absen: 8, tanggal: '2024-01-29', jam: '07:08', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 2 },
  { id_absen: 9, tanggal: '2024-01-29', jam: '00:00', status: 'S', lokasi: '-', foto_wajah: '/placeholder.svg', surat_izin: '/placeholder.svg', id_siswa: 3 },
  { id_absen: 10, tanggal: '2024-01-29', jam: '07:12', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_siswa: 4 },
];

// Data Absensi Guru
export const absensiGuruData: AbsensiGuru[] = [
  { id_absen: 1, tanggal: '2024-01-30', jam: '06:45', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_guru: 1 },
  { id_absen: 2, tanggal: '2024-01-30', jam: '06:50', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_guru: 2 },
  { id_absen: 3, tanggal: '2024-01-30', jam: '06:55', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_guru: 3 },
  { id_absen: 4, tanggal: '2024-01-30', jam: '00:00', status: 'I', lokasi: '-', foto_wajah: '/placeholder.svg', id_guru: 4 },
  { id_absen: 5, tanggal: '2024-01-29', jam: '06:40', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_guru: 1 },
  { id_absen: 6, tanggal: '2024-01-29', jam: '06:48', status: 'H', lokasi: 'SMA Negeri 1', foto_wajah: '/placeholder.svg', id_guru: 2 },
];

// Data Jurnal Guru
export const jurnalGuruData: JurnalGuru[] = [
  { id_jurnal: 1, jumlah_jam: 2, lokasi: 'Ruang Kelas X IPA 1', deskripsi: 'Mengajar Matematika Bab 3: Trigonometri', tanggal: '2024-01-30', id_guru: 1, id_kelas: 1 },
  { id_jurnal: 2, jumlah_jam: 2, lokasi: 'Ruang Kelas X IPA 2', deskripsi: 'Mengajar Bahasa Indonesia: Puisi Modern', tanggal: '2024-01-30', id_guru: 2, id_kelas: 2 },
  { id_jurnal: 3, jumlah_jam: 3, lokasi: 'Lab Fisika', deskripsi: 'Praktikum Fisika: Gerak Lurus Berubah Beraturan', tanggal: '2024-01-30', id_guru: 3, id_kelas: 4 },
  { id_jurnal: 4, jumlah_jam: 2, lokasi: 'Ruang Kelas XI IPA 1', deskripsi: 'Mengajar Matematika Lanjutan', tanggal: '2024-01-29', id_guru: 1, id_kelas: 4 },
  { id_jurnal: 5, jumlah_jam: 2, lokasi: 'Ruang Kelas X IPS 1', deskripsi: 'Mengajar Bahasa Indonesia: Teks Eksposisi', tanggal: '2024-01-29', id_guru: 2, id_kelas: 3 },
];

// Data Nilai Siswa
export const nilaiSiswaData: NilaiSiswa[] = [
  { id_nilai: 1, nilai: 85, jenis_nilai: 'Harian', tanggal: '2024-01-25', id_siswa: 1, id_mapel: 1 },
  { id_nilai: 2, nilai: 90, jenis_nilai: 'Ulangan', tanggal: '2024-01-28', id_siswa: 1, id_mapel: 1 },
  { id_nilai: 3, nilai: 78, jenis_nilai: 'Harian', tanggal: '2024-01-25', id_siswa: 2, id_mapel: 1 },
  { id_nilai: 4, nilai: 88, jenis_nilai: 'Harian', tanggal: '2024-01-26', id_siswa: 1, id_mapel: 2 },
  { id_nilai: 5, nilai: 92, jenis_nilai: 'Ulangan', tanggal: '2024-01-28', id_siswa: 2, id_mapel: 2 },
  { id_nilai: 6, nilai: 75, jenis_nilai: 'Harian', tanggal: '2024-01-25', id_siswa: 3, id_mapel: 4 },
  { id_nilai: 7, nilai: 80, jenis_nilai: 'UTS', tanggal: '2024-01-20', id_siswa: 1, id_mapel: 1 },
  { id_nilai: 8, nilai: 85, jenis_nilai: 'UTS', tanggal: '2024-01-20', id_siswa: 2, id_mapel: 1 },
  { id_nilai: 9, nilai: 82, jenis_nilai: 'Harian', tanggal: '2024-01-27', id_siswa: 4, id_mapel: 3 },
  { id_nilai: 10, nilai: 95, jenis_nilai: 'UAS', tanggal: '2024-01-15', id_siswa: 5, id_mapel: 1 },
];

// Helper functions
export const getKelasById = (id: number) => kelasData.find(k => k.id_kelas === id);
export const getMapelById = (id: number) => mapelData.find(m => m.id_mapel === id);
export const getSiswaById = (id: number) => siswaData.find(s => s.id_siswa === id);
export const getGuruById = (id: number) => guruData.find(g => g.id_guru === id);
export const getUserById = (id: number) => usersData.find(u => u.id_user === id);
export const getUserByEmail = (email: string) => usersData.find(u => u.email === email);
