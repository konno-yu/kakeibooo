import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Receipt } from './Receipt';

export default { component: Receipt } as ComponentMeta<typeof Receipt>;

export const Pure: ComponentStoryObj<typeof Receipt> = {
  args: {},
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
};
