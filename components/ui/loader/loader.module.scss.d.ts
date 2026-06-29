export type Styles = {
  'loader': string;
  'loaderContainer': string;
  'loaderText': string;
  'spin': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
