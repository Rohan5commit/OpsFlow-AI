import { RequestStatus } from '@/lib/types';

const styles: Record<RequestStatus, string> = {
  submitted: 'bg-blue-100 text-blue-800',
  needs_info: 'bg-amber-100 text-amber-800',
  in_review: 'bg-violet-100 text-violet-800',
  approved: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-rose-100 text-rose-800'
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={`badge ${styles[status]}`}>{status.replace('_', ' ')}</span>;
}
