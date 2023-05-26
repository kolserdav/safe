import { IconProps } from '../../types';
import { ICON_WIDTH_DEFAULT } from '../../utils/constants';

function Icon({ width, height, children, color, animate, className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <path d={children}>{animate}</path>
    </svg>
  );
}

Icon.defaultProps = {
  width: ICON_WIDTH_DEFAULT,
  height: ICON_WIDTH_DEFAULT,
  color: 'wheat',
  className: '',
};

export default Icon;
