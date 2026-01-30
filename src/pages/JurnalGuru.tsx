import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jurnalGuruData, guruData, kelasData, JurnalGuru, getGuruById, getKelasById } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

export default function JurnalGuruPage() {
  const [jurnal, setJurnal] = useState<JurnalGuru[]>(jurnalGuruData);
  const [isOpen, setIsOpen] = useState(false);
  const [editingJurnal, setEditingJurnal] = useState<JurnalGuru | null>(null);
  const [formData, setFormData] = useState({
    jumlah_jam: 0,
    lokasi: '',
    deskripsi: '',
    tanggal: '',
    id_guru: 0,
    id_kelas: 0,
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingJurnal) {
      setJurnal(jurnal.map(j => 
        j.id_jurnal === editingJurnal.id_jurnal 
          ? { ...j, ...formData }
          : j
      ));
      toast({ title: "Berhasil", description: "Jurnal berhasil diperbarui" });
    } else {
      const newJurnal: JurnalGuru = {
        id_jurnal: Math.max(...jurnal.map(j => j.id_jurnal)) + 1,
        ...formData,
      };
      setJurnal([...jurnal, newJurnal]);
      toast({ title: "Berhasil", description: "Jurnal baru berhasil ditambahkan" });
    }
    
    resetForm();
  };

  const handleEdit = (item: JurnalGuru) => {
    setEditingJurnal(item);
    setFormData({
      jumlah_jam: item.jumlah_jam,
      lokasi: item.lokasi,
      deskripsi: item.deskripsi,
      tanggal: item.tanggal,
      id_guru: item.id_guru,
      id_kelas: item.id_kelas,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: number) => {
    setJurnal(jurnal.filter(j => j.id_jurnal !== id));
    toast({ title: "Berhasil", description: "Jurnal berhasil dihapus" });
  };

  const resetForm = () => {
    setFormData({ jumlah_jam: 0, lokasi: '', deskripsi: '', tanggal: '', id_guru: 0, id_kelas: 0 });
    setEditingJurnal(null);
    setIsOpen(false);
  };

  const columns = [
    { 
      key: 'nama_guru', 
      header: 'Nama Guru',
      render: (item: JurnalGuru) => getGuruById(item.id_guru)?.nama_guru || '-'
    },
    { key: 'tanggal', header: 'Tanggal' },
    { 
      key: 'jumlah_jam', 
      header: 'Jumlah Jam',
      render: (item: JurnalGuru) => (
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {item.jumlah_jam} jam
        </span>
      )
    },
    { 
      key: 'kelas', 
      header: 'Kelas',
      render: (item: JurnalGuru) => getKelasById(item.id_kelas)?.nama_kelas || '-'
    },
    { key: 'lokasi', header: 'Lokasi' },
    { 
      key: 'deskripsi', 
      header: 'Deskripsi',
      render: (item: JurnalGuru) => (
        <span className="max-w-xs truncate block" title={item.deskripsi}>
          {item.deskripsi}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Aksi',
      render: (item: JurnalGuru) => (
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
            onClick={() => handleDelete(item.id_jurnal)}
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
        title="Jurnal Guru"
        description="Catatan aktivitas mengajar guru"
        action={
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-primary" onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Tambah Jurnal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingJurnal ? 'Edit Jurnal' : 'Tambah Jurnal Baru'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guru">Guru</Label>
                    <Select
                      value={formData.id_guru.toString()}
                      onValueChange={(value) => setFormData({ ...formData, id_guru: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih guru" />
                      </SelectTrigger>
                      <SelectContent>
                        {guruData.map((g) => (
                          <SelectItem key={g.id_guru} value={g.id_guru.toString()}>
                            {g.nama_guru}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="jam">Jumlah Jam</Label>
                    <Input
                      id="jam"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.jumlah_jam}
                      onChange={(e) => setFormData({ ...formData, jumlah_jam: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Input
                    id="lokasi"
                    value={formData.lokasi}
                    onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                    placeholder="Contoh: Ruang Kelas X IPA 1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deskripsi">Deskripsi</Label>
                  <Textarea
                    id="deskripsi"
                    value={formData.deskripsi}
                    onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    placeholder="Deskripsi aktivitas mengajar..."
                    rows={3}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button type="submit" className="gradient-primary">
                    {editingJurnal ? 'Simpan' : 'Tambah'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      <DataTable data={jurnal} columns={columns} keyField="id_jurnal" />
    </AdminLayout>
  );
}
