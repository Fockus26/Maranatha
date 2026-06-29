export type Styles = {
  'accent': string;
  'badge': string;
  'error': string;
  'icon': string;
  'primary': string;
  'secondary': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
