import type { NotFoundMessages } from "@/types/messages.types";

interface Props {
	messages: NotFoundMessages;
}

async function NotFound({ messages }: Props) {
	return (
		<main>
			<h2>{messages.title}</h2>
			<p>{messages.description}</p>
		</main>
	);
}

export default NotFound;
