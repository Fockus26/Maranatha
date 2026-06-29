export type Styles = {
  'accent': string;
  'animation': string;
  'error': string;
  'fill': string;
  'primary': string;
  'progressBar': string;
  'secondary': string;
  'shimmer': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
