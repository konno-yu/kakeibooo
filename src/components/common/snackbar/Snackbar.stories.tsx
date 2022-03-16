import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Snackbar } from './Snackbar';

export default { component: Snackbar } as ComponentMeta<typeof Snackbar>;

export const Success: ComponentStoryObj<typeof Snackbar> = {
  args: {
    type: 'success',
    text: '登録に成功しました',
  },
};

export const Error: ComponentStoryObj<typeof Snackbar> = {
  args: {
    type: 'error',
    text: '登録に失敗しました',
  },
};

export const ErrorWithDetails: ComponentStoryObj<typeof Snackbar> = {
  args: {
    type: 'error',
    text: '登録に失敗しました',
    subText: '食費は入力されていますか？',
  },
};
