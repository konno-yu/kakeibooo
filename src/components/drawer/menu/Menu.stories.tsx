import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { GiPig, GiCow, GiChicken } from 'react-icons/gi';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../../store';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

export default { component: Menu } as ComponentMeta<typeof Menu>;

export const Pure: ComponentStoryObj<typeof Menu> = {
  args: {
    children: [
      <MenuItem id="one">ひとつめ</MenuItem>,
      <MenuItem id="two">ふたつめ</MenuItem>,
      <MenuItem id="three">みっつめ</MenuItem>,
    ],
    value: 'one',
  },
};

export const WithIcon: ComponentStoryObj<typeof Menu> = {
  args: {
    children: [
      <MenuItem id="pig" icon={<GiPig size={24} />}>
        ぶた
      </MenuItem>,
      <MenuItem id="cow" icon={<GiCow size={24} />}>
        うし
      </MenuItem>,
      <MenuItem id="chick" icon={<GiChicken size={24} />}>
        とり
      </MenuItem>,
    ],
    value: 'chick',
  },
};
