import { Theme } from '../../Theme';
import CheckboxIcon from '../icons/Checkbox';
import CheckboxBlankIcon from '../icons/CheckboxBlank';
import MinusboxIcon from '../icons/Minusbox';
import IconButton from './IconButton';
import Typography from './Typography';
import s from './IconCheckbox.module.scss';

function IconCheckbox({
  theme,
  title,
  onClick,
  checked,
  minus,
  label,
}: {
  onClick: () => void;
  theme: Theme;
  title: string;
  checked: boolean;
  minus?: boolean;
  label?: string;
}) {
  return (
    <div className={s.wrapper}>
      <IconButton title={title} theme={theme} onClick={onClick}>
        {minus ? (
          <MinusboxIcon color={theme.red} />
        ) : checked ? (
          <CheckboxIcon color={theme.blue} />
        ) : (
          <CheckboxBlankIcon color={theme.contrast} />
        )}
      </IconButton>
      {label && (
        <Typography theme={theme} small variant="label">
          {label}
        </Typography>
      )}
    </div>
  );
}

IconCheckbox.defaultProps = {
  minus: undefined,
  label: undefined,
};

export default IconCheckbox;
