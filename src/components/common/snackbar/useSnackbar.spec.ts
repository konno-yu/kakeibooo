/** @jest-environment jsdom */
import { act, renderHook } from '@testing-library/react-hooks';
import { useSnackbar } from './useSnackbar';

describe('useSnackbar', () => {
  test('Snackbarは3秒間だけ表示される', async () => {
    const { result, waitFor } = renderHook(() => useSnackbar());
    act(() => {
      result.current.showSnackbar();
    });
    expect(result.current.isOpen).toBeTruthy();
    await waitFor(
      () => {
        expect(result.current.isOpen).toBeFalsy();
      },
      {
        timeout: 3500,
      }
    );
  });
  test('値を正しく設定できる', () => {
    const { result } = renderHook(() => useSnackbar());
    act(() => {
      result.current.setSnackbarDetails('success', 'タイトル', 'サブタイトル');
    });
    expect(result.current.type).toBe('success');
    expect(result.current.text).toBe('タイトル');
    expect(result.current.subText).toBe('サブタイトル');
  });
});
