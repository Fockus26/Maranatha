export type Styles = {
	description: string;
	divider: string;
	dropdown: string;
	links: string;
	panel: string;
	spacer: string;
	subtitle: string;
	title: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
