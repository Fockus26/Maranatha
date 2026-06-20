export type Styles = {
  'controls': string;
  'gallery': string;
  'slide': string;
  'track': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
