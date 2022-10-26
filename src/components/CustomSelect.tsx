import { Select, SelectProps } from 'antd';
import { useState } from 'react';
import { DefaultOptionType } from 'antd/lib/select';

export type CustomItemProps = {
  key: string;
  label: string;
};

interface CustomSelectType extends SelectProps {
  optionList: CustomItemProps[];
}

export type SelectChangeType = {
  value: string;
  option: DefaultOptionType | DefaultOptionType[];
  callback?: (
    value: SelectChangeType['value'],
    option: SelectChangeType['option'],
  ) => void;
};

//该组件类似于ant select的tags模式，但是这个没有标签
export const CustomSelect = ({ optionList, ...props }: CustomSelectType) => {
  const { Option } = Select;
  //自定义数据
  const [customType, setCustomType] = useState<CustomItemProps[]>([]);
  const handleChange = ({ value, option, callback }: SelectChangeType) => {
    setCustomType([]);
    callback?.(value, option);
  };
  //触发数据变化
  const handleSearch = async (
    newValue: string,
    callback?: (value: string) => void,
  ) => {
    //空或和已有值相同不加自定义参数
    const res =
      (await optionList.find((item) => item.label === newValue)) !== undefined;
    setCustomType(
      newValue === '' || res ? [] : [{ key: newValue, label: newValue }],
    );
    callback?.(newValue);
  };
  return (
    <Select
      {...props}
      onSearch={(val) => handleSearch(val, props.onSearch)}
      onChange={(value, option) =>
        handleChange({ value, option, callback: props.onChange })
      }
    >
      {[...customType, ...optionList].map((item) => (
        <Option key={item.key}>{item.label}</Option>
      ))}
    </Select>
  );
};
