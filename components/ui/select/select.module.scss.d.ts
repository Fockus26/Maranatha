export type Styles = {
  'accent': string;
  'chevron': string;
  'chevronOpen': string;
  'disabled': string;
  'dropdown': string;
  'error': string;
  'field': string;
  'option': string;
  'optionSelected': string;
  'placeholder': string;
  'primary': string;
  'search': string;
  'secondary': string;
  'select': string;
  'success': string;
  'trigger': string;
  'value': string;
  'warning': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
