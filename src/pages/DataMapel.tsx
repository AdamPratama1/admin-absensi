import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mapelData, Mapel } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DataMapel() {
  const [mapel, setMapel] = useState<Mapel[]>(mapelData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingMapel, setEditingMapel] = useState<Mapel | null>(null);
  const [formData, setFormData] = useState({
    nama_mapel: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingMapel) {
      setMapel(mapel.map(m => 
        m.id_mapel === editingMapel.id_mapel 
          ? { ...m, ...formData }
          : m
      ));
      toast({ title: "Berhasil", description: "Data mata pelajaran berhasil diperbarui" });
    } else {
      const newMapel: Mapel = {
        id_mapel: Math.max(...mapel.map(m => m.id_mapel)) + 1,
        ...formData,
      };
      setMapel([...mapel, newMapel]);
      toast({ title: "Berhasil", description: "Mata pelajaran baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: Mapel) => {
    setEditingMapel(item);
    setFormData({
      nama_mapel: item.nama_mapel,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setMapel(mapel.filter(m => m.id_mapel !== id));
    toast({ title: "Berhasil", description: "Mata pelajaran berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ nama_mapel: '' });
    setEditingMapel(null);
    setIsOpen(false);
  };

  const columns = [
    { key: 'id_mapel', header: 'ID' },
    { key: 'nama_mapel', header: 'Nama Mata Pelajaran' },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: Mapel) => (
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
            onClick={() => handleDelete(item.id_mapel)}
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
        title="Data Mata Pelajaran"
        description="Kelola data mata pelajaran yang tersedia"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Mapel
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingMapel ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Mata Pelajaran</Label>
                  <Input
                    id="nama"
                    value={formData.nama_mapel}
                    onChange={(e) => setFormData({ ...formData, nama_mapel: e.target.value })}
                    placeholder="Contoh: Matematika"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {editingMapel ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={mapel} columns={columns} keyField="id_mapel" />
    </AdminLayout>
  );
}
