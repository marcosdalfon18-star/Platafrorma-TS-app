import { type Employee, type JobPosition, EmployeeStatus, type Communication, type Report, type User, type Company, type Plan, type UserPlan, type AdvisoryLogEntry, type Document, type JobOpening, CandidateStatus, type PayrollDocument, type TimeLog, type Absence, AbsenceType, type PerformanceReview, PerformanceReviewStatus } from './types';

export const JOB_POSITIONS: JobPosition[] = [
  { id: 'ceo', title: 'CEO', description: 'Overall strategic direction and leadership.', responsibilities: ['Set company vision', 'Lead executive team', 'Investor relations'], companyId: 1 },
  { id: 'cto', title: 'Chief Technology Officer', description: 'Oversees all technical aspects of the company.', responsibilities: ['Define tech strategy', 'Manage engineering teams', 'Oversee R&D'], companyId: 1 },
  { id: 'cfo', title: 'Chief Financial Officer', description: 'Manages the company\'s finances.', responsibilities: ['Financial planning', 'Risk management', 'Reporting'], companyId: 1 },
  { id: 'coo', title: 'Chief Operating Officer', description: 'Manages daily business operations.', responsibilities: ['Optimize processes', 'Oversee HR and Legal', 'Supply chain management'], companyId: 1 },
  { id: 'fe-lead', title: 'Frontend Lead', description: 'Leads the frontend development team.', responsibilities: ['Architect UI/UX', 'Mentor developers', 'Code reviews'], companyId: 2 },
  { id: 'be-lead', title: 'Backend Lead', description: 'Leads the backend development team.', responsibilities: ['Design APIs', 'Database management', 'Ensure scalability'], companyId: 2 },
  { id: 'fe-dev', title: 'Frontend Developer', description: 'Builds user interfaces.', responsibilities: ['Implement features', 'Write unit tests', 'Collaborate with designers'], companyId: 2 },
  { id: 'be-dev', title: 'Backend Developer', description: 'Builds server-side logic.', responsibilities: ['Develop APIs', 'Integrate services', 'Maintain databases'], companyId: 3 },
  { id: 'hr-manager', title: 'HR Manager', description: 'Manages human resources functions.', responsibilities: ['Recruitment', 'Employee relations', 'Compliance'], companyId: 3 },
];

export { JOB_POSITIONS as INITIAL_JOB_POSITIONS };

export const EMPLOYEES: Employee[] = [
  // Empleados de Innovatec Solutions
  { id: 1, name: 'Elena Vargas', email: 'elena.vargas@innovatec.com', positionId: 'ceo', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/elena/100', companyId: 1 },
  { id: 2, name: 'Carlos Mendoza', email: 'carlos.mendoza@innovatec.com', positionId: 'cto', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/carlos/100', companyId: 1 },
  { id: 3, name: 'Sofia Reyes', email: 'sofia.reyes@innovatec.com', positionId: 'coo', managerId: 1, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/sofia/100', companyId: 1 },
  { id: 4, name: 'David Lee', email: 'david.lee@innovatec.com', positionId: 'cfo', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/david/100', companyId: 1 },
  // Empleados de GreenLeaf Organics
  { id: 5, name: 'Ana Gomez', email: 'ana.gomez@greenleaf.com', positionId: 'fe-lead', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/ana/100', companyId: 2 },
  { id: 6, name: 'Luis Torres', email: 'luis.torres@greenleaf.com', positionId: 'be-lead', managerId: null, status: EmployeeStatus.Inactive, avatarUrl: 'https://picsum.photos/seed/luis/100', companyId: 2 },
  { id: 7, name: 'Isabela Cruz', email: 'isabela.cruz@greenleaf.com', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/isabela/100', companyId: 2 },
  // Empleados de Constructora del Futuro
  { id: 8, name: 'Marco Diaz', email: 'marco.diaz@constructora.com', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/marco/100', companyId: 3 },
  { id: 9, name: 'Javier Morales', email: 'javier.morales@constructora.com', positionId: 'be-dev', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/javier/100', companyId: 3 },
  // Empleados de Gourmet Foods
  { id: 10, name: 'Laura Fernandez', email: 'laura.fernandez@gourmet.com', positionId: 'hr-manager', managerId: null, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/laura/100', companyId: 4 },
  { id: 11, name: 'Ricardo Mendez', email: 'ricardo.mendez@gourmet.com', positionId: 'coo', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/ricardo/100', companyId: 4 },
  { id: 12, name: 'Julia Romero', email: 'julia.romero@gourmet.com', positionId: 'be-dev', managerId: 11, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/julia/100', companyId: 4 },
];

export const COMPANY_NAME = "Talento Sostenible";

export const REGULATORY_COMMUNICATIONS: Communication[] = [
  {
    id: 1,
    companyId: 1,
    title: 'Actualización de Política de Trabajo Remoto',
    content: 'Se ha actualizado la política de trabajo remoto. Por favor, revísela en el portal de empleados. Los cambios incluyen nuevos lineamientos sobre horarios flexibles y equipamiento proporcionado por la empresa.',
    date: '2024-07-15T10:00:00Z',
    author: 'Recursos Humanos',
    recipient: 'Todos los empleados',
  },
  {
    id: 2,
    companyId: 1,
    title: 'Recordatorio: Cierre Fiscal Anual',
    content: 'Les recordamos que el cierre fiscal se aproxima. Todos los reportes de gastos deben ser enviados antes del 25 de este mes para ser procesados a tiempo.',
    date: '2024-07-10T14:30:00Z',
    author: 'Departamento de Finanzas',
    recipient: 'Todos los empleados',
  },
];

export const REPORTS: Report[] = [
  {
    id: 1,
    title: 'Análisis de Clima Laboral Q2 2024',
    category: 'Recursos Humanos',
    date: '2024-07-20T09:00:00Z',
    summary: 'Informe detallado sobre la satisfacción y el compromiso de los empleados durante el segundo trimestre. Incluye recomendaciones de mejora.',
    downloadUrl: '#',
    companyId: 1,
  },
  {
    id: 2,
    title: 'Rendimiento de Campaña de Marketing Digital - Julio',
    category: 'Marketing Estratégico',
    date: '2024-08-01T11:30:00Z',
    summary: 'Análisis del ROI, alcance y conversiones de las campañas en redes sociales y Google Ads ejecutadas en el mes de julio.',
    downloadUrl: '#',
    companyId: 2,
  },
];

export const PLANS: Plan[] = [
    {
        id: 'plan_basico',
        name: 'Básico',
        description: 'El punto de partida ideal para pequeñas empresas y startups que buscan formalizar sus operaciones y establecer una base sólida de gestión.',
        price: 50,
        features: [
            'Diagnóstico Digital de la Empresa',
            '1 Proceso de Selección al Mes',
            'Consultas Mensuales con Expertos',
            'Plantilla de Plan de Marketing',
            'Acceso a Recursos Digitales (plantillas)',
        ]
    },
    {
        id: 'plan_profesional',
        name: 'Profesional',
        description: 'Diseñado para empresas en fase de expansión que ya cuentan con una estructura básica y buscan optimizar sus procesos.',
        price: 150,
        features: [
            'Todo lo del Plan Básico',
            'Hasta 3 Procesos de Selección al Mes',
            'Soporte Personalizado vía Chat',
            'Dashboard de Crecimiento (KPIs)',
            'Gestión de Perfiles de Empleados',
            'Herramientas de Análisis Avanzado',
            'Webinars y Contenido Exclusivo',
            'Reportes y Analíticas Avanzadas',
        ]
    },
    {
        id: 'plan_premium',
        name: 'Premium',
        description: 'Dirigido a empresas consolidadas que buscan una asociación estratégica para impulsar su crecimiento a largo plazo.',
        price: 300,
        features: [
            'Todo lo de los Planes Básico y Profesional',
            'Consultoría Estratégica Personalizada (1h/mes)',
            'Asesoría en Transformación Digital e IA',
            'Informes y Estrategias a Medida',
            'Soporte Prioritario',
            'Plan de Marketing Integral y Personalizado',
            'Ciberseguridad Proactiva',
        ]
    },
];

export const COMPANIES: Company[] = [
    { 
      id: 1, 
      name: 'Innovatech Solutions', 
      address: 'Calle Ficticia 123', 
      contact: 'contacto@innovatec.com', 
      planId: 'plan_premium', 
      industry: 'Technology', 
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', 
      logoUrl: 'https://i.pravatar.cc/100?u=innovatech',
      internalData: 'Política de vacaciones: 25 días anuales más días festivos locales. Horario de verano (Julio y Agosto): Jornada intensiva de 8:00 a 15:00. El código de vestimenta es "business casual". Las solicitudes de reembolso de gastos deben presentarse a través del portal antes del día 5 de cada mes.'
    },
    { 
      id: 2, 
      name: 'GreenLeaf Organics', 
      address: 'Avenida Siempre Viva 742', 
      contact: 'hola@greenleaf.com', 
      planId: 'plan_profesional', 
      industry: 'Retail', 
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop', 
      logoUrl: 'https://i.pravatar.cc/100?u=greenleaf',
      internalData: 'Días de vacaciones: 22 días laborables por año. Horario estándar: 9:30 a 18:30 con una hora para comer. Se permite el teletrabajo dos días por semana, previa aprobación del manager directo. Todos los empleados tienen un 15% de descuento en productos de la tienda.'
    },
    { 
      id: 3, 
      name: 'Constructora del Futuro', 
      address: 'Bulevar de los Sueños Rotos 45', 
      contact: 'info@constructora.com', 
      planId: 'plan_basico', 
      industry: 'Construction', 
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop', 
      logoUrl: 'https://i.pravatar.cc/100?u=constructora',
      internalData: 'El horario de oficina es de 8:00 a 17:00. El personal de obra sigue los horarios estipulados por el jefe de obra en cada proyecto. Las vacaciones deben solicitarse con al menos 30 días de antelación. Es obligatorio el uso de casco y chaleco de seguridad en todas las zonas de construcción.'
    },
    { 
      id: 4, 
      name: 'Gourmet Foods Inc.', 
      address: 'Plaza del Sabor 10', 
      contact: 'catering@gourmet.com', 
      planId: 'plan_premium', 
      industry: 'Food & Beverage', 
      imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop', 
      logoUrl: 'https://i.pravatar.cc/100?u=gourmet',
      internalData: 'Ofrecemos 30 días de vacaciones. El horario es flexible mientras se cumplan 40 horas semanales. El teletrabajo es una opción disponible para todos los roles de oficina. Los empleados pueden disfrutar de un menú diario gratuito en la cantina de la empresa.'
    },
];

const baseUsers: User[] = [
    { id: 101, email: 'consultora@sostenible.com', role: 'consultor', name: 'Consultora Principal' },
    { id: 401, email: 'gestor@innovatec.com', role: 'gestor', name: 'Gestor Innovatec', companyId: 1 },
];

const employeeUsers: User[] = EMPLOYEES.map(employee => ({
    id: 300 + employee.id, // Offset to avoid ID collision
    email: employee.email || `${employee.name.toLowerCase().replace(' ', '.')}@example.com`,
    role: 'empleado',
    name: employee.name,
    companyId: employee.companyId,
}));

const companyAdmins: User[] = COMPANIES.map(company => ({
    id: 200 + company.id, // Offset to avoid ID collision
    email: `admin@${company.name.toLowerCase().split(' ')[0]}.com`,
    role: 'empresa',
    name: `Admin ${company.name}`,
    companyId: company.id,
}));

export const USERS: User[] = [...baseUsers, ...employeeUsers, ...companyAdmins];


export const ADVISORY_LOGS: AdvisoryLogEntry[] = [
    { id: 1, companyId: 1, date: '2024-07-22T14:00:00Z', interactionType: 'Reunión', notes: 'Reunión inicial para discutir KPIs del Q3. Se acordó enfocar en la retención de talento.', consultantName: 'Consultora Principal' },
    { id: 2, companyId: 1, date: '2024-07-25T10:30:00Z', interactionType: 'Llamada', notes: 'Llamada de seguimiento sobre la implementación del nuevo software de RRHH.', consultantName: 'Consultora Principal' },
    { id: 3, companyId: 2, date: '2024-07-26T11:00:00Z', interactionType: 'Email', notes: 'Enviado borrador de la nueva política de trabajo flexible para su revisión.', consultantName: 'Consultora Principal' },
];

export const DOCUMENTS: Document[] = [
    { id: 1, companyId: 1, title: 'Contrato de Servicios 2024', category: 'Contratos', uploadDate: '2024-01-15T09:00:00Z', url: '#' },
    { id: 2, companyId: 1, title: 'Informe de Clima Laboral Q2', category: 'Informes', uploadDate: '2024-07-20T11:00:00Z', url: '#' },
    { id: 3, companyId: 2, title: 'Política de Teletrabajo', category: 'Políticas Internas', uploadDate: '2024-07-26T12:00:00Z', url: '#' },
    { id: 4, companyId: 1, title: 'Manual de Onboarding', category: 'Políticas Internas', uploadDate: '2024-03-10T16:00:00Z', url: '#' },
    { id: 5, companyId: 1, title: 'Certificado ISO 9001', category: 'Personal', uploadDate: '2024-06-01T10:00:00Z', url: '#', employeeId: 1 },
    { id: 6, companyId: 2, title: 'Diploma Diseño UX', category: 'Personal', uploadDate: '2024-05-20T15:00:00Z', url: '#', employeeId: 5 },
];

export const SELECTION_PROCESSES: JobOpening[] = [
    {
        id: 1,
        companyId: 1, // Innovatec Solutions
        title: 'Senior Backend Developer',
        status: 'Abierto',
        candidates: [
            { id: 101, name: 'Juan Perez', email: 'juan.p@example.com', status: CandidateStatus.Interviewing },
            { id: 102, name: 'Maria Rodriguez', email: 'maria.r@example.com', status: CandidateStatus.Applied },
        ],
    },
    {
        id: 2,
        companyId: 2, // Creativos Digitales
        title: 'UI/UX Designer',
        status: 'Cerrado',
        candidates: [
            { id: 201, name: 'Pedro Gomez', email: 'pedro.g@example.com', status: CandidateStatus.Hired },
        ],
    },
];

export const PAYROLL_DOCUMENTS: PayrollDocument[] = [
    { id: 1, companyId: 1, period: 'Julio 2024', fileName: 'nomina_jul_2024.pdf', uploadDate: '2024-08-01T10:00:00Z', url: '#', status: 'Subido' },
    { id: 2, companyId: 1, period: 'Junio 2024', fileName: 'nomina_jun_2024.pdf', uploadDate: '2024-07-01T10:00:00Z', url: '#', status: 'Enviado' },
    { id: 3, companyId: 2, period: 'Julio 2024', fileName: 'payroll_july_2024.pdf', uploadDate: '2024-08-01T11:00:00Z', url: '#', status: 'Subido' },
];

export const TIME_LOGS: TimeLog[] = [
    { id: 1, employeeId: 1, type: 'in', timestamp: '2024-08-01T09:01:00Z' },
    { id: 2, employeeId: 1, type: 'out', timestamp: '2024-08-01T17:30:00Z' },
    { id: 3, employeeId: 5, type: 'in', timestamp: '2024-08-01T08:55:00Z' },
    { id: 4, employeeId: 5, type: 'out', timestamp: '2024-08-01T18:05:00Z' },
    { id: 5, employeeId: 1, type: 'in', timestamp: '2024-08-02T09:10:00Z' },
    // Add more late logs for employee 5 (Ana Gomez) in August 2024
    { id: 6, employeeId: 5, type: 'in', timestamp: '2024-08-05T09:15:00Z' }, // Late 1
    { id: 7, employeeId: 5, type: 'out', timestamp: '2024-08-05T18:00:00Z' },
    { id: 8, employeeId: 5, type: 'in', timestamp: '2024-08-06T09:20:00Z' }, // Late 2
    { id: 9, employeeId: 5, type: 'out', timestamp: '2024-08-06T18:00:00Z' },
    { id: 10, employeeId: 5, type: 'in', timestamp: '2024-08-07T09:06:00Z' },// Late 3
    { id: 11, employeeId: 5, type: 'out', timestamp: '2024-08-07T18:00:00Z' },
    { id: 12, employeeId: 5, type: 'in', timestamp: '2024-08-08T09:30:00Z' }, // Late 4, triggers alert
    { id: 13, employeeId: 5, type: 'out', timestamp: '2024-08-08T18:00:00Z' },
];

export const ABSENCES: Absence[] = [
    // Sofia Reyes (id: 3) is on vacation. Her status is also set to Vacation.
    { id: 1, employeeId: 3, type: AbsenceType.Vacation, startDate: '2024-08-05', endDate: '2024-08-11' },
    // Laura Fernandez (id: 10) is on vacation.
    { id: 2, employeeId: 10, type: AbsenceType.Vacation, startDate: '2024-08-19', endDate: '2024-08-25' },
    // Luis Torres (id: 6) is on sick leave. His status is Inactive.
    { id: 3, employeeId: 6, type: AbsenceType.SickLeave, startDate: '2024-08-01', endDate: '2024-08-31' },
     // Julia Romero (id: 12) takes a day off.
    { id: 4, employeeId: 12, type: AbsenceType.Other, startDate: '2024-08-15', endDate: '2024-08-15' },
];

export const PERFORMANCE_REVIEWS: PerformanceReview[] = [
    {
        id: 1,
        employeeId: 7, // Isabela Cruz
        reviewerId: 5, // Ana Gomez
        companyId: 2,
        reviewDate: '2024-09-15T10:00:00Z',
        periodStartDate: '2024-03-01',
        periodEndDate: '2024-08-31',
        status: PerformanceReviewStatus.Completed,
        goals: [
            { id: 1, description: 'Implementar 3 nuevas features en la UI principal.', status: 'Completed' },
            { id: 2, description: 'Reducir el tiempo de carga del dashboard en un 15%.', status: 'On Track' },
        ],
        strengths: 'Excelente atención al detalle y calidad de código. Muy proactiva en la colaboración con el equipo de diseño.',
        areasForImprovement: 'Puede mejorar en la estimación de tiempos para tareas complejas.',
        managerFeedback: 'Isabela ha tenido un semestre excepcional. Su contribución ha sido clave para el lanzamiento del nuevo módulo de clientes.',
        employeeComments: 'Agradezco el feedback. Trabajaré en mis habilidades de estimación y buscaré oportunidades para liderar pequeños proyectos.',
    },
    {
        id: 2,
        employeeId: 8, // Marco Diaz
        reviewerId: 5, // Ana Gomez (assuming Marco now reports to Ana for simplicity)
        companyId: 3,
        reviewDate: '2024-09-20T10:00:00Z',
        periodStartDate: '2024-03-01',
        periodEndDate: '2024-08-31',
        status: PerformanceReviewStatus.InProgress,
        goals: [
            { id: 1, description: 'Contribuir al componente de reportes.', status: 'On Track' },
        ],
        strengths: 'Buena capacidad de aprendizaje y adaptación a nuevas tecnologías.',
        areasForImprovement: 'Necesita participar más activamente en las reuniones de planificación.',
        managerFeedback: 'Marco está progresando bien y se está integrando al equipo. Espero ver más iniciativa en los próximos meses.',
        employeeComments: '',
    }
];