import { useState } from 'react';
import { Image } from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataTable } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { absensiGuruData, AbsensiGuru, getGuruById } from '@/data/mockData';

export default function AbsensiGuruPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const columns = [
    { 
      key: 'nama_guru', 
      header: 'Nama Guru',
      render: (item: AbsensiGuru) => getGuruById(item.id_guru)?.nama_guru || '-'
    },
    { key: 'tanggal', header: 'Tanggal' },
    { key: 'jam', header: 'Jam' },
    { 
      key: 'status', 
      header: 'Status',
      render: (item: AbsensiGuru) => <StatusBadge status={item.status} />
    },
    { key: 'lokasi', header: 'Lokasi' },
    { 
      key: 'foto_wajah', 
      header: 'Foto Wajah',
      render: (item: AbsensiGuru) => (
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
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Absensi Guru"
        description="Data kehadiran guru"
      />

      <DataTable data={absensiGuruData} columns={columns} keyField="id_absen" />

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Preview Foto</DialogTitle>
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
