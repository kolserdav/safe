import { IconProps } from '../../types';
import Icon from './Icon';

function ErrorIcon(props: Omit<IconProps, 'children'>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Icon {...props}>
      M23,12L20.56,9.22L20.9,5.54L17.29,4.72L15.4,1.54L12,3L8.6,1.54L6.71,4.72L3.1,5.53L3.44,9.21L1,12L3.44,14.78L3.1,18.47L6.71,19.29L8.6,22.47L12,21L15.4,22.46L17.29,19.28L20.9,18.46L20.56,14.78L23,12M13,17H11V15H13V17M13,13H11V7H13V13Z
    </Icon>
  );
}

export default ErrorIcon;
