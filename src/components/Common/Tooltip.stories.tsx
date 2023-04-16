import { ComponentMeta, ComponentStory } from '@storybook/react';
import Tooltip from './Tooltip';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = args => <Tooltip {...args} />;

export const DefaultTooltip = Template.bind({});
DefaultTooltip.args = {
  message: '툴팁 메세지 입니다.',
};
