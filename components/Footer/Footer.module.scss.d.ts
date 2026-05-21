export type Styles = {
	button: string
	footer: string
	images: string
	title: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
