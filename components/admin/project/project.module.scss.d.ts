export type Styles = {
  'body': string;
  'card': string;
  'content': string;
  'description': string;
  'hero': string;
  'members': string;
  'metadata': string;
  'overlay': string;
  'project': string;
  'sidebar': string;
  'team': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
