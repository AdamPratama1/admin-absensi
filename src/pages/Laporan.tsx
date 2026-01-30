import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { kelasData } from '@/data/mockData';

const weeklyData = [
  { name: 'Minggu 1', siswa: 280, guru: 45 },
  { name: 'Minggu 2', siswa: 295, guru: 48 },
  { name: 'Minggu 3', siswa: 270, guru: 44 },
  { name: 'Minggu 4', siswa: 300, guru: 50 },
];

const monthlyTrend = [
  { name: 'Jan', hadir: 92, izin: 5, sakit: 2, alpha: 1 },
  { name: 'Feb', hadir: 89, izin: 6, sakit: 3, alpha: 2 },
  { name: 'Mar', hadir: 94, izin: 4, sakit: 1, alpha: 1 },
  { name: 'Apr', hadir: 91, izin: 5, sakit: 3, alpha: 1 },
  { name: 'Mei', hadir: 88, izin: 7, sakit: 3, alpha: 2 },
  { name: 'Jun', hadir: 95, izin: 3, sakit: 1, alpha: 1 },
];

const kelasDistribution = [
  { name: 'X IPA 1', value: 32, color: 'hsl(217, 91%, 60%)' },
  { name: 'X IPA 2', value: 30, color: 'hsl(173, 80%, 40%)' },
  { name: 'X IPS 1', value: 28, color: 'hsl(142, 76%, 36%)' },
  { name: 'XI IPA 1', value: 35, color: 'hsl(38, 92%, 50%)' },
  { name: 'XI IPA 2', value: 33, color: 'hsl(0, 84%, 60%)' },
  { name: 'XI IPS 1', value: 31, color: 'hsl(280, 70%, 50%)' },
];

export default function Laporan() {
  const [filterKelas, setFilterKelas] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <AdminLayout>
      <PageHeader
        title="Laporan"
        description="Statistik dan laporan kehadiran"
        action={
          <Button className="gradient-primary">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Dari:</span>
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sampai:</span>
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Kelas:</span>
          <Select value={filterKelas} onValueChange={setFilterKelas}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Semua Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              {kelasData.map((k) => (
                <SelectItem key={k.id_kelas} value={k.id_kelas.toString()}>
                  {k.nama_kelas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Attendance Comparison */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Perbandingan Kehadiran Mingguan</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
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
              <Legend />
              <Bar dataKey="siswa" name="Siswa" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="guru" name="Guru" fill="hsl(173, 80%, 40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Monthly Trend */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Tren Kehadiran Bulanan (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
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
              <Legend />
              <Line type="monotone" dataKey="hadir" name="Hadir" stroke="hsl(142, 76%, 36%)" strokeWidth={2} dot={{ fill: 'hsl(142, 76%, 36%)' }} />
              <Line type="monotone" dataKey="izin" name="Izin" stroke="hsl(38, 92%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(38, 92%, 50%)' }} />
              <Line type="monotone" dataKey="sakit" name="Sakit" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={{ fill: 'hsl(217, 91%, 60%)' }} />
              <Line type="monotone" dataKey="alpha" name="Alpha" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={{ fill: 'hsl(0, 84%, 60%)' }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Class Distribution */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Distribusi Siswa per Kelas</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="55%" height={250}>
              <PieChart>
                <Pie
                  data={kelasDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${value}`}
                  labelLine={false}
                >
                  {kelasDistribution.map((entry, index) => (
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
            <div className="flex-1 space-y-2">
              {kelasDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Ringkasan Statistik</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Kehadiran Siswa', value: '1,145', sublabel: 'Bulan ini', color: 'text-success' },
              { label: 'Total Kehadiran Guru', value: '187', sublabel: 'Bulan ini', color: 'text-primary' },
              { label: 'Rata-rata Hadir', value: '92%', sublabel: 'Per hari', color: 'text-accent' },
              { label: 'Total Izin/Sakit', value: '58', sublabel: 'Bulan ini', color: 'text-warning' },
            ].map((stat, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.sublabel}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
