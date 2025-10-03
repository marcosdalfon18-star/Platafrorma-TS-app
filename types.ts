export enum EmployeeStatus {
  Active = 'Situación Normal',
  Vacation = 'Vacaciones',
  Inactive = 'Baja',
}

export interface JobPosition {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  companyId: string;
}

export interface Employee {
  id: string;
  name: string;
  positionId: string;
  managerId: string | null;
  status: EmployeeStatus;
  avatarUrl: string;
  companyId: string;
  email?: string;
}

export enum PerformanceReviewStatus {
  Pending = 'Pendiente',
  InProgress = 'En Progreso',
  Completed = 'Completado',
}

export interface PerformanceGoal {
  id: string;
  description: string;
  status: 'On Track' | 'Needs Improvement' | 'Completed';
  employeeComment?: string;
  managerComment?: string;
}

export interface PerformanceReview {
  id: string;
  employeeId: string;
  reviewerId: string; // manager's employeeId
  reviewDate: string; // ISO String
  periodStartDate: string; // YYYY-MM-DD
  periodEndDate: string;   // YYYY-MM-DD
  status: PerformanceReviewStatus;
  goals: PerformanceGoal[];
  strengths: string; // manager's input
  areasForImprovement: string; // manager's input
  managerFeedback: string; // manager's input
  employeeComments: string; // employee's input
  companyId: string;
}

export type ViewType = 'inicio' | 'orgChart' | 'jobAnalysis' | 'companyManual' | 'marketing' | 'cybersecurity' | 'regulatoryCompliance' | 'informes' | 'agentesIA' | 'planManagement' | 'selectionProcesses' | 'payrollManagement' | 'timeTracking' | 'userManagement' | 'settings' | 'myTeam' | 'performanceReviews' | 'performanceReviewDetail';

export interface Notification {
  id: number;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type UserPlan = string;

export interface Plan {
    id: UserPlan;
    name: string;
    description: string;
    price: number;
    features: string[];
}

export type Feature = 'aiJobDescription' | 'aiChatbot';

export interface Communication {
  id: string;
  companyId: string;
  title: string;
  content: string;
  date: string; // ISO string format
  author: string;
  recipient: string;
}

export type ReportCategory = 'Recursos Humanos' | 'Marketing Estratégico';

export interface Report {
  id: string;
  title: string;
  category: ReportCategory;
  date: string; // ISO string
  summary: string;
  downloadUrl: string;
  companyId?: string;
}

export enum ActivityType {
    StatusChange = 'status_change',
    NewCommunication = 'new_communication',
    PlanChange = 'plan_change',
    SelectionRequest = 'selection_request',
    PayrollSent = 'payroll_sent',
    NewEmployee = 'new_employee',
    EmployeeUpdate = 'employee_update',
    NewJobPosition = 'new_job_position',
    ClockIn = 'clock_in',
    ClockOut = 'clock_out',
    ReportGenerated = 'report_generated',
}


export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string; // ISO string
  companyId?: string;
}

export type UserRole = 'consultor' | 'empresa' | 'empleado' | 'gestor';

export interface Company {
  id: string;
  name: string;
  address: string;
  contact: string;
  planId: UserPlan;
  industry: string;
  imageUrl: string;
  logoUrl: string;
  internalData?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  companyId?: string; // Only for 'empresa' and 'empleado' roles
}

export type InteractionType = 'Llamada' | 'Reunión' | 'Email' | 'Otro';

export interface AdvisoryLogEntry {
  id: string;
  companyId: string;
  date: string; // ISO String
  interactionType: InteractionType;
  notes: string;
  consultantName: string;
}

export type DocumentCategory = 'Contratos' | 'Informes' | 'Políticas Internas' | 'Personal';

export interface Document {
  id: string;
  companyId: string;
  title: string;
  category: DocumentCategory;
  uploadDate: string; // ISO String
  url: string;
  employeeId?: string;
}

export enum CandidateStatus {
  Applied = 'Aplicó',
  Interviewing = 'Entrevistas',
  Offer = 'Oferta',
  Hired = 'Contratado',
  Rejected = 'Rechazado',
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  status: CandidateStatus;
}

export interface JobOpening {
  id: string;
  companyId: string;
  title: string;
  status: 'Abierto' | 'Cerrado';
  candidates: Candidate[];
}

export interface PayrollDocument {
  id: string;
  companyId: string;
  period: string; // e.g., "Julio 2024"
  fileName: string;
  uploadDate: string; // ISO String
  url: string;
  status: 'Subido' | 'Enviado';
}

export interface TimeLog {
  id: string;
  employeeId: string;
  type: 'in' | 'out';
  timestamp: string; // ISO String
}

export enum AbsenceType {
    Vacation = 'Vacaciones',
    SickLeave = 'Baja Médica',
    Other = 'Otro',
}

export interface Absence {
  id: string;
  employeeId: string;
  type: AbsenceType;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export enum DisciplinaryActionType {
    WrittenWarning = 'Amonestación Escrita',
    Suspension = 'Suspensión de Empleo',
    Termination = 'Despido',
    UnjustifiedAbsenceWarning = 'Alerta por Ausencia Injustificada',
}

export interface DisciplinaryAction {
  id: string;
  employeeId: string;
  type: DisciplinaryActionType;
  date: string; // YYYY-MM-DD
  reason: string;
}

export interface LateArrivalPolicy {
    warningThreshold: number;
    suspensionThreshold: number;
    terminationThreshold: number;
}

export interface AbsencePolicy {
    warningThreshold: number;
}

export interface CompanySettings {
  lateArrivalPolicy: LateArrivalPolicy;
  absencePolicy: AbsencePolicy;
}

export enum AbsenceRequestStatus {
  Pending = 'Pendiente',
  Approved = 'Aprobado',
  Rejected = 'Rechazado',
}

export interface AbsenceRequest {
  id: string;
  employeeId: string;
  type: AbsenceType;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason: string;
  status: AbsenceRequestStatus;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}