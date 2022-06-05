/** いったんライトテーマということにしておく */
export const light = {
  colors: {
    primary: '#FB836F',
    palePrimary: '#FF9B8A',
    secondary: '#6667AB',
    paleSecondary: '#8587DE',
    font: '#3A3A3A',
    paleFont: '#6A6A6A',
    vividGray: '#AAAAAA',
    gray: '#EEEEEE',
    paleGray: '#F6F6F6',
    white: '#FFFFFF',
  },
  fontSizes: {
    pt24: '24pt',
    pt18: '18pt',
    pt16: '16pt',
    pt12: '12pt',
    pt10: '10pt',
    pt08: '8pt',
  },
};

// TODO ライトテーマ以外が入ると破綻する
export type Colors = keyof typeof light['colors'];
export type FontSizes = keyof typeof light['fontSizes'];
