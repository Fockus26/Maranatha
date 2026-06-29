export type Styles = {
  'footer': string;
  'hamburger': string;
  'header': string;
  'logo': string;
  'navigation': string;
  'overlay': string;
  'overlayOpen': string;
  'sidebar': string;
  'sidebarOpen': string;
  'subtitle': string;
  'title': string;
  'version': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
