/**
 * Created by wy on 2017/3/7.
 */
let baseUrl,routerMode;
const imgBaseUrl = 'https://fuss10.elemecdn.com';
if (process.env.NODE_ENV == 'development') {
    baseUrl = '';
    routerMode = 'hash';
} else {
    baseUrl = 'https://mainsite-restapi.ele.me';
    routerMode = 'hash'
}

export {
    baseUrl,
    routerMode,
    imgBaseUrl
}

