/** @jest-environment jsdom */
import { composeStories } from '@storybook/testing-react';
import { render } from '../../../test-utils';
import * as ButtonPanelStories from './ButtonPanel.stories';

describe('ButtonPanelコンポーネント', () => {
  const { Clicked } = composeStories(ButtonPanelStories);
  it('クリックしたらonClickが呼ばれる', async () => {
    const mockOnClick = jest.fn();
    const { container } = render(<Clicked onClick={mockOnClick} />);
    await Clicked.play({ canvasElement: container });
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
