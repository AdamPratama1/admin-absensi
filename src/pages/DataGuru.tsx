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
import { guruData, usersData, Guru, getUserById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DataGuru() {
  const [guru, setGuru] = useState<Guru[]>(guruData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingGuru, setEditingGuru] = useState<Guru | null>(null);
  const [formData, setFormData] = useState({
    nama_guru: '',
    jenis_kelamin: 'L' as 'L' | 'P',
    id_user: 0,
  });
  const { toast } = useToast();

  const guruUsers = usersData.filter(u => u.role === 'guru');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingGuru) {
      setGuru(guru.map(g => 
        g.id_guru === editingGuru.id_guru 
          ? { ...g, ...formData }
          : g
      ));
      toast({ title: "Berhasil", description: "Data guru berhasil diperbarui" });
    } else {
      const newGuru: Guru = {
        id_guru: Math.max(...guru.map(g => g.id_guru)) + 1,
        ...formData,
      };
      setGuru([...guru, newGuru]);
      toast({ title: "Berhasil", description: "Guru baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: Guru) => {
    setEditingGuru(item);
    setFormData({
      nama_guru: item.nama_guru,
      jenis_kelamin: item.jenis_kelamin,
      id_user: item.id_user,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setGuru(guru.filter(g => g.id_guru !== id));
    toast({ title: "Berhasil", description: "Guru berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ nama_guru: '', jenis_kelamin: 'L', id_user: 0 });
    setEditingGuru(null);
    setIsOpen(false);
  };

  const columns = [
    { key: 'id_guru', header: 'ID' },
    { key: 'nama_guru', header: 'Nama Guru' },
    { 
      key: 'jenis_kelamin', 
      header: 'Jenis Kelamin',
      render: (item: Guru) => item.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'
    },
    { 
      key: 'email', 
      header: 'Email',
      render: (item: Guru) => getUserById(item.id_user)?.email || '-'
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: Guru) => (
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
            onClick={() => handleDelete(item.id_guru)}
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
        title="Data Guru"
        description="Kelola data guru yang terdaftar"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Guru
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingGuru ? 'Edit Guru' : 'Tambah Guru Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Guru</Label>
                  <Input
                    id="nama"
                    value={formData.nama_guru}
                    onChange={(e) => setFormData({ ...formData, nama_guru: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jk">Jenis Kelamin</Label>
                  <Select
                    value={formData.jenis_kelamin}
                    onValueChange={(value: 'L' | 'P') => setFormData({ ...formData, jenis_kelamin: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Laki-laki</SelectItem>
                      <SelectItem value="P">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user">User Account</Label>
                  <Select
                    value={formData.id_user.toString()}
                    onValueChange={(value) => setFormData({ ...formData, id_user: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih user account" />
                    </SelectTrigger>
                    <SelectContent>
                      {guruUsers.map((u) => (
                        <SelectItem key={u.id_user} value={u.id_user.toString()}>
                          {u.name} ({u.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {editingGuru ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={guru} columns={columns} keyField="id_guru" />
    </AdminLayout>
  );
}
