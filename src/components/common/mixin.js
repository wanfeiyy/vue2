/**
 * Created by Administrator on 2017/3/20.
 */
import {getStyle} from '../../config/mUtils'
import {imgBaseUrl} from '../../config/env';

export const getImgPath = {
  methods: {
    getImgPath(path) {
      let suffix;
      if (! path) {
        return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
      }
      if (path.indexOf('jpeg') !== -1) {
        suffix = '.jpeg'
      } else {
        suffix = '.png'
      }
      let url = '/' + path.substr(0,1) + '/' +path.substr(1,2) + '/' +path.substr(3) + suffix;
      return imgBaseUrl + url
    }
  }

}

export const loadMore = {
  directives: {
    'load-more':{
      bind: (el,binding) => {
        console.log(el,binding)

      }
    }
  }
}