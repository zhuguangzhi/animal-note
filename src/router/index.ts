export const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: '@/pages/login/index',
  },
  {
    path: '/',
    component: '@/layouts/side/index',
    routes: [
      {
        path: '/index',
        component: '@/pages/mine/index',
      },
      {
        path: '/note',
        component: '@/pages/note/addNote.tsx',
      },
      {
        path: '/noteBook',
        component: '@/pages/note/noteBook.tsx',
      },
      {
        path: '/collect',
        component: '@/pages/collect/collect.tsx',
      },
    ],
  },
];
