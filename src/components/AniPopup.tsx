import React, { ReactElement, ReactNode, useCallback } from 'react';
import { UseNode } from '@/components/UseNode';
import { Button } from 'antd';
import './styles/popup.less';
import { IconFont } from '@/components/IconFont';
import { createPortal } from 'react-dom';

export type PopupProps = {
  open: boolean;
  children: ReactNode;
  mask?: boolean;
  showClose?: boolean; //是否展示关闭按钮
  title?: string;
  leftBtn?: string;
  isDanger?: boolean;
  okBtnName?: string;
  cancelBtnName?: string;
  onOk?: () => void;
  onClose: () => void;
  onLeftEvent?: () => void;
  useCancelBtn?: boolean; //是否展示取消按钮
  width?: string; //宽度
  disabled?: boolean; // okBtn是否禁用
};
export const AniPopup = (props: PopupProps) => {
  const Container: (props: PopupProps) => ReactElement = useCallback(
    ({
      title,
      children,
      leftBtn,
      isDanger = true,
      useCancelBtn = true,
      mask = true,
      ...props
    }: PopupProps) => {
      if (!props.open) return <></>;
      return (
        <div className={'container animate__animated animate__fadeIn'}>
          <UseNode rIf={mask}>
            <div onClick={props.onClose} className={'mask'}></div>
          </UseNode>
          <div className={'popup'} style={{ width: props.width }}>
            {/*头*/}
            <div className={'popup_header'}>
              <UseNode rIf={title}>
                <p>{title}</p>
              </UseNode>
              {/*x按钮*/}
              <UseNode rIf={props.showClose}>
                <i onClick={props.onClose} className={'popup_close'}>
                  <IconFont icon={'cha'} />
                </i>
              </UseNode>
            </div>

            <div className={'popup_body'} children={children}></div>
            <div className={'popup_footer'}>
              <UseNode rIf={leftBtn}>
                <p onClick={props.onLeftEvent} className={'popup_footer_left'}>
                  {leftBtn}
                </p>
              </UseNode>
              <div className={'flex popup_footer_right'}>
                <UseNode rIf={useCancelBtn}>
                  <Button onClick={props.onClose} type={'default'}>
                    {props.cancelBtnName || '取消'}
                  </Button>
                </UseNode>
                <Button
                  onClick={() => props.onOk?.()}
                  style={{ marginLeft: '12px' }}
                  type={'primary'}
                  danger={isDanger}
                  disabled={props.disabled}
                >
                  {props.okBtnName || '确定'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    },
    [props.open],
  );
  //插入到body中
  return createPortal(<Container {...props} />, document.body);
};
export default AniPopup;
