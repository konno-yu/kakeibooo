import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { css } from '@emotion/react';

interface Props {
  value: string;
}

const COLOR_MAP = [
  '#333333',
  '#F44336',
  '#FF5742',
  '#FFC107',
  '#009688',
  '#2196F3',
  '#9C27B0',
  '#FFFFFF',
  '#EF9A9A',
  '#FFBB91',
  '#FFE082',
  '#80CBCA',
  '#90CAF9',
  '#CF93D8',
  '#BDBDBD',
  '#C62828',
  '#D84315',
  '#FF8F00',
  '#00695C',
  '#1565C0',
  '#6A1B9A',
];

const modules = {
  toolbar: [['bold', 'italic', 'underline', 'strike'], [{ color: COLOR_MAP }, { background: COLOR_MAP }], ['clean']],
};

export const WeekMemoEditor = ({ value }: Props) => (
  <div css={container}>
    <ReactQuill
      css={myQuill}
      placeholder={'1週間のメモを残しておきしょう！\n（ 例： 献立、 気付いたこと など）'}
      value={value}
      modules={modules}
    />
  </div>
);

const container = css`
  display: flex;
  flex-direction: column;
`;

const myQuill = css`
  .ql-toolbar {
    background: #ffffff;
    border: 1px solid #bdbdbd;
    border-radius: 4px 4px 0 0;
  }
  .ql-container {
    font-family: 'M PLUS Rounded 1c', sans-serif;
    background: #ffffff;
    border: 1px solid #bdbdbd;
    border-top: none;
    border-radius: 0 0 4px 4px;
    min-height: 300px;
    max-height: 300px;
    color: #333333;
  }
`;
