export const PROJECT_CATEGORIES = {
    IGLESIA: {
        label: "Iglesia",
        shortLabel: "Iglesia",
        slug: "iglesia",
    },

    EEC: {
        label: "El Evangelio Cambia",
        shortLabel: "EEC",
        slug: "eec",
    },

    GJEF: {
        label: "Generacion JEF",
        shortLabel: "GJEF",
        slug: "gjef",
    },
} as const;

export const PROJECT_STATUSES = {
    IN_PROGRESS: {
        label: "In Progress",
    },

    COMPLETED: {
        label: "Completed",
    },
} as const;

export const CATEGORY_KEYS = Object.keys(PROJECT_CATEGORIES) as ProjectCategory[];

export const CATEGORY_VALUES = Object.values(PROJECT_CATEGORIES).map((c) => c.slug);

export const STATUS_KEYS = Object.keys(PROJECT_STATUSES) as ProjectStatus[];

export const STATUS_VALUES = STATUS_KEYS;

export type ProjectCategory = keyof typeof PROJECT_CATEGORIES;

export type ProjectStatus = keyof typeof PROJECT_STATUSES;

export interface ProjectPhase {
    id: string;
    title: string;
    description: string;
    images: string[];
    startDate: string;
    endDate: string;
    targetAmount: number;
    currentAmount: number;
}

export interface ProjectTeamMember {
    id: string;
    name: string;
    role: string;
    image?: string | undefined;
}

export interface Project {
    id: string;
    title: string;
    category: ProjectCategory;
    description: string;
    shortDescription: string;
    image: string;
    status: ProjectStatus;
    team: ProjectTeamMember[];
    phases: ProjectPhase[];
    currentPhaseId: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectCard {
    id: string;
    title: string;
    shortDescription: string;
    category: ProjectCategory;
    image: string;
    status: ProjectStatus;
    currentPhase: {
        endDate: string;
        targetAmount: number;
        currentAmount: number;
    };
}
