import { Project } from "@/components/admin/project/project";

type Props = {
	params: Promise<{
		id: string;
	}>;
};

export default async function ProjectPage({ params }: Props) {
	const { id } = await params;

	return <Project id={id} />;
}
