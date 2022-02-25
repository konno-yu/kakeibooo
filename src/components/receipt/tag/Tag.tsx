import { AiFillShopping } from 'react-icons/ai';
import { FaCircle, FaTrashAlt } from 'react-icons/fa';
import { HiCurrencyYen } from 'react-icons/hi';
import styled from 'styled-components';
import { inputCost, inputStoreName, deleteTag } from '../../../reducer/householdBookSlice';
import { useAppDispatch } from '../../../store';
import { IconButton } from '../../common/icon_button/IconButton';
import { Input } from '../../common/input/Input';

interface Props {
  index: number;
  storeName: string;
  cost: number;
}

export const Tag = ({ index, storeName, cost }: Props) => {
  const dispatch = useAppDispatch();

  const handleStoreNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputStoreName({ index, storeName: event.target.value }));
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(inputCost({ index, cost: +event.target.value }));
  };

  const handleDelete = () => {
    dispatch(deleteTag(index));
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
