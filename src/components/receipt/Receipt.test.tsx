/** @jest-environment jsdom */

import { composeStories } from '@storybook/testing-react';
import { useReceipt, UseReceiptReturnType } from './useReceipt';
import { render } from '../../test-utils';
import * as ReceiptStories from './Receipt.stories';

const {
  ClickAddReceipt,
  ClickAddReceiptDisabled,
  ClickRegist,
  ClickRegistDisabled,
  ClickNoMoney,
  ClickNoMoneyDisabled,
} = composeStories(ReceiptStories);

jest.mock('./useReceipt');

// TODO もっとよいやり方がある...？
const mockResponse: UseReceiptReturnType = {
  dailyReceipt: [],
  snackbarStatus: { open: false, text: '', type: 'error' },
  calcSummartion: jest.fn(),
  onReceiptAdd: jest.fn(),
  onChangeStoreName: jest.fn(),
  onChangeCost: jest.fn(),
  onReceiptDelete: jest.fn(),
  showSnackbar: jest.fn(),
  cannotAddReceipt: false,
  cannotRegistReceipt: false,
  cannotRegistNoMoney: false,
  validate: jest.fn(),
};

describe('Receiptコンポーネント', () => {
  const useReceiptSpy = jest.spyOn({ useReceipt }, 'useReceipt');
  it('レシートが3枚以下の場合、「レシートを追加」をクリックするとメソッドが呼ばれる', async () => {
    const clickListener = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockResponse, onReceiptAdd: clickListener });
    const { container } = render(<ClickAddReceipt />);
    await ClickAddReceipt.play({ canvasElement: container });
    expect(clickListener).toHaveBeenCalled();
  });
  it('レシートが4枚の場合、「レシートを追加」をクリックしてもメソッドは呼ばれない', async () => {
    const clickListener = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotAddReceipt: true, onReceiptAdd: clickListener });
    const { container } = render(<ClickAddReceiptDisabled />);
    await ClickAddReceiptDisabled.play({ canvasElement: container });
    expect(clickListener).not.toHaveBeenCalled();
  });
  // it('レシートが1枚以上ある場合、「食費を登録」をクリックするとメソッドが呼ばれる', async () => {
  //   const clickListener = jest.fn();
  //   useReceiptSpy.mockReturnValue({ ...mockResponse, onR: clickListener });
  //   const { container } = render(<ClickRegist />);
  //   await ClickAddReceiptDisabled.play({ canvasElement: container });
  //   expect(clickListener).not.toHaveBeenCalled();
  // });
  afterEach(() => {
    useReceiptSpy.mockClear();
  });
});
