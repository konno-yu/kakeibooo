/** @jest-environment jsdom */
import { composeStories } from '@storybook/testing-react';
import { render } from '../../../test-utils';
import * as TagStories from './Tag.stories';

const { ClickDelete } = composeStories(TagStories);

describe('Tagコンポーネント', () => {
  it('削除ボタンを押したらメソッドが呼ばれる', async () => {
    const mockOnDelete = jest.fn();
    const { container } = render(<ClickDelete onDelete={mockOnDelete} />);
    await ClickDelete.play({ canvasElement: container });
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
