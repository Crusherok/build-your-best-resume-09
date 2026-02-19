export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Skills {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface Links {
  github: string;
  linkedin: string;
}

export interface ResumeData {
  personal: PersonalInfo;
  summary: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: Skills;
  links: Links;
}

export type TemplateName = 'classic' | 'modern' | 'minimal';

export interface ColorTheme {
  name: string;
  value: string;
  hsl: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  { name: 'Teal', value: 'teal', hsl: '168 60% 40%' },
  { name: 'Navy', value: 'navy', hsl: '220 60% 35%' },
  { name: 'Burgundy', value: 'burgundy', hsl: '345 60% 35%' },
  { name: 'Forest', value: 'forest', hsl: '150 50% 30%' },
  { name: 'Charcoal', value: 'charcoal', hsl: '0 0% 25%' },
];

export const SAMPLE_DATA: ResumeData = {
  personal: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Full-stack engineer with 4+ years of experience building scalable web applications. Led a team of 5 developers to deliver a platform serving 50k+ users. Passionate about clean architecture, performance optimization, and developer experience.',
  education: [
    { id: '1', school: 'Stanford University', degree: 'B.S.', field: 'Computer Science', startDate: '2016', endDate: '2020', gpa: '3.8' },
  ],
  experience: [
    {
      id: '1', company: 'TechCorp Inc.', title: 'Senior Software Engineer', startDate: 'Jan 2022', endDate: 'Present',
      bullets: [
        'Built a real-time analytics dashboard serving 50k+ daily active users, reducing load time by 40%',
        'Led migration from monolith to microservices architecture, improving deployment frequency by 300%',
        'Designed and implemented a CI/CD pipeline that reduced release cycles from 2 weeks to 2 days',
      ],
    },
    {
      id: '2', company: 'StartupXYZ', title: 'Software Engineer', startDate: 'Jun 2020', endDate: 'Dec 2021',
      bullets: [
        'Developed RESTful APIs handling 10k requests/minute with 99.9% uptime',
        'Implemented automated testing suite covering 85% of codebase',
      ],
    },
  ],
  projects: [
    { id: '1', title: 'TaskFlow', description: 'A project management tool with real-time collaboration, Kanban boards, and automated workflows for teams of up to 50 members.', techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSocket'], liveUrl: 'https://taskflow.dev', githubUrl: 'https://github.com/alex/taskflow' },
    { id: '2', title: 'CodeReview AI', description: 'An AI-powered code review assistant that analyzes pull requests and provides actionable suggestions, reducing review time by 60%.', techStack: ['Python', 'FastAPI', 'OpenAI', 'Docker'], liveUrl: '', githubUrl: 'https://github.com/alex/codereview-ai' },
  ],
  skills: {
    technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL', 'Python', 'AWS', 'Docker'],
    soft: ['Team Leadership', 'Problem Solving', 'Communication', 'Mentoring'],
    tools: ['Git', 'Docker', 'AWS', 'Figma', 'Jira'],
  },
  links: {
    github: 'https://github.com/alexjohnson',
    linkedin: 'https://linkedin.com/in/alexjohnson',
  },
};

export const EMPTY_RESUME: ResumeData = {
  personal: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: '', linkedin: '' },
};

export interface BuildStep {
  number: number;
  slug: string;
  title: string;
  description: string;
  prompt: string;
}

export const BUILD_STEPS: BuildStep[] = [
  { number: 1, slug: '01-problem', title: 'Problem', description: 'Define the problem your AI Resume Builder solves.', prompt: 'Define the core problem: Job seekers need ATS-optimized resumes. Describe the pain points and target users.' },
  { number: 2, slug: '02-market', title: 'Market', description: 'Research the market and competitors.', prompt: 'Research existing resume builders. List 3 competitors, their strengths, weaknesses, and your differentiator.' },
  { number: 3, slug: '03-architecture', title: 'Architecture', description: 'Design the system architecture.', prompt: 'Design the architecture: React frontend, localStorage persistence, deterministic ATS scoring, template system.' },
  { number: 4, slug: '04-hld', title: 'HLD', description: 'Create the high-level design.', prompt: 'Create HLD: Component tree, data flow diagram, state management strategy, routing structure.' },
  { number: 5, slug: '05-lld', title: 'LLD', description: 'Create the low-level design.', prompt: 'Create LLD: Interface definitions, scoring algorithm pseudocode, template rendering logic, validation rules.' },
  { number: 6, slug: '06-build', title: 'Build', description: 'Implement the core features.', prompt: 'Build the resume builder with form sections, live preview, ATS scoring, and template switching.' },
  { number: 7, slug: '07-test', title: 'Test', description: 'Test all features.', prompt: 'Test all 10 checklist items: localStorage, live preview, templates, colors, ATS score, export, empty states, responsive, no errors.' },
  { number: 8, slug: '08-ship', title: 'Ship', description: 'Deploy and ship the project.', prompt: 'Deploy to production. Verify all features work on the live URL. Prepare proof artifacts.' },
];

export interface BuildTrackData {
  steps: Record<string, { completed: boolean; artifact: string }>;
  submission: { lovableLink: string; githubLink: string; deployLink: string };
  checklist: boolean[];
}

export const EMPTY_BUILD_TRACK: BuildTrackData = {
  steps: Object.fromEntries(BUILD_STEPS.map(s => [s.slug, { completed: false, artifact: '' }])),
  submission: { lovableLink: '', githubLink: '', deployLink: '' },
  checklist: Array(10).fill(false),
};

export const ACTION_VERBS = ['built', 'developed', 'designed', 'implemented', 'led', 'improved', 'created', 'optimized', 'automated', 'managed', 'delivered', 'launched', 'scaled', 'reduced', 'increased', 'achieved', 'established', 'architected', 'engineered', 'spearheaded'];
