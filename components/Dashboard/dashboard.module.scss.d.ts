export type Styles = {
  'content': string;
  'dashboard': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
