import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const city = r => require.ensure([], () => r(require('../page/city/city')), 'city')
const msite = r => require.ensure([], () => r(require('../page/msite/msite')), 'msite')
const food = r => require.ensure([], () => r(require('../page/food/food')), 'food')
const shop = r => require.ensure([], () => r(require('../page/shop/shop')), 'shop')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [ // 二级路由。对应App.vue
    // 地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    // 首页城市列表页
    {
      path: '/home',
      component: home
    },
    // 当前选择城市页
    {
      path: '/city/:cityid',
      component: city
    },
    // 所有店铺页面
    {
      path: '/msite',
      component: msite
    },
    // 特色商铺列表
    {
      path: '/food',
      component: food
    },
    // 商铺详情页
    {
      path: '/shop',
      component: shop,
    }
  ]
}]