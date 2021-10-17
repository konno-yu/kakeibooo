import styled from "styled-components";

interface TextProps {
    unit?: {
        type: 'prefix' | 'suffix';
        name: '¥' | '日'
    }
}

//todo 予算上限、月の日数に応じて変化させる必要あり
const RANGE_BY_UNIT: { [key in '¥' | '日']: [number, number] } = { '¥': [0, 40000], '日': [0, 31] };
export const CardText: React.FC<TextProps> = (props) => {

    if (!props.unit) {
        return <S.CardBodyText>{props.children}</S.CardBodyText>
    }

    const valueWithUnit = props.unit.type === "prefix" ?
        `${props.unit.name}${props.children.toLocaleString()}` :
        `${props.children.toLocaleString()}${props.unit.name}`;

    return (
        <S.CardBodyText>{valueWithUnit}</S.CardBodyText>
    )
}

const S = {
    CardBodyText: styled.div`
        color: #546E7A;
        font-weight: 800;
        font-size: 36px;
    `
}