import { useState } from 'react';
import { Filter, Image } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { absensiSiswaData, kelasData, siswaData, AbsensiSiswa, getSiswaById, getKelasById } from '@/data/mockData';

export default function AbsensiSiswaPage() {
  const [filterTanggal, setFilterTanggal] = useState('');
  const [filterKelas, setFilterKelas] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredData = absensiSiswaData.filter(absen => {
    const siswa = getSiswaById(absen.id_siswa);
    
    const matchTanggal = !filterTanggal || absen.tanggal === filterTanggal;
    const matchKelas = filterKelas === 'all' || siswa?.id_kelas.toString() === filterKelas;
    
    return matchTanggal && matchKelas;
  });

  const columns = [
    { 
      key: 'nama_siswa', 
      header: 'Nama Siswa',
      render: (item: AbsensiSiswa) => getSiswaById(item.id_siswa)?.nama_siswa || '-'
    },
    { 
      key: 'kelas', 
      header: 'Kelas',
      render: (item: AbsensiSiswa) => {
        const siswa = getSiswaById(item.id_siswa);
        return siswa ? getKelasById(siswa.id_kelas)?.nama_kelas || '-' : '-';
      }
    },
    { key: 'tanggal', header: 'Tanggal' },
    { key: 'jam', header: 'Jam' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: AbsensiSiswa) => <StatusBadge status={item.status} />
    },
    { key: 'lokasi', header: 'Lokasi' },
    { 
      key: 'foto_wajah', 
      header: 'Foto Wajah',
      render: (item: AbsensiSiswa) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedImage(item.foto_wajah)}
          className="h-8 gap-1 text-primary hover:text-primary hover:bg-primary/10"
        >
          <Image className="h-4 w-4" />
          Lihat
        </Button>
      )
    },
    { 
      key: 'surat_izin', 
      header: 'Surat Izin',
      render: (item: AbsensiSiswa) => (
        item.surat_izin ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedImage(item.surat_izin!)}
            className="h-8 gap-1 text-accent hover:text-accent hover:bg-accent/10"
          >
            <Image className="h-4 w-4" />
            Lihat
          </Button>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      )
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Absensi Siswa"
        description="Data kehadiran siswa"
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Filter:</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Tanggal:</span>
          <Input
            type="date"
            value={filterTanggal}
            onChange={(e) => setFilterTanggal(e.target.value)}
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setFilterTanggal('');
            setFilterKelas('all');
          }}
        >
          Reset
        </Button>
      </div>

      <DataTable data={filteredData} columns={columns} keyField="id_absen" />

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center">
            <img
              src={selectedImage || ''}
              alt="Preview"
              className="max-w-full max-h-96 rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
