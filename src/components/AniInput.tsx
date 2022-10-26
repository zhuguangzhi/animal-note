import { Input, InputProps } from 'antd';
import { ChangeEvent, MutableRefObject, useState } from 'react';

export type inputEvent = ChangeEvent<HTMLInputElement>;

export interface AniInputProps extends InputProps {
  mode: MutableRefObject<string>;
  // onChange?: (e: inputEvent) => void
}

export const AniInput = ({ mode, ...props }: AniInputProps) => {
  const [value, setValue] = useState(mode.current);
  const InputChange = (e: inputEvent) => {
    setValue(e.target.value);
    mode.current = e.target.value;
    props.onChange?.(e);
  };
  return <Input {...props} value={value} onChange={InputChange} />;
};
