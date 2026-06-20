export type Styles = {
  'card': string;
  'expandable': string;
  'image': string;
  'imageWrapper': string;
  'info': string;
  'placeholder': string;
  'role': string;
  'social': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
