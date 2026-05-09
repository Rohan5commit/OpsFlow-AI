export type RequestType = 'software_access' | 'purchase_approval' | 'travel_request';
export type RequestStatus = 'submitted' | 'needs_info' | 'in_review' | 'approved' | 'rejected';

export interface OpsRequest {
  id: string;
  employeeName: string;
  department: string;
  type: RequestType;
  title: string;
  description: string;
  amount?: number;
  urgency: 'low' | 'medium' | 'high';
  fieldsComplete: boolean;
  missingFields: string[];
  approver: string;
  routeTeam: string;
  summary: string;
  status: RequestStatus;
  createdAt: string;
  comments: { by: string; message: string; at: string }[];
  history: { status: RequestStatus; at: string }[];
}
