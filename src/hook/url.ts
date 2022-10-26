import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import { cleanObject } from '@/util';
import { history, useLocation } from '@umijs/max';
import qs from 'qs';

//获取路哟指定的参数
export const useSearchParam = <T extends string>(keys: T[]) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParam.get(key) };
        }, {} as { [key in T]: string }),
      [searchParam],
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      //Object.fromEntries 把键值对列表转换为一个对象
      const o = cleanObject({
        ...Object.fromEntries(searchParam),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
  ] as const;
};

//设置路由参数
export const useSetUrlParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const res = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(res);
  };
};
//清空其他参数并设置新参数
export const useCoverUrlParams = () => {
  const [, setSearchParams] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const res = cleanObject({
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(res);
  };
};
//获取路由路径信息
export const useGetUrlPath = () => {
  const path = useLocation();
  return path.pathname.split('/');
};

// const navigate = useNavigate()

type urlType = {
  url: string;
  params?: { [key: string]: unknown };
};
export type beforeEachEvents = {
  from: string;
  to: {
    path: string;
    query: { [key: string]: unknown };
  };
  next: Function;
};

class router {
  static routerInstance: router = new router();
  protected url: urlType['url'] = '';
  protected params: urlType['params'] = {};
  protected step: number = 0;
  protected callback: Function | null = null;

  static instance() {
    return this.routerInstance;
  }

  //组件中传入回调 调用to
  beforeEach(callback?: Function) {
    if (callback) {
      this.callback = callback;
      return;
    }
    if (this.callback !== null) {
      const next = this.next();
      const from = window.location.hash.split('/')[1];
      this.callback({
        from,
        to: { path: this.url, query: this.params },
        next,
      } as beforeEachEvents);
      return;
    }
    this.next()();
  }

  push(url: urlType['url'], params?: urlType['params']) {
    this.url = url;
    this.params = params || {};
    this.beforeEach();
  }

  go(num: number) {
    this.step = num;
    this.beforeEach();
  }

  back() {
    this.step = -1;
    this.beforeEach();
  }

  protected next() {
    const { url, params, step } = this;
    const formatParam = qs.stringify(cleanObject(params || {}));
    return () => {
      if (step < 0) history.go(step);
      else history.push(url + '?' + formatParam);
      this.url = '';
      this.params = {};
      this.callback = null;
      this.step = 0;
    };
  }
}

export default router.instance();
