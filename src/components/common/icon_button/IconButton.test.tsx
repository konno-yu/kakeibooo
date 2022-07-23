/** @jest-environment jsdom */
import { composeStories } from '@storybook/testing-react';
import * as IconButtonStories from './IconButton.stories';
import { render } from '../../../test-utils';

describe('IconButtonコンポーネント', () => {
  const { ClickPure, ClickDisabled } = composeStories(IconButtonStories);
  it('クリックしたらonClickが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ClickPure onClick={mockOnClick} />);
    await ClickPure.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('非活性の場合クリックしてもonClickは呼ばれない', async () => {
    const mockOnClick = jest.fn();
    const { container } = render(<ClickDisabled onClick={mockOnClick} />);
    await ClickDisabled.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalledTimes(0);
  });
});

// TODO アクセシビリティ対応
