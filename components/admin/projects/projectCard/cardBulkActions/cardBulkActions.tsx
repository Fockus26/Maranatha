import { motion } from "framer-motion";

import { Button } from "@/components/ui/button/button";
import styles from "./cardBulkActions.module.scss";

const ACTIONS = [
	{ label: "Activar", action: "activate", tone: "secondary" },
	{ label: "Desactivar", action: "deactivate", tone: "warning" },
	{ label: "Duplicar", action: "duplicate", tone: "primary" },
	{ label: "Eliminar", action: "delete", tone: "error" },
] as const;

export const CardBulkActions = () => {
	return (
		<motion.div
			className={styles.bulkActions}
			initial={{ opacity: 0, y: -6, scale: 0.96 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -6, scale: 0.96 }}
			transition={{ duration: 0.15 }}
		>
			{ACTIONS.map(({ label, action, tone }) => (
				<Button
					key={action}
					tone={tone}
					variant="plain"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					{label}
				</Button>
			))}
		</motion.div>
	);
};
