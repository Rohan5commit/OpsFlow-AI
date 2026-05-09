import { OpsRequest } from '@/lib/types';

export const users = [
  { name: 'Ava Chen', role: 'Employee' },
  { name: 'Noah Patel', role: 'Finance Approver' },
  { name: 'Mia Brooks', role: 'IT Approver' },
  { name: 'Ethan Rivera', role: 'Travel Approver' }
];

export const seedRequests: OpsRequest[] = [
  {
    id: 'REQ-1001', employeeName: 'Ava Chen', department: 'Engineering', type: 'software_access',
    title: 'Access to Datadog Pro dashboards', description: 'Need editor access for incident response.', urgency: 'high',
    fieldsComplete: true, missingFields: [], approver: 'Mia Brooks', routeTeam: 'IT Operations',
    summary: 'Engineer requests Datadog editor access for incident response.', status: 'in_review', createdAt: '2026-05-08',
    comments: [{ by: 'Mia Brooks', message: 'Reviewing license pool.', at: '2026-05-09' }], history: [{ status: 'submitted', at: '2026-05-08' }, { status: 'in_review', at: '2026-05-09' }]
  },
  {
    id: 'REQ-1002', employeeName: 'Liam Stone', department: 'Marketing', type: 'purchase_approval',
    title: 'Buy webinar platform add-on', description: 'Need annual add-on for Q3 events.', amount: 4800, urgency: 'medium',
    fieldsComplete: false, missingFields: ['vendor_quote'], approver: 'Noah Patel', routeTeam: 'Finance',
    summary: 'Marketing requests $4,800 purchase, missing vendor quote.', status: 'needs_info', createdAt: '2026-05-07',
    comments: [{ by: 'Noah Patel', message: 'Please attach quote.', at: '2026-05-08' }], history: [{ status: 'submitted', at: '2026-05-07' }, { status: 'needs_info', at: '2026-05-08' }]
  },
  {
    id: 'REQ-1003', employeeName: 'Sara Kim', department: 'Sales', type: 'travel_request',
    title: 'Travel to NYC client onsite', description: '2-day trip for enterprise renewal.', amount: 1300, urgency: 'high',
    fieldsComplete: true, missingFields: [], approver: 'Ethan Rivera', routeTeam: 'People Ops',
    summary: 'Sales travel request for high-value renewal meeting.', status: 'approved', createdAt: '2026-05-05',
    comments: [{ by: 'Ethan Rivera', message: 'Approved. Book economy flight.', at: '2026-05-06' }], history: [{ status: 'submitted', at: '2026-05-05' }, { status: 'in_review', at: '2026-05-05' }, { status: 'approved', at: '2026-05-06' }]
  }
];
