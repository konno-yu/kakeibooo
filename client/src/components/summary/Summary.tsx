import { AiOutlineShoppingCart, AiOutlineCalendar } from 'react-icons/ai';
import { FaRegFrownOpen, FaRegGrinSquint, FaRegMeh, FaRegSmile } from 'react-icons/fa';
import styled from 'styled-components';
import { Indicator } from '../common/Indicator';
import { Card } from './Card';
import { CardBody } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { CardSubText } from './CardSubText';
import { CardText } from './CardText';
import { SummaryHeader } from './SummaryHeader';
export const Summary: React.FC = () => {
    return (
        <S.Summary>
            <SummaryHeader/>
            <S.MonthlyReport>
                <Card width={45}>
                    <CardHeader title="今月の食費" icon={<AiOutlineShoppingCart color="#FFF" size={24} />} color="#546E7A" />
                    <CardBody>
                        <CardText unit={{ type: "prefix", name: "¥" }}>12,000</CardText>
                        <CardSubText>（１日あたり¥1,200）</CardSubText>
                    </CardBody>
                    <CardFooter>
                        <Indicator range={[0, 40000]} value={[3650]} color={["#546E7A"]} withLabel />
                    </CardFooter>
                </Card>
                <Card width={45}>
                    <CardHeader title="今月の内訳" icon={<AiOutlineCalendar color="#FFF" size={24} />} color="#546E7A" />
                    <CardBody>
                        <S.BreakdownContainer>
                            <S.BreakdownCard color="#fff59d">
                                <FaRegGrinSquint size={20}/>
                                <S.BreakdownCardText>
                                    7<S.BreakdownCardUnit>日</S.BreakdownCardUnit>
                                </S.BreakdownCardText>
                            </S.BreakdownCard>
                            <S.BreakdownCard color='#80cbc4'>
                                <FaRegSmile size={20} />
                                <S.BreakdownCardText>
                                    8<S.BreakdownCardUnit>日</S.BreakdownCardUnit>
                                </S.BreakdownCardText>
                            </S.BreakdownCard>
                            <S.BreakdownCard color='#E0E0E0'>
                                <FaRegMeh size={20}/>
                                <S.BreakdownCardText>
                                    9<S.BreakdownCardUnit>日</S.BreakdownCardUnit>
                                </S.BreakdownCardText>
                            </S.BreakdownCard>
                            <S.BreakdownCard color='#EF9A9A'>
                                <FaRegFrownOpen size={20}/>
                                <S.BreakdownCardText>
                                    10<S.BreakdownCardUnit>日</S.BreakdownCardUnit>
                                </S.BreakdownCardText>
                            </S.BreakdownCard>
                        </S.BreakdownContainer>
                    </CardBody>
                    <CardFooter>
                        <Indicator range={[0, 31]} value={[5, 6, 7, 8]} color={["#fff176", "#4db6ac", "#e0e0e0", "#e57373"]} withLabel />
                    </CardFooter>
                </Card>
            </S.MonthlyReport>
        </S.Summary>
    )
}

const S = {
    Summary: styled.div`
        width: 70%;
        height: calc(100vh - 48px);
        padding: 12px;
        border-right: 1px solid #BDBDBD;
        display: flex;
        flex-direction: column;
    `,
    MonthlyReport: styled.div`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: flex-start;
        flex-wrap: wrap;
        gap: 10px 0;
    `,
    BreakdownContainer: styled.div`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    `,
    BreakdownCard: styled.div<{ color: string }>`
        ${({color}) => `color: ${color}`};
        width: 20%;
        height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        background: #546E7A;
        padding: 4px 4px 0 4px;
    `,
    BreakdownCardText: styled.div`
        font-size: 16pt;
        font-weight: 700;
    `,
    BreakdownCardUnit: styled.span`
        font-size: 10pt;
    `
}