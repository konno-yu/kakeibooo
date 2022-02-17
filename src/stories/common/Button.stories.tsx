import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FaCartPlus, FaSmileWink } from 'react-icons/fa';
import { Button } from '../../components/common/Button';

export default {
  title: 'Common/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Filled = Template.bind({});
Filled.args = {
  label: "これはボタンです",
  variant: 'filled',
  color: 'normal',
  width: 200
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: 'これはボタンです',
  variant: 'outlined',
  color: 'accent',
  width: 200
};

export const Icon = Template.bind({});
Icon.args = {
  label: 'これはボタンです',
  variant: 'filled',
  color: 'normal',
  icon: <FaSmileWink />,
  width: 200
}

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'これはボタンです',
  disabled: true,
  width: 200
}