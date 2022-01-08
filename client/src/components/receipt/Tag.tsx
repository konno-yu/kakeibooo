import { AiFillShopping } from "react-icons/ai";
import { FaCircle, FaTrashAlt } from "react-icons/fa";
import { HiCurrencyYen } from "react-icons/hi";
import styled from "styled-components";
import { IconButton } from "../common/IconButton";
import { Input } from "../common/Input";

export const Tag: React.FC = () => {
    return (
        <Container>
            <LabelPart>
                <FaCircle color="#F5F5F5" size={12} />
            </LabelPart>
            <InputPart>
                <Input placeholder="店舗名を入力してください" icon={<AiFillShopping size={18} color="#9E9E9E" />}/>
                <Input placeholder="使った金額を入力してください" icon={<HiCurrencyYen size={18} color="#9E9E9E" />}/>
            </InputPart>
            <DeletePart>
                <IconButton>
                    <FaTrashAlt size={20} color="#546E7A"/>
                </IconButton>
            </DeletePart>
        </Container>
    );
}

const Container = styled.div`
    height: 18%;
    background: #F5F5F5;
    display: flex;
    width: 320px;
    justify-content: space-between;
    gap: 4px
`;

const LabelPart = styled.div`
    width: 10%;
    background: #4DB6AC;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputPart = styled.div`
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px;
    gap: 4px;
`;

const DeletePart = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`