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
  fontWeights: {
    thin: 400,
    semiBold: 600,
    bold: 700,
    extraBold: 900,
  },
  units: {
    px0: '0px',
    px2: '2px',
    px4: '4px',
    px8: '8px',
    px10: '10px',
    px12: '12px',
    px16: '16px',
    px20: '20px',
    px24: '24px',
  },
};

// TODO ライトテーマ以外が入ると破綻する
export type Colors = keyof typeof light['colors'];
export type FontSizes = keyof typeof light['fontSizes'];
export type FontWeights = keyof typeof light['fontWeights'];
export type Units = keyof typeof light['units'];
