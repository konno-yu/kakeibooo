import styled from "styled-components"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from "@material-ui/core";
import { FaSave } from "react-icons/fa";

const COLOR_MAP = [
    '#333333', '#F44336', '#FF5742', '#FFC107', '#009688', '#2196F3', '#9C27B0',
    '#FFFFFF', '#EF9A9A', '#FFBB91', '#FFE082', '#80CBCA', '#90CAF9', '#CF93D8',
    '#BDBDBD', '#C62828', '#D84315', '#FF8F00', '#00695C', '#1565C0', '#6A1B9A',
]

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': COLOR_MAP }, { 'background': COLOR_MAP }],
        ['clean'],
    ]
}

interface Props {
    memoText: string;
    onChange: (value: string) => void;
    onSave: () => void;
}

export const MemoEditor: React.FC<Props> = (props) => {
    return (
        <S.Root>
            <S.Quill placeholder={'1週間のメモを残しておきしょう！\n（ 例： 献立、 気付いたこと など）'} value={props.memoText} onChange={props.onChange} modules={modules} />
            <S.SaveButton  onClick={props.onSave}>
                <S.SaveIcon/>保存
            </S.SaveButton>
        </S.Root>
    )
}

const S = {
    Root: styled.div`
        display: flex;
        flex-direction: column;
    `,
    Quill: styled(ReactQuill)`
        .ql-toolbar {
            background: #FFFFFF;
            border: 1px solid #BDBDBD;
            border-radius: 4px 4px 0 0;
        }
        .ql-container {
            background: #FFFFFF;
            border: 1px solid #BDBDBD;
            border-top: none;
            border-radius: 0 0 4px 4px;
            min-height: 300px;
            max-height: 300px;
            font-family: "M PLUS Rounded 1c", sans-serif;
            color: #333;
        }
    `,
    SaveButton: styled(Button)`
        width: 25%;
        background: #546E7A;
        color: #FFFFFF;
        border-radius: 100px;
        margin-top: 4px;
        font-weight: 700;
        align-self: flex-end;
        &:hover {
            background: '#546E7A';
            opacity: 0.7;
        }
    `,
    SaveIcon: styled(FaSave)`
        margin-right: 8px;
    `
}