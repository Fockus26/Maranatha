export type Styles = {
  'fab': string;
  'scrolled': string;
  'toolbar': string;
  'topRow': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
