export type Styles = {
  'accent': string;
  'error': string;
  'field': string;
  'input': string;
  'primary': string;
  'search': string;
  'secondary': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
