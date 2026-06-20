import { AuthGuard } from "@/components/auth/authGuard";
import { Sidebar } from "@/components/dashboard/sidebar/sidebar";
import styles from "./layout.module.scss";

function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthGuard>
			<div className={styles.dashboard}>
				<Sidebar />
				{children}
			</div>
		</AuthGuard>
	);
}

export default DashboardLayout;
