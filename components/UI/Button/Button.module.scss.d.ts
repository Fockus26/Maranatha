export type Styles = {
  'accent': string;
  'button': string;
  'error': string;
  'icon': string;
  'outline': string;
  'plain': string;
  'primary': string;
  'secondary': string;
  'soft': string;
  'solid': string;
  'success': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
