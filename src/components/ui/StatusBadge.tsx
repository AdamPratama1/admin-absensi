import { cn } from '@/lib/utils';

type Status = 'H' | 'I' | 'S' | 'A' | 'guru' | 'siswa';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
  H: {
    label: 'Hadir',
    className: 'bg-success/10 text-success border-success/20',
  },
  I: {
    label: 'Izin',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  S: {
    label: 'Sakit',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  A: {
    label: 'Alpha',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  guru: {
    label: 'Guru',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  siswa: {
    label: 'Siswa',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.H;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}
