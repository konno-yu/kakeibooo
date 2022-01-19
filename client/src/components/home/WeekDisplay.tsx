import { TiChevronLeft, TiChevronRight } from "react-icons/ti"
import styled from "styled-components"
import { Button } from "../common/Button"
import { IconButton } from "../common/IconButton"
import { WeekMemoEditor } from "./WeekMemoEditor"
import { WeekSummary } from "./WeekSummary"
import { WeekTransition } from "./WeekTransition"

export const WeekDisplay: React.FC = () => {
    return (
        <Container>
            <SummaryContainer>
                <IconButton><TiChevronLeft size={28} color='#546E7A'/></IconButton>
                <WeekSummary />
                <IconButton><TiChevronRight size={28} color='#546E7A'/></IconButton>
            </SummaryContainer>
            <WeekTransition
                dates={[1, 2, 3, 4, 5, 6, 7]}
                types={['low', 'high', 'normal', 'zero', 'normal', 'high', 'low']}
            />
            <MemoContainer>
                <WeekMemoEditor value="サンプル" />
                <ButtonContainer>
                    <Button variant="filled" color="normal" label="保存" width="20%"></Button>
                    <Button variant="outlined" color="normal" label="削除" width="20%"></Button>
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