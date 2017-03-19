/**
 * Created by Administrator on 2017/3/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getter'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  geohash: 'wtw3sm0q087',//地址geohash值
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})