import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { nilaiSiswaData, siswaData, mapelData, NilaiSiswa, getSiswaById, getMapelById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function NilaiSiswaPage() {
  const [nilai, setNilai] = useState<NilaiSiswa[]>(nilaiSiswaData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingNilai, setEditingNilai] = useState<NilaiSiswa | null>(null);
  const [formData, setFormData] = useState({
    nilai: 0,
    jenis_nilai: 'Harian' as 'Harian' | 'Ulangan' | 'UTS' | 'UAS',
    tanggal: '',
    id_siswa: 0,
    id_mapel: 0,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNilai) {
      setNilai(nilai.map(n => 
        n.id_nilai === editingNilai.id_nilai 
          ? { ...n, ...formData }
          : n
      ));
      toast({ title: "Berhasil", description: "Nilai berhasil diperbarui" });
    } else {
      const newNilai: NilaiSiswa = {
        id_nilai: Math.max(...nilai.map(n => n.id_nilai)) + 1,
        ...formData,
      };
      setNilai([...nilai, newNilai]);
      toast({ title: "Berhasil", description: "Nilai baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: NilaiSiswa) => {
    setEditingNilai(item);
    setFormData({
      nilai: item.nilai,
      jenis_nilai: item.jenis_nilai,
      tanggal: item.tanggal,
      id_siswa: item.id_siswa,
      id_mapel: item.id_mapel,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setNilai(nilai.filter(n => n.id_nilai !== id));
    toast({ title: "Berhasil", description: "Nilai berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ nilai: 0, jenis_nilai: 'Harian', tanggal: '', id_siswa: 0, id_mapel: 0 });
    setEditingNilai(null);
    setIsOpen(false);
  };

  const getNilaiColor = (nilai: number) => {
    if (nilai >= 80) return 'bg-success/10 text-success border-success/20';
    if (nilai >= 60) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-destructive/10 text-destructive border-destructive/20';
  };

  const columns = [
    { 
      key: 'nama_siswa', 
      header: 'Nama Siswa',
      render: (item: NilaiSiswa) => getSiswaById(item.id_siswa)?.nama_siswa || '-'
    },
    { 
      key: 'mapel', 
      header: 'Mata Pelajaran',
      render: (item: NilaiSiswa) => getMapelById(item.id_mapel)?.nama_mapel || '-'
    },
    { 
      key: 'nilai', 
      header: 'Nilai',
      render: (item: NilaiSiswa) => (
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getNilaiColor(item.nilai)}`}>
          {item.nilai}
        </span>
      )
    },
    { 
      key: 'jenis_nilai', 
      header: 'Jenis Nilai',
      render: (item: NilaiSiswa) => (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {item.jenis_nilai}
        </span>
      )
    },
    { key: 'tanggal', header: 'Tanggal' },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: NilaiSiswa) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEdit(item)}
            className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(item.id_nilai)}
            className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Nilai Siswa"
        description="Kelola data nilai siswa"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Input Nilai
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingNilai ? 'Edit Nilai' : 'Input Nilai Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siswa">Siswa</Label>
                  <Select
                    value={formData.id_siswa.toString()}
                    onValueChange={(value) => setFormData({ ...formData, id_siswa: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih siswa" />
                    </SelectTrigger>
                    <SelectContent>
                      {siswaData.map((s) => (
                        <SelectItem key={s.id_siswa} value={s.id_siswa.toString()}>
                          {s.nama_siswa}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mapel">Mata Pelajaran</Label>
                  <Select
                    value={formData.id_mapel.toString()}
                    onValueChange={(value) => setFormData({ ...formData, id_mapel: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata pelajaran" />
                    </SelectTrigger>
                    <SelectContent>
                      {mapelData.map((m) => (
                        <SelectItem key={m.id_mapel} value={m.id_mapel.toString()}>
                          {m.nama_mapel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nilai">Nilai</Label>
                    <Input
                      id="nilai"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.nilai}
                      onChange={(e) => setFormData({ ...formData, nilai: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jenis">Jenis Nilai</Label>
                    <Select
                      value={formData.jenis_nilai}
                      onValueChange={(value: 'Harian' | 'Ulangan' | 'UTS' | 'UAS') => 
                        setFormData({ ...formData, jenis_nilai: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Harian">Harian</SelectItem>
                        <SelectItem value="Ulangan">Ulangan</SelectItem>
                        <SelectItem value="UTS">UTS</SelectItem>
                        <SelectItem value="UAS">UAS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tanggal">Tanggal</Label>
                  <Input
                    id="tanggal"
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {editingNilai ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={nilai} columns={columns} keyField="id_nilai" />
    </AdminLayout>
  );
}
