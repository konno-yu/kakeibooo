import { HiPlusSm } from "react-icons/hi"
import styled from "styled-components"
import { addTag } from "../../reducer/householdBookSlice"
import { useAppDispatch, useAppSelector } from "../../store"
import { Button } from "../common/button/Button"
import { Divider } from "../common/divider/Divider"
import { Typography } from "../common/typography/Typography"
import { Tag } from "./tag/Tag"

export const Receipt: React.FC = () => {
    const tags = useAppSelector(state => state.householdBook.tags);
    const dispatch = useAppDispatch();
    const handleClickAdd = () => {
        dispatch(addTag())
    }

    const calcDailySummartion = () => {
        return `¥${tags.reduce((pre, current) => pre + current.cost, 0).toLocaleString()}`;
    }

    return (
        <Container>
            <Header>
                <Typography type="header" variant="normal">Kakeibooo</Typography>
                <Typography type="subHeader" variant="accent">2022/01/06</Typography>
            </Header>
            <Divider width={2} type="dashed" color="#CFD8DC" />
            <Body>
                <Tags>
                    {
                        tags.map(tag => (<Tag index={tag.index} storeName={tag.storeName} cost={tag.cost}/>))
                    }
                        <Button disabled={tags.length >= 4} onClick={handleClickAdd} width='80%' variant="outlined" color="normal" label="レシートを追加" icon={<HiPlusSm />} />
                </Tags>
                <Summartion>
                    <Typography type="subHeader" variant="normal">合計</Typography>
                    <Typography type="header" variant="normal">{calcDailySummartion()}</Typography>
                </Summartion>
            </Body>
            <Divider width={2} type="dashed" color="#CFD8DC" />
            <Footer>
                <Button onClick={() => alert("reg")} width='80%' variant="filled" color="normal" label="食費を登録" />
                <Button onClick={() => alert("NMD")}width='80%' variant="filled" color="accent" label="Noマネーディとして登録" />
            </Footer>
        </Container>
    )
}

const Container = styled.div`
    height: calc(100vh - 24px);
    width: 25%;
    background: #FFFFFF;
    border: 2px solid #ECEFF1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Header = styled.div`
    height: 10%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`;

const Body = styled.div`
    height: 70%;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Tags = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

const Summartion = styled.div`
    width: calc(100% - 16px);
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Footer = styled.div`
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
`