import './style/index.less';
import '@/components/styles/popoverMenu.less';
import { IconFont } from '@/components/IconFont';
import router from '@/hook/url';

export default () => {
  //侧边栏列表
  // const sideList:MenuType[] = [
  //     {key:"accountSafe",label:"账号与安全",icon:""}
  // ]

  const Side = () => {
    return <div className={'side popoverMenu'}></div>;
  };
  return (
    <div className={'mine animate__animated animate__fadeIn'}>
      {/*    头部*/}
      <div className={'header'}>
        <span className={'font_18'}>个人中心</span>
        <IconFont
          onClick={() => router.back()}
          className={'cursor'}
          icon={'cha'}
        />
      </div>
      {/*    侧边栏*/}
      <Side />
    </div>
  );
};
