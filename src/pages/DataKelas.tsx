import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { kelasData, siswaData, Kelas } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DataKelas() {
  const [kelas, setKelas] = useState<Kelas[]>(kelasData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingKelas, setEditingKelas] = useState<Kelas | null>(null);
  const [formData, setFormData] = useState({
    nama_kelas: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingKelas) {
      setKelas(kelas.map(k => 
        k.id_kelas === editingKelas.id_kelas 
          ? { ...k, ...formData }
          : k
      ));
      toast({ title: "Berhasil", description: "Data kelas berhasil diperbarui" });
    } else {
      const newKelas: Kelas = {
        id_kelas: Math.max(...kelas.map(k => k.id_kelas)) + 1,
        ...formData,
      };
      setKelas([...kelas, newKelas]);
      toast({ title: "Berhasil", description: "Kelas baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: Kelas) => {
    setEditingKelas(item);
    setFormData({
      nama_kelas: item.nama_kelas,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setKelas(kelas.filter(k => k.id_kelas !== id));
    toast({ title: "Berhasil", description: "Kelas berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ nama_kelas: '' });
    setEditingKelas(null);
    setIsOpen(false);
  };

  const getSiswaCount = (id_kelas: number) => {
    return siswaData.filter(s => s.id_kelas === id_kelas).length;
  };

  const columns = [
    { key: 'id_kelas', header: 'ID' },
    { key: 'nama_kelas', header: 'Nama Kelas' },
    { 
      key: 'jumlah_siswa', 
      header: 'Jumlah Siswa',
      render: (item: Kelas) => (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {getSiswaCount(item.id_kelas)} siswa
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: Kelas) => (
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
            onClick={() => handleDelete(item.id_kelas)}
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
        title="Data Kelas"
        description="Kelola data kelas yang tersedia"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Kelas
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingKelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Kelas</Label>
                  <Input
                    id="nama"
                    value={formData.nama_kelas}
                    onChange={(e) => setFormData({ ...formData, nama_kelas: e.target.value })}
                    placeholder="Contoh: X IPA 1"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {editingKelas ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={kelas} columns={columns} keyField="id_kelas" />
    </AdminLayout>
  );
}
