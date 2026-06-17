import styles from "./projectsModule.module.scss";

export const ProjectsFilters = () => {
	return (
		<div className={styles.filters}>
			<input type="text" placeholder="Buscar proyecto..." />

			<select>
				<option value="">Todas las categorías</option>

				<option value="IGLESIA">Iglesia</option>

				<option value="EEC">EEC</option>

				<option value="GJEF">GJEF</option>
			</select>

			<select>
				<option value="">Todos los estados</option>

				<option value="IN_PROGRESS">En progreso</option>

				<option value="COMPLETED">Completado</option>
			</select>
		</div>
	);
};
