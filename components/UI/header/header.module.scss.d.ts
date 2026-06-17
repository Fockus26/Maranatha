export type Styles = {
  'cta': string;
  'header': string;
  'headerDark': string;
  'headerScrolled': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
