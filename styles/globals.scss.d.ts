export type Styles = {
	active: string;
	eventoCard: string;
	heroSlideContent: string;
	slideLeft: string;
	slideRight: string;
	socialCard: string;
	valorCard: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
