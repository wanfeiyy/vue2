/**
 * Created by Administrator on 2017/3/9.
 */
import fetch from '../config/fetch'

var hotcity = () => fetch('GET','/v1/cities',{
  type: 'hot'
});

/**
 * 获取首页默认地址
 */
var cityGuess = () => fetch('GET', '/v1/cities', {
  type: 'guess'
});

/**
 * 所有地址
 */
var groupcity = () => fetch('GET', '/v1/cities', {
  type: 'group'
});

/**
 * 获取当前所在城市
 */
var currentcity = number => fetch('GET', '/v1/cities/' + number, {});

/**
 * 获取搜索地址
 */
var searchplace = (cityid,value) => fetch('GET','/v1/pois',{
  type: 'search',
  city_id:cityid,
  keyword: value
})

/**
 * 获取msite页面地址信息
 */

var msiteAdress = geohash => fetch('GET', '/v2/pois/' + geohash, {});


/**
 * 获取msite页面食品分类列表
 */

var msiteFoodTypes = geohash => fetch('GET', '/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
});


export {
  hotcity,cityGuess,groupcity,currentcity,searchplace,msiteAdress,msiteFoodTypes
}