export type Styles = {
  'menu': string;
  'navbar': string;
  'toggleMenu': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
