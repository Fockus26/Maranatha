import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    limit,
    type QueryConstraint,
    query,
    updateDoc,
    where,
} from "firebase/firestore";

import { db } from "@/lib/firebase/firestore";
import { dateNow } from "@/lib/utils/date";
import type { Project, ProjectCard, ProjectCategory, ProjectStatus } from "@/types/project.types";
import type { CreateProjectDto } from "../validations/project.validation";

interface GetProjectsFilters {
    category?: ProjectCategory;
    status?: ProjectStatus;
    perPage?: number;
    view?: "full" | "card";
}

export const getAllProjects = async ({
    category,
    status,
    perPage,
    view = "full",
}: GetProjectsFilters): Promise<Project[] | ProjectCard[]> => {
    const constraints: QueryConstraint[] = [];

    if (category) {
        constraints.push(where("category", "==", category));
    }

    if (status) {
        constraints.push(where("status", "==", status));
    }

    if (perPage) {
        constraints.push(limit(perPage));
    }

    const projectsQuery = query(collection(db, "projects"), ...constraints);

    const snapshot = await getDocs(projectsQuery);

    const projects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Project[];

    if (view === "card") {
        return projects.map((project) => {
            const phases = project.phases ?? [];

            const currentPhase = phases.find((phase) => phase.id === project.currentPhaseId);

            return {
                id: project.id,
                title: project.title,
                shortDescription: project.shortDescription,
                category: project.category,
                image: project.image,
                status: project.status,
                currentPhase: {
                    endDate: currentPhase?.endDate ?? "",
                    targetAmount: currentPhase?.targetAmount ?? 0,
                    currentAmount: currentPhase?.currentAmount ?? 0,
                },
            };
        });
    }

    return projects;
};

export const getProjectById = async (id: string): Promise<Project | null> => {
    const snapshot = await getDoc(doc(db, "projects", id));

    if (!snapshot.exists()) {
        return null;
    }

    return {
        id: snapshot.id,
        ...snapshot.data(),
    } as Project;
};

export const createProject = async (data: CreateProjectDto): Promise<Project> => {
    const now = dateNow().toString();

    const projectData: Omit<Project, "id"> = {
        ...data,
        createdAt: now,
        updatedAt: now,
    };

    const document = await addDoc(collection(db, "projects"), projectData);

    return {
        id: document.id,
        ...projectData,
    };
};

export const updateProject = async (
    id: string,
    data: Partial<CreateProjectDto>,
): Promise<Project | null> => {
    const projectReference = doc(db, "projects", id);

    const existingProject = await getProjectById(id);

    if (!existingProject) {
        return null;
    }
    await updateDoc(projectReference, data);

    return {
        ...existingProject,
        ...data,
    };
};

export const deleteProject = async (id: string): Promise<boolean> => {
    const existingProject = await getProjectById(id);

    if (!existingProject) {
        return false;
    }

    await deleteDoc(doc(db, "projects", id));

    return true;
};
