import { css, Theme, useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { AiFillShopping } from 'react-icons/ai';
import { FaCircle } from 'react-icons/fa';
import { HiCurrencyYen } from 'react-icons/hi';
import { RiDeleteBack2Fill } from 'react-icons/ri';
import { FlexBox } from '../../common/flex_box/FlexBox';
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

export const Tag = ({ index, storeName, cost, onChangeStoreName, onChangeCost, onDelete, ...props }: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();
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
    <FlexBox direction='row' justifyContent='space-between' gap={4} css={container(theme)} {...props}>
      <FlexBox direction='row' justifyContent='center' alignItems='center' css={label(theme)}>
        <FaCircle color={theme.colors.white} size={12} />
      </FlexBox>
      <FlexBox direction="column" justifyContent='center' alignItems='center' gap={4} css={input(theme)}>
        <Input
          onChange={handleStoreNameChange}
          width={150}
          value={storeName}
          placeholder={t('calendar.store_name')}
          icon={<AiFillShopping size={16} color={theme.colors.black_400} />}
        />
        <Input
          onChange={handleCostChange}
          width={150}
          value={cost}
          placeholder={t('calendar.using_expense')}
          icon={<HiCurrencyYen size={16} color={theme.colors.black_400} />}
        />
      </FlexBox>
      <FlexBox direction="row" justifyContent='center' alignItems='center' css={dustbox}>
        <IconButton onClick={handleDelete}>
          <RiDeleteBack2Fill size={20} color={theme.colors.black_400} />
        </IconButton>
      </div>
    </FlexBox>
  );
};

const container = (theme: Theme) => css`
  width: 100%;
  height: 18%;
  background: ${theme.colors.white};
`;

const label = (theme: Theme) => css`
  width: 10%;
  background: ${theme.colors.primary_400};
`;

const input = (theme: Theme) => css`
  width: 70%;
  padding: ${theme.units.px8};
`;

const dustbox = css`
  width: 20%;
`;
