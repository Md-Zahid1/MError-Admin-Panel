import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/products',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'assignment',
    path: '/assignment',
    icon: icon('ic_blog'),
  },
  {
    title: 'consultant',
    path: '/consultant',
    icon: icon('ic_blog'),
  },
  {
    title: 'appointment',
    path: '/appointment',
    icon: icon('ic_blog')
  },
  {
    title: 'category',
    path: '/category',
    icon: icon('ic_blog')
  },
  {
    title: 'feedback',
    path: '/feedback',
    icon: icon('ic_blog')
  },
  {
    title: 'setting',
    path: '/setting',
    icon: icon('ic_blog')
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
