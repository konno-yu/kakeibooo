/** @jest-environment jsdom */

import { composeStories } from '@storybook/testing-react';
import { useReceipt, UseReceiptReturnType } from './useReceipt';
import { render } from '../../test-utils';
import * as ReceiptStories from './Receipt.stories';

jest.mock('./useReceipt');

describe('Receiptコンポーネント', () => {
  const {
    ClickAddReceipt,
    ClickAddReceiptDisabled,
    ClickRegist,
    ClickRegistWithDefect,
    ClickRegistDisabled,
    ClickNoMoney,
    ClickNoMoneyDisabled,
  } = composeStories(ReceiptStories);
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
  it('正しく入力されたレシートが1枚以上ある場合、「食費を登録」をクリックするとメソッドが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotRegistReceipt: false, validate: () => ({ isOk: true }) });
    const { container } = render(<ClickRegist onClickRegist={mockOnClick} />);
    await ClickRegist.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalled();
  });
  it('入力不備のレシートが1枚でもある場合、「食費を登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotRegistReceipt: true, validate: () => ({ isOk: false }) });
    const { container } = render(<ClickRegistWithDefect onClickRegist={mockOnClick} />);
    await ClickRegistWithDefect.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  it('レシートが1枚もない場合、「食費を登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotRegistReceipt: true, validate: () => ({ isOk: false }) });
    const { container } = render(<ClickRegistDisabled onClickRegist={mockOnClick} />);
    await ClickRegistDisabled.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  it('レシートが1枚もない場合、「Noマネーデイとして登録」をクリックするとメソッドが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotRegistNoMoney: false });
    const { container } = render(<ClickNoMoney onClickNoMoney={mockOnClick} />);
    await ClickNoMoney.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalled();
  });
  it('レシートが1枚でも存在する場合、「Noマネーデイとして登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({ ...mockResponse, cannotRegistNoMoney: true });
    const { container } = render(<ClickNoMoneyDisabled onClickNoMoney={mockOnClick} />);
    await ClickNoMoneyDisabled.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  afterEach(() => {
    useReceiptSpy.mockClear();
  });
});
