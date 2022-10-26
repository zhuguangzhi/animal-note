//实现v-if v-show

import React, { ReactElement } from 'react';

type UseNodeProps = {
  rIf?: unknown;
  rShow?: unknown;
  children: ReactElement;
};
export const UseNode = ({ rIf, rShow, children }: UseNodeProps) => {
  if (rIf === null || !rIf) return <></>;
  const isShow = !!rIf || !!rShow ? '' : 'none';
  return (
    <>
      {React.cloneElement(children, {
        ...children.props,
        style: { ...children.props.style, display: isShow },
      })}
    </>
  );
};
