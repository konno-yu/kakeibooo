import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';
import styled from 'styled-components';
import { Button } from '../../common/button/Button';
import { IconButton } from '../../common/icon_button/IconButton';
import { WeekMemoEditor } from '../week_memo_editor/WeekMemoEditor';
import { WeekSummary } from '../week_summary/WeekSummary';
import { WeekTransition } from '../week_transition/WeekTransition';

export const WeekDisplay = () => {
  const handleClickPrevious = () => {
    /** */
  };
  const handleClickNext = () => {
    /** */
  };
  const handleClickSave = () => {
    /** */
  };
  const handleClickDelete = () => {
    /** */
  };
  return (
    <Container>
      <SummaryContainer>
        <IconButton onClick={handleClickPrevious}>
          <TiChevronLeft size={28} color="#546E7A" />
        </IconButton>
        <WeekSummary />
        <IconButton onClick={handleClickNext}>
          <TiChevronRight size={28} color="#546E7A" />
        </IconButton>
      </SummaryContainer>
      <WeekTransition
        dates={[1, 2, 3, 4, 5, 6, 7]}
        types={['low', 'high', 'normal', 'zero', 'normal', 'high', 'low']}
      />
      <MemoContainer>
        <WeekMemoEditor value="サンプル" />
        <ButtonContainer>
          <Button onClick={handleClickSave} variant="filled" color="normal" label="保存" width="20%" />
          <Button onClick={handleClickDelete} variant="outlined" color="normal" label="削除" width="20%" />
        </ButtonContainer>
      </MemoContainer>
    </Container>
  );
};

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
`;
