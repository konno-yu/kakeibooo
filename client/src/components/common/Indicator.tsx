import styled from "styled-components"

interface IndicatorProps {
    value: number[];
    color: string[];
    range: [number, number];
    withLabel: boolean;
}

export const Indicator: React.FC<IndicatorProps> = (props) => {
    const valueSummation = props.value.reduce((prev, current) => prev + current);
    const isLimitOver = valueSummation > props.range[1];
    const displayValues: number[] = [];
    const displayColors: string[] = [];

    props.value.forEach((v, i) => {
        // 0以上の値と色だけに絞る
        if (v === 0) return;
        displayValues.push(v / props.range[1] * 100);
        displayColors.push(props.color[i]);
    });

    if (isLimitOver) {
        return (
            <S.IndicatorRoot>
                { props.withLabel && <S.IndicatorScaleText>{props.range[0]}</S.IndicatorScaleText> }
                    <S.IndicatorContainer>
                        <S.LimitOverBar />
                    </S.IndicatorContainer>
                { props.withLabel && <S.IndicatorScaleText>{props.range[1]}</S.IndicatorScaleText> }
            </S.IndicatorRoot>
        );
    }

    return (
        <S.IndicatorRoot>
            { props.withLabel && <S.IndicatorScaleText>{props.range[0]}</S.IndicatorScaleText> }
                <S.IndicatorContainer>
                    {
                        displayValues.map((v, i) => {
                            if (displayValues.length === 1) return <S.Bar width={v} color={displayColors[i]} isFirst isLast />
                            if (i === displayValues.length - 1) return <S.Bar width={v} color={displayColors[i]} isLast />
                            if (i === 0) return <S.Bar width={v} color={displayColors[i]} isFirst />;
                            return <S.Bar width={v} color={displayColors[i]} />
                        })
                    }
                </S.IndicatorContainer>
            { props.withLabel && <S.IndicatorScaleText>{props.range[1]}</S.IndicatorScaleText> }
        </S.IndicatorRoot>
    )
}

const S = {
    IndicatorRoot: styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    `,
    IndicatorContainer: styled.div`
        width: 80%;
        height: 30%;
        background: #ECEFF1;
        border-radius: 12px;
        display: flex;
    `,
    LimitOverBar: styled.div`
        width: 100%;
        height: 100%;
        background: #FF5252;
        border-radius: 12px;
    `,
    Bar: styled.div<{ width: number, color: string, isFirst?: boolean, isLast?: boolean }>`
        ${({width}) => `width: ${width}%`};
        height: 100%;
        ${({ color }) => `background: ${color}`};
        ${({ isFirst, isLast }) => isFirst && isLast ? `border-radius: 12px;` : isFirst ? `border-radius: 12px 0 0 12px;` : isLast ? `border-radius: 0 12px 12px 0;` : `border-radius: 0;`}
    `,
    IndicatorScaleText: styled.span`
        color: #546E7A;
        font-weight: 700;
        font-size: 12px;
    `
}