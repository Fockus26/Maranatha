import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
	where,
} from 'firebase/firestore'

import { db } from '@/lib/firebase/firestore'
import type { Project, ProjectCategory } from '@/types/project.types'

import type { CreateProjectDto } from '../validations/project.validation'

export const getAllProjects = async (): Promise<Project[]> => {
	const snapshot = await getDocs(collection(db, 'projects'))

	return snapshot.docs.map((document) => ({
		id: document.id,
		...document.data(),
	})) as Project[]
}

export const getProjectsByCategory = async (
	category: ProjectCategory,
): Promise<Project[]> => {
	const projectsQuery = query(
		collection(db, 'projects'),
		where('category', '==', category),
	)

	const snapshot = await getDocs(projectsQuery)

	return snapshot.docs.map((document) => ({
		id: document.id,
		...document.data(),
	})) as Project[]
}

export const getProjectById = async (id: string): Promise<Project | null> => {
	const snapshot = await getDoc(doc(db, 'projects', id))

	if (!snapshot.exists()) {
		return null
	}

	return {
		id: snapshot.id,
		...snapshot.data(),
	} as Project
}

export const createProject = async (
	data: CreateProjectDto,
): Promise<Project> => {
	const document = await addDoc(collection(db, 'projects'), data)

	return {
		id: document.id,
		...data,
	}
}

export const updateProject = async (
	id: string,
	data: Partial<CreateProjectDto>,
): Promise<Project | null> => {
	const projectReference = doc(db, 'projects', id)

	const existingProject = await getProjectById(id)

	if (!existingProject) {
		return null
	}

	await updateDoc(projectReference, data)

	return {
		...existingProject,
		...data,
	}
}

export const deleteProject = async (id: string): Promise<boolean> => {
	const existingProject = await getProjectById(id)

	if (!existingProject) {
		return false
	}

	await deleteDoc(doc(db, 'projects', id))

	return true
}
