import { css } from '@emotion/react';
import { AiFillShopping } from 'react-icons/ai';
import { FaCircle, FaTrashAlt } from 'react-icons/fa';
import { HiCurrencyYen } from 'react-icons/hi';
import { IconButton } from '../../common/icon_button/IconButton';
import { Input } from '../../common/input/Input';

interface Props {
  /** レシート内のタグの順序を指定します */
  index: number;
  /** 店舗名を指定します */
  storeName: string;
  /** 食費を指定します */
  cost: number;
  /** 店舗名が変更されたときのイベントを指定します */
  onChangeStoreName: (index: number, storeName: string) => void;
  /** 食費が変更されたときのイベントを指定します */
  onChangeCost: (index: number, cost: number) => void;
  /** タグが削除されたときのイベントを指定します */
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
    <div css={container}>
      <div css={label}>
        <FaCircle color="#F5F5F5" size={12} />
      </div>
      <div css={input}>
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
      </div>
      <div css={dustbox}>
        <IconButton onClick={handleDelete}>
          <FaTrashAlt size={20} color="#546E7A" />
        </IconButton>
      </div>
    </div>
  );
};

const container = css`
  width: 100%;
  height: 18%;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const label = css`
  width: 10%;
  background: #4db6ac;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const input = css`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8px;
  gap: 4px;
`;

const dustbox = css`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
