export type Styles = {
	button: string;
	error: string;
	field: string;
	form: string;
	input: string;
	label: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
