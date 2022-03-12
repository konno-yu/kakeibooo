import { AiFillShopping } from 'react-icons/ai';
import { FaCircle, FaTrashAlt } from 'react-icons/fa';
import { HiCurrencyYen } from 'react-icons/hi';
import styled from 'styled-components';
import { IconButton } from '../../common/icon_button/IconButton';
import { Input } from '../../common/input/Input';

interface Props {
  index: number;
  storeName: string;
  cost: number;
  onChangeStoreName: (index: number, storeName: string) => void;
  onChangeCost: (index: number, cost: number) => void;
  onDelete: (index: number) => void;
}

export const Tag = ({ index, storeName, cost, onChangeStoreName, onChangeCost, onDelete }: Props) => {
  const handleStoreNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeStoreName(index, event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeCost(index, +event.target.value);
  };

  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <Container>
      <LabelPart>
        <FaCircle color="#F5F5F5" size={12} />
      </LabelPart>
      <InputPart>
        <Input
          onChange={handleStoreNameChange}
          width={150}
          value={storeName}
          placeholder="店舗名"
          icon={<AiFillShopping size={16} color="#9E9E9E" />}
        />
        <Input
          onChange={handleCostChange}
          width={150}
          value={cost}
          placeholder="使った金額"
          icon={<HiCurrencyYen size={16} color="#9E9E9E" />}
        />
      </InputPart>
      <DeletePart>
        <IconButton onClick={handleDelete}>
          <FaTrashAlt size={20} color="#546E7A" />
        </IconButton>
      </DeletePart>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 18%;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const LabelPart = styled.div`
  width: 10%;
  background: #4db6ac;
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
`;
