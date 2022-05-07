import { css } from '@emotion/react';
import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';
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
    <div css={container}>
      <div css={summary}>
        <IconButton onClick={handleClickPrevious}>
          <TiChevronLeft size={28} color="#546E7A" />
        </IconButton>
        <WeekSummary />
        <IconButton onClick={handleClickNext}>
          <TiChevronRight size={28} color="#546E7A" />
        </IconButton>
      </div>
      <WeekTransition
        dates={[1, 2, 3, 4, 5, 6, 7]}
        types={['low', 'high', 'normal', 'zero', 'normal', 'high', 'low']}
      />
      <div css={memoEditor}>
        <WeekMemoEditor value="サンプル" />
        <div css={buttonContainer}>
          <Button onClick={handleClickSave} variant="filled" color="normal" label="保存" width="20%" />
          <Button onClick={handleClickDelete} variant="outlined" color="normal" label="削除" width="20%" />
        </div>
      </div>
    </div>
  );
};

const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const summary = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const memoEditor = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const buttonContainer = css`
  display: flex;
  gap: 4px;
  justify-content: end;
`;
