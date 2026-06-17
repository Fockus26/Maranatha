export type Styles = {
  'footer': string;
  'header': string;
  'logo': string;
  'navigation': string;
  'navItem': string;
  'sidebar': string;
  'subtitle': string;
  'title': string;
  'version': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
