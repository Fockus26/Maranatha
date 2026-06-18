export type Styles = {
  'active': string;
  'eventCard': string;
  'heroSlideContent': string;
  'slideLeft': string;
  'slideRight': string;
  'socialCard': string;
  'valueCard': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
