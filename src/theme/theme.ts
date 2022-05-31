/** いったんライトテーマということにしておく */
export const light = {
    colors: {
        primary: '#FB836F',
        secondary: '#6667AB',
        font: '#3A3A3A',  // メインのフォント色
        gray: '#EEEEEE', // 濃いグレー、枠線での利用を想定
        paleGray: '#F6F6F6', // 薄いグレー
        white: '#FFFFFF'
    },
}

// TODO ライトテーマ以外が入ると破綻する
export type Colors = keyof typeof light['colors'];