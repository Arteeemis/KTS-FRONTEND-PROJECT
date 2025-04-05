import React from 'react';
import classNames from 'classnames';
import { IconColor } from 'components/icons/Icon';
import CheckIcon from 'components/icons/CheckIcon';
import 'styles/_variables.scss';
import './CheckBox.scss';

export type CheckBoxProps = {
  checked?: boolean;
  disabled?: boolean;
  hoverDisabled?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
  'data-testid'?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  checked = false,
  disabled = false,
  hoverDisabled = false,
  className = '',
  onChange,
  'data-testid': testId,
}) => {
  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  const iconColor = disabled ? IconColor.Disabled : IconColor.Accent;

  return (
    <label
      className={classNames(
        'checkbox-label',
        { 'checkbox-disabled': disabled },
        { 'checkbox-hover-disabled-false': !hoverDisabled },
        className,
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        className="checkbox-input"
        data-testid={testId}
        style={
          {
            'hover-disabled': hoverDisabled ? 'true' : 'false',
          } as React.CSSProperties
        }
      />
      {checked ? (
        <CheckIcon className="checkbox-custom" color={iconColor} width={40} height={40} />
      ) : (
        <div className="checkbox-custom"></div>
      )}
    </label>
  );
};

export default CheckBox;
