import type { ReactElement, ReactNode } from "react";

interface Props {
	children: ReactNode;
}

const AdminLayout = async ({ children }: Readonly<Props>): Promise<ReactElement> => {
	return (
		<>
			<div id="modals" />
			{children}
		</>
	);
};

export default AdminLayout;
