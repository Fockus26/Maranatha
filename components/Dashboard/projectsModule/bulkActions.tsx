import styles from "./projectsModule.module.scss";

type Props = {
	count: number;
};

export const BulkActions = ({ count }: Props) => {
	return (
		<div className={styles.bulkActions}>
			<span>{count} seleccionados</span>

			<button type="button">Activar</button>

			<button type="button">Desactivar</button>

			<button type="button">Duplicar</button>

			<button type="button">Eliminar</button>
		</div>
	);
};
