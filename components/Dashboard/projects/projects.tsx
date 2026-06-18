import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/dashboard/projects/projectCard/projectCard";
import { Toolbar } from "@/components/dashboard/toolbar/toolbar";
import { Fallback } from "@/components/ui/fallback/fallback";
import { Loader } from "@/components/ui/loader/loader";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { type GetProjectsArgs, useGetProjectsQuery } from "@/store/api/projectsApi";
import {
	selectCategory,
	selectFilteredProjects,
	selectSelectedIds,
	selectSelectionMode,
	selectStatus,
} from "@/store/selectors/projectsDashboard.selectors";
import { toggleSelection } from "@/store/slices/projectsDashboardSlice";
import styles from "./projects.module.scss";

export const Projects = () => {
	const dispatch = useAppDispatch();

	const category = useAppSelector(selectCategory);
	const status = useAppSelector(selectStatus);
	const selectedIds = useAppSelector(selectSelectedIds);
	const selectionMode = useAppSelector(selectSelectionMode);

	const queryArgs: GetProjectsArgs = {
		view: "card",
		...(category && { category }),
		...(status && { status }),
	};

	const { data: projects = [], isLoading } = useGetProjectsQuery(queryArgs);

	const filteredProjects = useAppSelector(selectFilteredProjects(projects));

	if (isLoading) return <Loader label="Cargando proyectos" />;

	return (
		<>
			<Toolbar />

			{filteredProjects.length > 0 && (
				<motion.ul className={styles.grid} layout>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project) => (
							<motion.li
								key={project.id}
								layout
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{
									layout: {
										type: "spring",
										stiffness: 400,
										damping: 35,
									},
									duration: 0.2,
								}}
							>
								<ProjectCard
									project={project}
									selected={selectedIds.includes(project.id)}
									selectionMode={selectionMode}
									onSelect={() => dispatch(toggleSelection(project.id))}
								/>
							</motion.li>
						))}
					</AnimatePresence>
				</motion.ul>
			)}

			<AnimatePresence>
				{filteredProjects.length === 0 && !isLoading && (
					<Fallback
						title="No se encontraron proyectos"
						instruction="Busca proyectos con otras especificaciones."
					/>
				)}
			</AnimatePresence>
		</>
	);
};
