export type Styles = {
    isOpen: string;
    menu: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
