import { css } from '@emotion/react';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { FaCalculator } from 'react-icons/fa';
import { SimpleIndicator } from '../../common/simple_indicator/SimpleIndicator';
import { Card } from './Card';

export default { component: Card } as ComponentMeta<typeof Card>;

const childrenSample = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const spanSample = css`
  color: #6e6e6e;
  font-weight: 900;
  font-size: 24pt;
`;

export const Pure: ComponentStoryObj<typeof Card> = {
  args: {
    title: 'サンプル',
    icon: <FaCalculator />,
    color: 'primary',
    children: (
      <div css={childrenSample}>
        <div css={spanSample}>¥4,000</div>
        <SimpleIndicator range={[0, 5]} value={9} color="primary" />
      </div>
    ),
  },
  decorators: [(story) => <div style={{ width: '20%' }}>{story()}</div>],
};
