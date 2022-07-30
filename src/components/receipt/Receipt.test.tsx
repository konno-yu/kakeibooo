/** @jest-environment jsdom */

import { composeStories } from '@storybook/testing-react';
import { useReceipt, UseReceiptReturnType } from './useReceipt';
import { render } from '../../test-utils';
import * as ReceiptStories from './Receipt.stories';
import { useSnackbar, UseSnackbarReturnType } from '../common/snackbar/useSnackbar';

jest.mock('./useReceipt');
jest.mock('../common/snackbar/useSnackbar');

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
  const mockUseReceipt: UseReceiptReturnType = {
    dailyReceipt: [],
    calcSummartion: jest.fn(),
    onReceiptAdd: jest.fn(),
    onChangeStoreName: jest.fn(),
    onChangeCost: jest.fn(),
    onReceiptDelete: jest.fn(),
    cannotAddReceipt: false,
    cannotRegistReceipt: false,
    cannotRegistNoMoney: false,
    validate: jest.fn(),
  };
  const mockUseSnackbar: UseSnackbarReturnType = {
    isOpen: false,
    type: 'success',
    text: '',
    subText: '',
    setIsOpen: jest.fn(),
    setSnackbarDetails: jest.fn(),
  };
  const useReceiptSpy = jest.spyOn({ useReceipt }, 'useReceipt');
  const useSnackbarSpy = jest.spyOn({ useSnackbar }, 'useSnackbar');
  it('レシートが3枚以下の場合、「レシートを追加」をクリックするとメソッドが呼ばれる', async () => {
    const clickListener = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockUseReceipt, onReceiptAdd: clickListener });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickAddReceipt />);
    await ClickAddReceipt.play({ canvasElement: container });
    expect(clickListener).toHaveBeenCalled();
  });
  it('レシートが4枚の場合、「レシートを追加」をクリックしてもメソッドは呼ばれない', async () => {
    const clickListener = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockUseReceipt, cannotAddReceipt: true, onReceiptAdd: clickListener });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickAddReceiptDisabled />);
    await ClickAddReceiptDisabled.play({ canvasElement: container });
    expect(clickListener).not.toHaveBeenCalled();
  });
  it('正しく入力されたレシートが1枚以上ある場合、「食費を登録」をクリックするとメソッドが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({
      ...mockUseReceipt,
      cannotRegistReceipt: false,
      validate: () => ({ isOk: true, text: '', subText: '' }),
    });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickRegist onClickRegist={mockOnClick} />);
    await ClickRegist.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalled();
  });
  it('入力不備のレシートが1枚でもある場合、「食費を登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({
      ...mockUseReceipt,
      cannotRegistReceipt: true,
      validate: () => ({ isOk: false, text: '', subText: '' }),
    });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickRegistWithDefect onClickRegist={mockOnClick} />);
    await ClickRegistWithDefect.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  it('レシートが1枚もない場合、「食費を登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({
      ...mockUseReceipt,
      cannotRegistReceipt: true,
      validate: () => ({ isOk: false, text: '', subText: '' }),
    });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickRegistDisabled onClickRegist={mockOnClick} />);
    await ClickRegistDisabled.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  it('レシートが1枚もない場合、「Noマネーデイとして登録」をクリックするとメソッドが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    useReceiptSpy.mockReturnValue({ ...mockUseReceipt, cannotRegistNoMoney: false });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickNoMoney onClickNoMoney={mockOnClick} />);
    await ClickNoMoney.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalled();
  });
  it('レシートが1枚でも存在する場合、「Noマネーデイとして登録」をクリックしてもメソッドは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    // TODO validateメソッドをカスタムフックから剥がせれば...
    useReceiptSpy.mockReturnValue({ ...mockUseReceipt, cannotRegistNoMoney: true });
    useSnackbarSpy.mockReturnValue(mockUseSnackbar);
    const { container } = render(<ClickNoMoneyDisabled onClickNoMoney={mockOnClick} />);
    await ClickNoMoneyDisabled.play({ canvasElement: container });
    expect(mockOnClick).not.toHaveBeenCalled();
  });
  afterEach(() => {
    useReceiptSpy.mockClear();
  });
});
