/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react-hooks';
import { useReceipt } from './useReceipt';

jest.mock('react-i18next', (): any => ({
  useTranslation: (): any => ({
    t: (key: string): string => key.toUpperCase(),
  }),
}));

describe('useReceipt', () => {
  test('onReceiptAddが呼ばれたらレシートが追加される（0 → 1）', () => {
    const { result } = renderHook(() => useReceipt([]));
    act(() => {
      result.current.onReceiptAdd();
    });
    expect(result.current.dailyReceipt.length).toBe(1);
  });
  test('onReceiptAddが呼ばれたらレシートが追加される（1 → 2）', () => {
    const { result } = renderHook(() => useReceipt([{ index: 1, storeName: '', cost: 100 }]));
    act(() => {
      result.current.onReceiptAdd();
    });
    expect(result.current.dailyReceipt.length).toBe(2);
  });
  test('onChangeStoreNameで店舗名が変更できる', () => {
    const { result } = renderHook(() => useReceipt([{ index: 1, storeName: '1', cost: 100 }]));
    act(() => {
      result.current.onChangeStoreName(1, 'new 1');
    });
    expect(result.current.dailyReceipt).toEqual([{ index: 1, storeName: 'new 1', cost: 100 }]);
  });
  test('onChangeCostで食費が変更できる', () => {
    const { result } = renderHook(() => useReceipt([{ index: 1, storeName: '1', cost: 100 }]));
    act(() => {
      result.current.onChangeCost(1, 1000);
    });
    expect(result.current.dailyReceipt).toEqual([{ index: 1, storeName: '1', cost: 1000 }]);
  });
  test('onReceiptDeleteが呼ばれたらレシートが削除されて index も振り直される', () => {
    const { result } = renderHook(() =>
      useReceipt([
        { index: 1, storeName: '1', cost: 100 },
        { index: 2, storeName: '2', cost: 200 },
      ])
    );
    act(() => {
      result.current.onReceiptDelete(1);
    });
    expect(result.current.dailyReceipt).toEqual([{ index: 0, storeName: '2', cost: 200 }]);
  });
  test('合計金額を正しく計算できる', () => {
    const { result } = renderHook(() =>
      useReceipt([
        { index: 1, storeName: 'a', cost: 1000 },
        { index: 2, storeName: 'b', cost: 1100 },
        { index: 3, storeName: 'c', cost: 1200 },
        { index: 4, storeName: 'd', cost: 1300 },
      ])
    );
    expect(result.current.calcSummartion()).toBe('¥4,600');
  });
  test('レシートがない場合は合計金額として¥0が表示される', () => {
    const { result } = renderHook(() => useReceipt(null));
    expect(result.current.calcSummartion()).toBe('¥0');
  });
  test('レシートが4枚ある場合はそれ以上追加できない', () => {
    const { result } = renderHook(() =>
      useReceipt([
        { index: 1, storeName: 'a', cost: 1000 },
        { index: 2, storeName: 'b', cost: 1100 },
        { index: 3, storeName: 'c', cost: 1200 },
        { index: 4, storeName: 'd', cost: 1300 },
      ])
    );
    expect(result.current.canAddReceipt).toBeFalsy();
  });
});
