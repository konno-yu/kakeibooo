import { TiChevronLeft, TiChevronRight } from "react-icons/ti"
import styled from "styled-components"
import { Button } from "../../common/button/Button"
import { IconButton } from "../../common/icon_button/IconButton"
import { WeekMemoEditor } from "../week_memo_editor/WeekMemoEditor"
import { WeekSummary } from "../week_summary/WeekSummary"
import { WeekTransition } from "../week_transition/WeekTransition"

export const WeekDisplay: React.FC = () => {
    return (
        <Container>
            <SummaryContainer>
                <IconButton onClick={() => alert("前の月へ")}><TiChevronLeft size={28} color='#546E7A'/></IconButton>
                <WeekSummary />
                <IconButton onClick={() => alert("次の月へ")}><TiChevronRight size={28} color='#546E7A'/></IconButton>
            </SummaryContainer>
            <WeekTransition
                dates={[1, 2, 3, 4, 5, 6, 7]}
                types={['low', 'high', 'normal', 'zero', 'normal', 'high', 'low']}
            />
            <MemoContainer>
                <WeekMemoEditor value="サンプル" />
                <ButtonContainer>
                    <Button onClick={() => alert("メモ保存")} variant="filled" color="normal" label="保存" width="20%"></Button>
                    <Button onClick={() => alert("メモ削除")} variant="outlined" color="normal" label="削除" width="20%"></Button>
                </ButtonContainer>
            </MemoContainer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SummaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const MemoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
const ButtonContainer = styled.div`
    display: flex;
    gap: 4px;
    justify-content: end;
`