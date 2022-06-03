/** いったんライトテーマということにしておく */
export const light = {
    colors: {
        primary: '#FB836F',
        pPrimary: '#fb836f80',
        secondary: '#6667AB',
        font: '#3A3A3A',
        vGray: '#AAAAAA',
        gray: '#EEEEEE',
        pGray: '#F6F6F6',
        white: '#FFFFFF'
    },
}

// TODO ライトテーマ以外が入ると破綻する
export type Colors = keyof typeof light['colors'];