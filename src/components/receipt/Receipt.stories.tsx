import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { Receipt } from './Receipt';

export default { component: Receipt } as ComponentMeta<typeof Receipt>;

export const Pure: ComponentStoryObj<typeof Receipt> = {
  args: {
    receipts: [],
    targetDate: new Date(2022, 0, 1, 9, 0, 0),
  },
  decorators: [
    (story) => (
      <div
        css={css`
          width: 25%;
        `}
      >
        {story()}
      </div>
    ),
  ],
};

export const ClickAddReceipt: ComponentStoryObj<typeof Receipt> = {
  args: Pure.args,
  decorators: Pure.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('btn-add'));
  },
};

export const ClickAddReceiptDisabled: ComponentStoryObj<typeof Receipt> = {
  args: {
    ...Pure.args,
    receipts: [
      { index: 1, storeName: '1', cost: 1000 },
      { index: 2, storeName: '2', cost: 2000 },
      { index: 3, storeName: '3', cost: 3000 },
      { index: 4, storeName: '4', cost: 4000 },
    ],
  },
  decorators: Pure.decorators,
  play: ClickAddReceipt.play,
};

export const ClickRegist: ComponentStoryObj<typeof Receipt> = {
  args: {
    ...Pure.args,
    receipts: [{ index: 1, storeName: '1', cost: 100 }],
  },
  decorators: Pure.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('btn-regist'));
  },
};

export const ClickRegistDisabled: ComponentStoryObj<typeof Receipt> = {
  args: Pure.args,
  decorators: Pure.decorators,
  play: ClickRegist.play,
};

export const ClickNoMoney: ComponentStoryObj<typeof Receipt> = {
  args: Pure.args,
  decorators: Pure.decorators,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('btn-no-money'));
  },
};

export const ClickNoMoneyDisabled: ComponentStoryObj<typeof Receipt> = {
  args: {
    ...Pure.args,
    receipts: [{ index: 1, storeName: 'a', cost: 1000 }],
  },
  decorators: Pure.decorators,
  play: ClickNoMoney.play,
};
