export type Styles = {
    donateButton: string;
    icon: string;
    menu: string;
    navbar: string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
