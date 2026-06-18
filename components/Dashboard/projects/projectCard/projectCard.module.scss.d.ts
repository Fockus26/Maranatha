export type Styles = {
  'amounts': string;
  'card': string;
  'category': string;
  'checkbox': string;
  'completed': string;
  'content': string;
  'contentBody': string;
  'image': string;
  'imageWrapper': string;
  'inProgress': string;
  'menu': string;
  'menuWrapper': string;
  'progressComplete': string;
  'progressFill': string;
  'progressTrack': string;
  'progressWrapper': string;
  'selected': string;
  'selectionMode': string;
  'status': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
