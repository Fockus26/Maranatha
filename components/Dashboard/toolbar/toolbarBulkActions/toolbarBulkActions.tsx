import { AnimatePresence, motion } from "framer-motion";
import { Xmark } from "iconoir-react";

import { Button } from "@/components/ui/button/button";
import { useAppDispatch } from "@/hooks/useRedux";
import { clearSelection } from "@/store/slices/projectsDashboardSlice";
import styles from "./toolbarBulkactions.module.scss";

interface Props {
	count: number;
}

export const ToolbarBulkActions = ({ count }: Props) => {
	const dispatch = useAppDispatch();

	return (
		<motion.div
			className={styles.bulkActions}
			initial={{
				opacity: 0,
				y: -12,
				scale: 0.98,
			}}
			animate={{
				opacity: 1,
				y: 0,
				scale: 1,
			}}
			exit={{
				opacity: 0,
				y: -12,
				scale: 0.98,
			}}
			transition={{
				duration: 0.2,
			}}
		>
			<div>
				<Button
					icon={<Xmark />}
					variant="plain"
					onClick={() => dispatch(clearSelection())}
				/>

				<div className={styles.counter}>
					<AnimatePresence mode="wait">
						<motion.span
							key={count}
							initial={{
								opacity: 0,
								y: 12,
							}}
							animate={{
								opacity: 1,
								y: 0,
							}}
							exit={{
								opacity: 0,
								y: -12,
							}}
							transition={{
								duration: 0.15,
							}}
						>
							{count}
						</motion.span>
					</AnimatePresence>

					<span>seleccionados</span>
				</div>
			</div>

			<menu>
				<Button variant="outline" tone="success">
					Activar
				</Button>

				<Button variant="outline" tone="warning">
					Desactivar
				</Button>

				<Button variant="outline">Duplicar</Button>

				<Button variant="outline" tone="error">
					Eliminar
				</Button>
			</menu>
		</motion.div>
	);
};
