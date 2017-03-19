/**
 * Created by Administrator on 2017/3/16.
 */
import {
  RECORD_ADDRESS,
  SAVE_GEOHASH
} from './mutations-type'

import {getStore,setStore} from '../config/mUtils'

export default {
  // 记录当前经度纬度
  [RECORD_ADDRESS](state,{
    latitude,
    longitude
  }) {
    state.latitude = latitude;
    state.longitude = longitude;
  },
  // 保存geohash
  [SAVE_GEOHASH](state,geohash) {
    state.geohash = geohash;
  }
}