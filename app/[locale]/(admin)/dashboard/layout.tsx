import { AuthGuard } from "@/components/admin/auth/authGuard";
import { Sidebar } from "@/components/admin/dashboard/sidebar/sidebar";
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
