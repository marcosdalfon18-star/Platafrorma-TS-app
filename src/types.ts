// Tipos base para la app
export type ViewType = string;
export type Notification = { id: number; message: string; type: string };
export type Employee = { id: string; name: string; email: string; positionId: string; managerId: string | null; status: string; avatarUrl: string; companyId: string };
export type UserPlan = string;
export type Communication = { id: string; companyId: string; title: string; content: string; date: string; author: string; recipient: string };
export type Activity = { id: string; type: string; description: string; timestamp: string };
export type User = { id: string; email: string; role: string; name: string; companyId?: string };
export type Company = { id: string; name: string; address: string; contact: string; planId: string; industry: string; imageUrl: string; logoUrl: string; internalData: string };
export type Plan = { id: string; name: string };
export type AdvisoryLogEntry = { id: string; companyId: string; date: string; interactionType: string; notes: string; consultantName: string };
export type Document = { id: string; companyId: string; title: string; category: string; url: string; uploadDate: string };
export type JobPosition = { id: string; title: string; description: string; responsibilities: string[]; companyId: string };
export type JobOpening = { id: string; companyId: string; title: string; status: string; candidates: string[] };
export enum ActivityType { NewEmployee = 'NewEmployee', Otro = 'Otro' }
export type PayrollDocument = { id: string; companyId: string; period: string; fileName: string; uploadDate: string; url: string; status: string };
export type TimeLog = { id: string; employeeId: string; type: string; timestamp: string };
export type Absence = { id: string; employeeId: string; type: string; startDate: string; endDate: string };
export type EmployeeStatus = string;
export type DisciplinaryAction = { id: string };
export type DisciplinaryActionType = string;
export type CompanySettings = any;
export type AbsenceType = string;
export type AbsenceRequest = { id: string; employeeId: string; type: string; startDate: string; endDate: string; status: string; reason: string };
export type AbsenceRequestStatus = string;
export type PerformanceReview = { id: string; employeeId: string; reviewerId: string; reviewDate: string; periodStartDate: string; periodEndDate: string; goals: any[]; comments: string; status: string; strengths: string; areasForImprovement: string; managerFeedback: string; employeeComments: string; companyId: string };
export type PerformanceReviewStatus = string;
