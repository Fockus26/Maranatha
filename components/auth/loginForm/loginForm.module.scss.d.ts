export type Styles = {
  'container': string;
  'description': string;
  'error': string;
  'field': string;
  'form': string;
  'header': string;
  'label': string;
  'separator': string;
  'title': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
