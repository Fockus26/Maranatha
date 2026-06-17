export type Styles = {
  'accent': string;
  'error': string;
  'indicator': string;
  'link': string;
  'primary': string;
  'secondary': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
