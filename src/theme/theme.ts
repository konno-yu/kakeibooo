/** いったんライトテーマということにしておく */
export const light = {
  colors: {
    primary_400: '#FB836F',
    primary_300: '#FA9887',
    primary_200: '#FAADA0',
    primary_100: '#FAC3B9',
    secondary_400: '#6667AB',
    secondary_300: '#898AC4',
    secondary_200: '#B1B2DE',
    secondary_100: '#DFDFF7',
    black_400: '#3A3A3A',
    black_300: '#545454',
    black_200: '#6E6E6E',
    black_100: '#878787',
    gray_400: '#AAAAAA',
    gray_300: '#C4C4C4',
    gray_200: '#DEDEDE',
    gray_100: '#F6F6F6',
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
