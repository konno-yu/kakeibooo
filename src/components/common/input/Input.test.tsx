/** @jest-environment jsdom */
import { composeStories } from '@storybook/testing-react';
import { render, within } from '../../../test-utils';
import * as InputStories from './Input.stories';

const { TypePure, TypeLimited } = composeStories(InputStories);

describe('Inputコンポーネント', () => {
  it('入力のたびにonChangeが呼ばれる', async () => {
    const mockOnChange = jest.fn();
    const { container } = render(<TypePure onChange={mockOnChange} />);
    await TypePure.play({ canvasElement: container });
    expect(mockOnChange).toHaveBeenCalledTimes(6);
  });
  it('最大文字数以下で正しく入力される', async () => {
    const { container } = render(<TypePure />);
    await TypePure.play({ canvasElement: container });
    const input = within(container).getByRole('textbox');
    expect((input as HTMLInputElement).value).toEqual('sample');
  });
  it('onChangeは最大{maxLength}回までしか呼ばれない', async () => {
    const mockOnChange = jest.fn();
    const { container } = render(<TypeLimited onChange={mockOnChange} />);
    await TypePure.play({ canvasElement: container });
    expect(mockOnChange).toHaveBeenCalledTimes(5);
  });
  it('{maxLength}文字以上入力しても{maxLength}文字までしか入力されない', async () => {
    const { container } = render(<TypeLimited />);
    await TypePure.play({ canvasElement: container });
    const input = within(container).getByRole('textbox');
    expect((input as HTMLInputElement).value).toEqual('sampl');
  });
});
