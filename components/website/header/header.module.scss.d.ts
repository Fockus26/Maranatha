export type Styles = {
  'header': string;
  'headerDark': string;
  'scrollTop': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
