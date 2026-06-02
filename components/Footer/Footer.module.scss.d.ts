export type Styles = {
	copyright: string;
	footer: string;
	logo: string;
	main: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
