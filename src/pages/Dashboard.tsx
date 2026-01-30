import { motion } from 'framer-motion';
import { Users, GraduationCap, UserCog, School, ClipboardCheck, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { StatsCard } from '@/components/ui/StatsCard';
import { PageHeader } from '@/components/ui/PageHeader';
import { siswaData, guruData, kelasData, absensiSiswaData, absensiGuruData } from '@/data/mockData';

const absensiChartData = [
  { name: 'Sen', siswa: 45, guru: 8 },
  { name: 'Sel', siswa: 48, guru: 9 },
  { name: 'Rab', siswa: 42, guru: 8 },
  { name: 'Kam', siswa: 47, guru: 9 },
  { name: 'Jum', siswa: 50, guru: 10 },
];

const statusPieData = [
  { name: 'Hadir', value: 85, color: 'hsl(142, 76%, 36%)' },
  { name: 'Izin', value: 8, color: 'hsl(38, 92%, 50%)' },
  { name: 'Sakit', value: 5, color: 'hsl(217, 91%, 60%)' },
  { name: 'Alpha', value: 2, color: 'hsl(0, 84%, 60%)' },
];

export default function Dashboard() {
  const todayAbsensiSiswa = absensiSiswaData.filter(a => a.tanggal === '2024-01-30').length;
  const todayAbsensiGuru = absensiGuruData.filter(a => a.tanggal === '2024-01-30').length;

  return (
    <AdminLayout>
      <PageHeader
        title="Dashboard"
        description="Selamat datang di Admin Dashboard Sistem Absensi Sekolah"
      />

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Siswa"
          value={siswaData.length}
          icon={GraduationCap}
          description="Siswa terdaftar aktif"
          variant="primary"
          delay={0}
        />
        <StatsCard
          title="Total Guru"
          value={guruData.length}
          icon={UserCog}
          description="Guru aktif mengajar"
          variant="accent"
          delay={0.1}
        />
        <StatsCard
          title="Total Kelas"
          value={kelasData.length}
          icon={School}
          description="Kelas tersedia"
          variant="success"
          delay={0.2}
        />
        <StatsCard
          title="Absensi Hari Ini"
          value={todayAbsensiSiswa + todayAbsensiGuru}
          icon={ClipboardCheck}
          description={`${todayAbsensiSiswa} siswa, ${todayAbsensiGuru} guru`}
          variant="warning"
          delay={0.3}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Bar Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Grafik Kehadiran Mingguan</h3>
              <p className="text-sm text-muted-foreground">Perbandingan kehadiran siswa & guru</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={absensiChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="siswa" name="Siswa" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="guru" name="Guru" fill="hsl(173, 80%, 40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Pie Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Status Kehadiran</h3>
              <p className="text-sm text-muted-foreground">Distribusi status kehadiran siswa</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Users className="h-5 w-5 text-accent" />
            </div>
          </div>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {statusPieData.map((status, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-sm text-muted-foreground">{status.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{status.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 rounded-xl border border-border bg-card p-6 shadow-card"
      >
        <h3 className="text-lg font-semibold text-foreground mb-4">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          {[
            { time: '07:15', action: 'Andi Pratama melakukan absensi', type: 'success' },
            { time: '07:10', action: 'Rina Wulandari melakukan absensi', type: 'success' },
            { time: '07:05', action: 'Rizky Hidayat melakukan absensi', type: 'success' },
            { time: '06:50', action: 'Siti Nurhaliza, M.Pd melakukan absensi', type: 'info' },
            { time: '06:45', action: 'Ahmad Fauzi, S.Pd melakukan absensi', type: 'info' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <span className="text-xs font-mono text-muted-foreground w-12">{activity.time}</span>
              <div
                className={`h-2 w-2 rounded-full ${
                  activity.type === 'success' ? 'bg-success' : 'bg-primary'
                }`}
              />
              <span className="text-sm text-foreground">{activity.action}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
}
