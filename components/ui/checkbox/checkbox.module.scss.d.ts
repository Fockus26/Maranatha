export type Styles = {
  'accent': string;
  'checkbox': string;
  'control': string;
  'error': string;
  'primary': string;
  'secondary': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
