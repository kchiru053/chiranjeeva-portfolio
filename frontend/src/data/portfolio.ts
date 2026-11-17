/**
 * Central portfolio data — written from Kappala Chiranjeeva's resume.
 * Every fact on the site comes from this file (or, when the Spring Boot backend is running,
 * from backend/src/main/resources/portfolio.json, which is generated from this file with
 * `npm run export-data`). Nothing here should be added unless it is true and on the resume.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export type Portrait = { src: string; srcSet?: string; alt: string };

export const profile = {
  fullName: 'Kappala Chiranjeeva',
  displayName: 'Kappala Chiranjeeva',
  /** Used in the big title and in headings like "Chiranjeeva's Top Picks". */
  firstName: 'CHIRANJEEVA',
  shortName: 'Chiranjeeva',
  /** Letters shown on the monogram when there is no photo. */
  initials: 'KC',
  seriesTag: 'THE SERIES',
  /** Fictional studio card shown at the very start of the opening sequence. */
  originalLabel: 'A KAPPALA ORIGINAL',
  role: 'Backend Developer',
  tagline: ['Backend Developer', 'Java', 'SQL'],
  /** Small outlined badge next to the hero meta line. */
  badge: 'JAVA·SQL',
  /** One-line teaser under the "ORIGINALS" heading. */
  originalsBlurb: 'Two productions from the resume — a student records system and a banking system. Open any title for the full story.',
  intro:
    'An entry-level backend developer with a strong foundation in Java, JDBC, Servlets and SQL. Built a full-stack Student Management System that handles data-driven web workflows end to end. A quick learner with a solid grasp of OOP and relational database design, eager to contribute to a backend development team.',
  location: 'Guntur, Andhra Pradesh',
  email: 'kchiru053@gmail.com',
  links: {
    github: 'https://github.com/kchiru053',
    // Add a LinkedIn URL here and the buttons appear automatically:
    // linkedin: 'https://www.linkedin.com/in/your-handle/',
  } as { github: string; linkedin?: string },
  resumePdf: '/assets/Kappala_Chiranjeeva_Resume.pdf',
  /**
   * Add a photo to show it instead of the "KC" monogram, e.g.
   *   portrait: { src: '/assets/portrait.png', alt: 'Portrait of Kappala Chiranjeeva' }
   * A transparent-background PNG/WebP, shot from the chest up, looks best.
   */
  portrait: undefined as Portrait | undefined,
  /** Three floating chips on the hero. */
  highlights: [
    { text: 'B.Tech · CSE', sub: '2023 – 2027' },
    { text: 'Java · JDBC · Servlets', sub: 'Backend core' },
    { text: 'SQL · MySQL', sub: 'Database' },
  ],
  /** Four fact tiles in "About Me". */
  facts: [
    { k: 'Studying', v: 'B.Tech, Computer Science', s: 'Sri Mittapalli College Of Engineering · 2023 – 2027' },
    { k: 'Focus', v: 'Backend Development', s: 'Java · JDBC · Servlets · SQL' },
    { k: 'Primary language', v: 'Java', s: 'with C and Python (basic syntax)' },
    { k: 'Based in', v: 'Guntur, Andhra Pradesh', s: 'India' },
  ],
  /** Interests chips in "About Me" — hidden while empty. */
  interests: [] as string[],
};

export const education: { school: string; place: string; degree: string; period: string; score?: string }[] = [
  {
    school: 'Sri Mittapalli College Of Engineering',
    place: 'Guntur',
    degree: 'Bachelor of Technology — Computer Science',
    period: '2023 – 2027',
  },
  {
    school: 'Narayana Junior College',
    place: 'Guntur',
    degree: 'MPC',
    period: '2021 – 2023',
  },
];

/** Add jobs/internships here and the "Work Experience" block appears in the resume sheet. */
export const experience: { company: string; role: string; place: string; period: string; points: string[] }[] = [];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  /** Optional — the resume gives no dates for the projects, so none is shown. */
  year?: string;
  genre: string;
  logline: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when there is no public repository — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
};

export const projects: Project[] = [
  {
    id: 'student-management-system',
    title: 'Student Management System',
    genre: 'Java • JDBC • Servlets',
    logline: 'A web-based admin tool for managing student records, with full CRUD on a MySQL database.',
    stack: ['Java', 'JDBC', 'Servlets', 'Filters', 'MySQL'],
    build: [
      'Designed and developed a web-based Student Management System enabling admins to manage student records — name, roll number, marks and address.',
      'Implemented full CRUD (Create, Read, Update, Delete) operations for student data using Java, JDBC and Servlets, connected to a MySQL database.',
      'Built request-handling logic with Servlets and Filters to route Create/Read/Update/Delete actions and manage authentication.',
      'Designed the relational database schema in MySQL and wrote SQL queries to support all CRUD operations with data integrity.',
    ],
    features: [
      'Admins manage student records (name, roll no, marks, address)',
      'Full CRUD with Java, JDBC and Servlets',
      'Servlets and Filters route actions and handle authentication',
      'Relational MySQL schema with data integrity',
    ],
    metrics: [
      { value: 'CRUD', label: 'create · read · update · delete' },
      { value: '4', label: 'fields per student record' },
      { value: 'MySQL', label: 'relational database' },
    ],
    palette: { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'tenants',
  },
  {
    id: 'banking-system',
    title: 'Banking System Management',
    genre: 'Backend • Security • Databases',
    logline: 'A banking management system covering accounts, balances, deposits, withdrawals and fund transfers.',
    stack: ['Authentication', 'RBAC', 'Relational Database'],
    build: [
      'Designed and developed a banking management system to handle core operations: account creation, balance inquiry, deposits, withdrawals and fund transfers.',
      'Implemented secure user authentication and role-based access control (Admin / Customer) to protect sensitive financial data.',
      'Built a relational database schema to manage customer records, transaction logs and account details, ensuring data integrity and consistency.',
      'Integrated real-time transaction validation and error handling to prevent invalid or fraudulent operations.',
    ],
    features: [
      'Account creation, balance inquiry, deposits, withdrawals, fund transfers',
      'Secure authentication with Admin / Customer role-based access',
      'Schema for customers, transaction logs and account details',
      'Real-time transaction validation and error handling',
    ],
    metrics: [
      { value: '5', label: 'core banking operations' },
      { value: '2', label: 'roles — Admin & Customer' },
      { value: '3', label: 'data domains — customers, accounts, transactions' },
    ],
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'shield',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

/** Awards, hackathons, rankings. Empty for now — the certifications below take the spotlight instead. */
export const achievements: Achievement[] = [];

export type Certification = { issuer: string; name: string; detail?: string; link?: string };

export const certifications: Certification[] = [
  {
    issuer: 'HackerRank',
    name: 'Java (Basic)',
    detail: 'Validates fundamental programming and problem-solving skills.',
    // link: 'https://www.hackerrank.com/certificates/your-id',   ← add to show a "View certificate" link
  },
  {
    issuer: 'HackerRank',
    name: 'Python (Basic)',
    detail: 'Validates fundamental programming and problem-solving skills.',
  },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Java first',
    skills: [
      { name: 'Java', mono: 'Jv', note: 'Primary' },
      { name: 'C', mono: 'C' },
      { name: 'Python', mono: 'Py', note: 'Basic syntax' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend / Web',
    subtitle: 'Server-side logic',
    skills: [
      { name: 'JDBC', mono: 'Jd' },
      { name: 'Servlets', mono: 'Sv' },
      { name: 'Filters', mono: 'Fl' },
    ],
  },
  {
    id: 'databases',
    title: 'Database',
    subtitle: 'Schema design • Queries',
    skills: [
      { name: 'SQL', mono: 'Sq' },
      { name: 'MySQL', mono: 'My' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    subtitle: 'The foundations',
    skills: [
      { name: 'OOP', mono: 'Oo' },
      { name: 'Relational Design', mono: 'Rd' },
    ],
  },
];

/**
 * Factual cross-references shown when a skill card is hovered/tapped:
 * where the skill appears in the projects or certifications on the resume.
 */
export const skillEvidence: Record<string, string[]> = {
  Java: ['Student Management System', 'HackerRank Java (Basic)'],
  Python: ['HackerRank Python (Basic)'],
  JDBC: ['Student Management System'],
  Servlets: ['Student Management System'],
  Filters: ['Student Management System'],
  SQL: ['Student Management System'],
  MySQL: ['Student Management System'],
  'Relational Design': ['Student Management System', 'Banking System Management'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#ff3d5a' };
const amber: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#ffb547' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'The Beginning',
    period: '2021 – 2023',
    synopsis: 'Intermediate years at Narayana Junior College, Guntur.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Foundation',
        description: 'MPC at Narayana Junior College, Guntur.',
        tags: ['MPC'],
        runtime: '2021 – 2023',
        palette: amber,
      },
    ],
  },
  {
    number: 2,
    title: 'Enter: Computer Science',
    period: '2023 – 2027',
    synopsis: 'B.Tech in Computer Science at Sri Mittapalli College Of Engineering, Guntur.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Engineer',
        description: 'Bachelor of Technology in Computer Science.',
        tags: ['B.Tech', 'CSE'],
        runtime: '2023 – 2027',
        palette: violet,
      },
      {
        code: 'S02 E02',
        title: 'The Certified',
        description: 'HackerRank Java (Basic) and Python (Basic) certifications, validating fundamental programming and problem-solving skills.',
        tags: ['HackerRank', 'Java', 'Python'],
        runtime: 'Certifications',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Building Backends',
    period: 'Projects',
    synopsis: 'Two Originals — a Student Management System and a Banking System Management app — each built around relational data and data integrity.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'The Record Keeper',
        description: 'Student Management System — full CRUD for student records with Java, JDBC, Servlets and MySQL.',
        tags: ['Java', 'JDBC', 'Servlets', 'MySQL'],
        runtime: 'Project',
        palette: ocean,
      },
      {
        code: 'S03 E02',
        title: 'The Gatekeeper',
        description: 'Servlets and Filters route every CRUD action and manage authentication.',
        tags: ['Servlets', 'Filters', 'Authentication'],
        runtime: 'Project',
        palette: violet,
      },
      {
        code: 'S03 E03',
        title: 'The Banker',
        description: 'Banking System Management — accounts, deposits, withdrawals and transfers, with Admin / Customer access control and real-time validation.',
        tags: ['Banking', 'RBAC', 'Validation'],
        runtime: 'Project',
        palette: amber,
      },
    ],
  },
  {
    number: 4,
    title: "What's Next",
    period: 'Now streaming',
    synopsis: 'The resume ends on a goal: contributing to a backend development team.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'The Next Chapter',
        description: 'A quick learner, eager to contribute to a backend development team.',
        tags: ['Backend', 'Java', 'SQL'],
        runtime: 'Next up',
        palette: crimson,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary language', title: 'Java', detail: 'With JDBC & Servlets for the backend', palette: amber },
  { label: 'The first Original', title: 'Student Mgmt System', detail: 'Full CRUD • Java, JDBC, Servlets', palette: ocean },
  { label: 'The second Original', title: 'Banking System', detail: 'Admin / Customer role-based access', palette: crimson },
  { label: 'Database', title: 'MySQL', detail: 'SQL queries & relational schema design', palette: jade },
  { label: 'Certified', title: 'HackerRank', detail: 'Java (Basic) • Python (Basic)', palette: violet },
  { label: 'Fundamentals', title: 'OOP', detail: 'Solid grasp of OOP & relational design', palette: amber },
  { label: 'The degree', title: 'B.Tech CSE', detail: 'Sri Mittapalli College · 2023 – 2027', palette: ocean },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · Computer Science',
    lines: ['Sri Mittapalli College Of Engineering, Guntur', '2023 – 2027'],
  },
  {
    kicker: 'Skills',
    title: 'Java first.',
    lines: ['Java · C · Python (basic syntax)', 'JDBC · Servlets · Filters · SQL (MySQL)'],
    chips: ['Java', 'JDBC', 'Servlets', 'Filters', 'MySQL'],
  },
  {
    kicker: 'Projects',
    title: 'Two Originals',
    lines: ['Student Management System — full CRUD on Java, JDBC, Servlets & MySQL', 'Banking System Management — role-based access & real-time validation'],
  },
  {
    kicker: 'Certified',
    title: 'HackerRank',
    lines: ['Java (Basic)', 'Python (Basic)'],
  },
  {
    kicker: 'Next up',
    title: 'Ready to build.',
    lines: ['Eager to contribute to a backend development team'],
  },
];

export type ProfileId = 'chiranjeeva' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'chiranjeeva',
    name: 'Chiranjeeva',
    blurb: 'The full series, in order',
    color: '#e5132b',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Resume, certifications & skills first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Creative',
    blurb: 'The story arc & highlights first',
    color: '#ffb547',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'About', card: 'About Me', meta: 'The Pilot • Education & focus', palette: violet },
  journey: { nav: 'Journey', card: 'My Journey', meta: `${seasons.length} Seasons • ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: amber },
  originals: { nav: 'Originals', card: 'My Projects', meta: `${projects.length} Originals`, palette: crimson },
  picks: { nav: 'Top Picks', card: 'Top Picks', meta: `Top ${topPicks.length} from the resume`, palette: jade },
  skills: { nav: 'Skills', card: 'My Skills', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: {
    nav: 'Moments',
    card: achievements.length ? 'My Achievements' : 'My Certifications',
    meta: achievements.length ? `${achievements.length} Moments • ${certifications.length} Certifications` : `${certifications.length} Certifications`,
    palette: crimson,
  },
  story: { nav: 'Resume', card: 'The Full Story', meta: 'Resume • View & download', palette: violet },
};
