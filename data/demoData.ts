import { OpsRequest, RequestStatus } from '@/lib/types';

export const seedRequests: OpsRequest[] = [
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `REQ-${1000 + i}`,
    employeeName: ['Ava Chen', 'Liam Stone', 'Sara Kim', 'Jaxon Reed', 'Mira J.', 'Omar B.', 'Lina S.', 'Kenji T.', 'Sofia R.', 'David M.'][i],
    department: ['Engineering', 'Marketing', 'Sales', 'Product', 'HR', 'IT', 'Legal', 'Design', 'Customer Success', 'Finance'][i],
    type: (['software_access', 'purchase_approval', 'travel_request'] as const)[i % 3],
    title: `Ops Request #${i + 1}`,
    description: `Need help with request #${i + 1} processing.`,
    urgency: (['low', 'medium', 'high'] as const)[i % 3],
    fieldsComplete: true,
    missingFields: [],
    approver: ['Mia Brooks', 'Noah Patel', 'Ethan Rivera'][i % 3],
    routeTeam: ['IT Operations', 'Finance', 'People Ops'][i % 3],
    summary: 'Auto-seeded demo request.',
    status: (['approved', 'in_review', 'submitted'] as const)[i % 3] as RequestStatus,
    createdAt: '2026-05-01',
    comments: [],
    history: [{ status: (['approved', 'in_review', 'submitted'] as const)[i % 3] as RequestStatus, at: '2026-05-01' }]
  }))
];
