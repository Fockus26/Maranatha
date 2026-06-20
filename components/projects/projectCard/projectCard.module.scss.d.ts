export type Styles = {
  'amounts': string;
  'card': string;
  'checkbox': string;
  'content': string;
  'contentBody': string;
  'image': string;
  'imageWrapper': string;
  'menu': string;
  'menuWrapper': string;
  'progressComplete': string;
  'progressFill': string;
  'progressTrack': string;
  'progressWrapper': string;
  'selected': string;
  'status': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
