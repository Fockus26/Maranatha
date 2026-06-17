export type Styles = {
  'amounts': string;
  'bulkActions': string;
  'card': string;
  'category': string;
  'checkbox': string;
  'completed': string;
  'container': string;
  'content': string;
  'filters': string;
  'grid': string;
  'header': string;
  'image': string;
  'imageWrapper': string;
  'inProgress': string;
  'menu': string;
  'primaryButton': string;
  'progressFill': string;
  'progressTrack': string;
  'progressWrapper': string;
  'selected': string;
  'status': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
