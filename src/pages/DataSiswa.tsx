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
import { siswaData, kelasData, usersData, Siswa, getKelasById, getUserById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function DataSiswa() {
  const [siswa, setSiswa] = useState<Siswa[]>(siswaData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState<Siswa | null>(null);
  const [formData, setFormData] = useState({
    nama_siswa: '',
    id_kelas: 0,
    id_user: 0,
  });
  const { toast } = useToast();

  const siswaUsers = usersData.filter(u => u.role === 'siswa');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingSiswa) {
      setSiswa(siswa.map(s => 
        s.id_siswa === editingSiswa.id_siswa 
          ? { ...s, ...formData }
          : s
      ));
      toast({ title: "Berhasil", description: "Data siswa berhasil diperbarui" });
    } else {
      const newSiswa: Siswa = {
        id_siswa: Math.max(...siswa.map(s => s.id_siswa)) + 1,
        ...formData,
      };
      setSiswa([...siswa, newSiswa]);
      toast({ title: "Berhasil", description: "Siswa baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: Siswa) => {
    setEditingSiswa(item);
    setFormData({
      nama_siswa: item.nama_siswa,
      id_kelas: item.id_kelas,
      id_user: item.id_user,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setSiswa(siswa.filter(s => s.id_siswa !== id));
    toast({ title: "Berhasil", description: "Siswa berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ nama_siswa: '', id_kelas: 0, id_user: 0 });
    setEditingSiswa(null);
    setIsOpen(false);
  };

  const columns = [
    { key: 'id_siswa', header: 'ID' },
    { key: 'nama_siswa', header: 'Nama Siswa' },
    { 
      key: 'kelas', 
      header: 'Kelas',
      render: (item: Siswa) => getKelasById(item.id_kelas)?.nama_kelas || '-'
    },
    { 
      key: 'email', 
      header: 'Email',
      render: (item: Siswa) => getUserById(item.id_user)?.email || '-'
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: Siswa) => (
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
            onClick={() => handleDelete(item.id_siswa)}
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
        title="Data Siswa"
        description="Kelola data siswa yang terdaftar"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Siswa
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSiswa ? 'Edit Siswa' : 'Tambah Siswa Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nama">Nama Siswa</Label>
                  <Input
                    id="nama"
                    value={formData.nama_siswa}
                    onChange={(e) => setFormData({ ...formData, nama_siswa: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kelas">Kelas</Label>
                  <Select
                    value={formData.id_kelas.toString()}
                    onValueChange={(value) => setFormData({ ...formData, id_kelas: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kelas" />
                    </SelectTrigger>
                    <SelectContent>
                      {kelasData.map((k) => (
                        <SelectItem key={k.id_kelas} value={k.id_kelas.toString()}>
                          {k.nama_kelas}
                        </SelectItem>
                      ))}
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
                      {siswaUsers.map((u) => (
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
                    {editingSiswa ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={siswa} columns={columns} keyField="id_siswa" />
    </AdminLayout>
  );
}
