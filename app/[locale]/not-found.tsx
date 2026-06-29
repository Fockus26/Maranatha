import { getMessages } from "next-intl/server";

async function NotFound() {
	const messages = (await getMessages()).notFound;
	return (
		<main>
			<h2>{messages.title}</h2>
			<p>{messages.description}</p>
		</main>
	);
}

export default NotFound;
