<template>
    <div>
        <head-top signin-up='msite'>
            <router-link :to="'/search'+geohash" class="link-search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none"/>
                    <line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </router-link>
            <router-link to="/home" class="msite-title" slot="msite-title">
                <span class="title-text ellipsis">{{msiteTitle}}</span>
            </router-link>
        </head-top>
        <nav class="msite_nav">
            <div class="swiper-container">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in foodTypes" :key="index">
                        <div class="swiper-slide food_types_container">
                            <router-link :to="{path: '/food',query:{geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food" v-if="foodItem.title !== '预订早餐'">
                                <figure>
                                    <img :src="imgBaseUrl + foodItem.image_url">
                                    <figcaption>{{foodItem.title}}</figcaption>
                                </figure>
                            </router-link>
                            <a href="https://zaocan.ele.me/" class="link_to_food" v-else>
                                <figure>
                                    <img :src="imgBaseUrl + foodItem.image_url">
                                    <figcaption>{{foodItem.title}}</figcaption>
                                </figure>
                            </a>
                        </div>
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>
        </nav>
        <div class="shop-list-container">
            <header class="shop-header">
                <svg class="shop-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
                </svg>
                <span class="shop-header-title">附近商家</span>
            </header>
            <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .link-search {

        left: .8rem;
        @include wh(.8rem,.9rem);
        @include ct;
    }
    .msite-title {
        @include center;
        width: 50%;
        color: #fff;
        text-align: center;
        // margin-left: .5rem;
        .title-text {
            @include sc(.8rem,#fff);
            text-align: center;
            display: block;
        }
    }
    .msite_nav {
        padding-top: 2.1rem;
        background-color: #fff;
        border-bottom: .025rem solid $bc;
        .swiper-container {
            @include wh(100%,auto);
            padding-bottom: .4rem;
            .swiper-pagination {
                bottom: - 0.2rem;
            }
        }
    }
    .food_types_container {
        display: flex;
        flex-wrap: wrap;
        .link_to_food {
            width: 25%;
            padding: .3rem 0rem;
            @include fj(center);
            figure {
                img {
                    @include wh(1.8rem,1.8rem);
                    margin-bottom: .3rem;
                }
                figcaption {
                    text-align: center;
                    @include sc(.55rem,#666);

                }
            }
        }
    }
    .shop-list-container {
        margin-top: .4rem;
        border-top: .025rem $bc;
        background-color: #fff;
        .shop-header {
            .shop-icon {
                fill: #999;
                margin-left: .6rem;
                vertical-align: middle;
                @include wh(.6rem,.6rem);
            }
            .shop-header-title {
                margin-left: .2rem;
                color: #999;
                @include font(0.55rem, 1.6rem);
            }
        }
    }
</style>
<script>
    import {mapMutations} from 'vuex'
    import {imgBaseUrl} from '../../config/env'
    import headTop from '../../components/header/head'
    import shopList from '../../components/common/shoplist'
    import {msiteAdress,msiteFoodTypes} from '../../service/getData'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default({
        data() {
            return {
                geohash: '', // city页面传递过来的地址geohash
                msiteTitle: '请选择地址...', // msiet页面头部标题
                foodTypes: [], // 食品分类列表
                hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
                swiperOption: {
                    autoplay: 3000,
                    initialSlide: 1,
                    loop: true,
                    pagination: '.swiper-pagination',
                    mousewheelControl : true,
                    onSlideChangeEnd: swiper => {
                        // console.log('onSlideChangeEnd', swiper.realIndex)
                    }
                },
                imgBaseUrl,

            }
        },
        async beforeMount() {
            this.geohash = this.$route.query.geohash || 'wtw3sm0q087';
            this.SAVE_GEOHASH(this.geohash);
            // 获取位置信息
            let res = await msiteAdress(this.geohash);
            // 记录当前经度纬度
            this.RECORD_ADDRESS(res);
            this.msiteTitle = res.name;
            this.hasGetData = true;
        },
        components: {
            headTop,swiper,swiperSlide,shopList
        },
        mounted() {
            // 获取导航食品分类列表
            msiteFoodTypes(this.geohash).then(res => {
                let resLength = res.length;
                let resArr = res.concat([]);
                let foodArr = [];
                for (let i = 0,j = 0;i < resLength; i+=8,j++) {
                    foodArr[j] = resArr.splice(0,8)
                }
                this.foodTypes = foodArr;
            })
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS', 'SAVE_GEOHASH'
            ]),
            // 解码url
            getCategoryId(url) {
                let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name',''));
                if (/restaurant_category_id/gi.test(urlData)) {
                    return JSON.parse(urlData).restaurant_category_id.id;
                } else {
                    return '';
                }
            }

        }
    })
</script>
