/** @jest-environment jsdom */
import { composeStories } from '@storybook/testing-react';
import * as MonthSelectorStories from './MonthSelector.stories';
import { render } from '../../../test-utils';

const { TypePrev, TypeNext } = composeStories(MonthSelectorStories);

describe('MonthSelectorコンポーネント', () => {
  it('クリックしたらonPrevが呼ばれる', async () => {
    const mockOnPrev = jest.fn();
    const { container } = render(<TypePrev onPrev={mockOnPrev} />);
    await TypePrev.play({ canvasElement: container });
    expect(mockOnPrev).toHaveBeenCalledTimes(1);
  });
  it('クリックしたらonNextが呼ばれる', async () => {
    const mockOnNext = jest.fn();
    const { container } = render(<TypeNext onNext={mockOnNext} />);
    await TypeNext.play({ canvasElement: container });
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });
});

// TODO アクセシビリティ対応
