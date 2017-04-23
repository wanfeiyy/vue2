<template>
    <div>
        <section class="shop-container">
            <header class="shop-detail-header" ref="shopheader"
                    :style="{zIndex: showActivities ? '14':'10'}">
                <img :src="getImgPath(shopDetailData.image_path)" class="header-cover-img">
                <section class="description-header">
                    <router-link to="/shop/shopDetail" class="description-top">
                        <section class="description-left">
                            <img :src="getImgPath(shopDetailData.image_path)">
                        </section>
                        <section class="description-right">
                            <h4 class="description-title ellipsis">
                                {{shopDetailData.name}}
                            </h4>
                            <p class="description-text">
                                商家配送/{{shopDetailData.order_lead_time}}分钟送达／配送费¥{{shopDetailData.float_delivery_fee}}
                            </p>
                            <p class="description-promotion ellipsis">
                                公告：{{promotionInfo}}
                            </p>
                            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                 class="description-arrow">
                                <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"/>
                            </svg>
                        </section>
                    </router-link>
                    <footer class="description-footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
                        <p class="ellipsis">
                            <span class="tip-icon"
                                  :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">
                                {{shopDetailData.activities[0].icon_name}}
                            </span>
                            <span>
                                {{shopDetailData.activities[0].description}}（APP专享）
                            </span>
                        </p>
                        <p> {{shopDetailData.activities.length}}个活动 </p>

                        <svg class="footer-arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>
                </section>
            </header>
            <transition name="fade">
                <section class="activities-details" v-if="showActivities">
                    <h2 class="activities-shoptitle">{{shopDetailData.name}}</h2>
                    <h3 class="activities-ratingstar">
                        <rating-star :rating="shopDetailData.rating"></rating-star>
                    </h3>
                    <section class="activities-list">
                        <header class="activities-title-style"><span>优惠信息</span></header>
                        <ul>
                            <li v-for="item in shopDetailData.activities" :key="item.id">
                                <span class="activities-icon" :style="{backgroundColor:'#' + item.icon_color,borderColor:'#' + item.icon_color}">
                                    {{item.icon_name}}
                                </span>
                                <span>{{item.description}}（APP专享）</span>
                            </li>
                        </ul>
                    </section>
                    <section class="activities-shopinfo">
                        <header class="activities-title-style"><span>商家公告</span></header>
                        <p>{{promotionInfo}}</p>
                    </section>
                    <svg width="60" height="60" class="close-activities" @click.stop="showActivitiesFun">
                        <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
                        <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
                        <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
                    </svg>
                </section>
            </transition>
            <section class="change-show-type" ref="chooseType">
                <div>
                    <span :class="{activity_show:changeShowType == 'food'}"
                          @click="changeShowType='food'">
                        商品
                    </span>
                </div>
                <div>
                    <span :class="{activity_show:changeShowType == 'rating'}"
                          @click="changeShowType='rating'">
                        评价
                    </span>
                </div>
            </section>

        </section>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {shopDetails,msiteAdress} from '../../service/getData'
    import ratingStar from '../../components/common/ratingStar'
    import {getImgPath} from '../../components/common/mixin'
    export default{
        data() {
            return {
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                shopDetailData: null, //商铺详情
                changeShowType: 'food',//切换显示商品或者评价
                showActivities: false, //是否显示活动详情
                windowHeight: null, //屏幕的高度
            }
        },
        components: {
            ratingStar,
        },
        created() {
            console.log('created');
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted() {
            console.log('mounted');
            this.initData();
            this.windowHeight = window.innerHeight;
        },
        mixins: [getImgPath],
        computed: {
            ...mapState([
                'latitude','longitude'
            ]),
            promotionInfo: function (){
                return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS',
            ]),
            // 初始化时获取基本数据
            async initData() {
                if (! this.latitude) {
                    //获取位置信息
                    let res = await msiteAdress(this.geohash);
                    // 记录当前经度纬度进入vuex
                    this.RECORD_ADDRESS(res);
                }
                //获取商铺信息
                this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);

            },
            // 控制活动详情页的显示隐藏
            showActivitiesFun(){
                this.showActivities = ! this.showActivities;
            },
            // 商品、评论切换状态
            changeShowType: value => {
                if (value === 'rating') {

                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .shop-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 9;
    }
    .shop-detail-header {
        overflow: hidden;
        position: relative;
        .header-cover-img {
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 9;
            filter: blur(10px);
        }
        .description-header {
            position: relative;
            z-index: 10;
            background-color: rgba(119,103,137,.43);
            padding: 0.4rem 0 0.4rem 0.4rem;
            width: 100%;
            overflow: hidden;
            .description-top {
                display: flex;
                .description-left {
                    margin-right: .3rem;
                    img {
                        @include wh(2.9rem,2.9rem);
                        display: block;
                        border-radius: 0.15rem;
                    }
                }
                .description-right {
                    flex: 1;
                    .description-title {
                        @include sc(.8rem, #fff);
                        font-weight: bold;
                        width: 100%;
                        margin-bottom: 0.3rem;
                    }
                    .description-text {
                        @include sc(.5rem, #fff);
                        margin-bottom: 0.3rem;
                    }
                    .description-promotion {
                        @include sc(.5rem, #fff);
                        width: 11.5rem;
                    }
                    .description-arrow {
                        @include ct;
                        right: 0.3rem;
                        z-index: 11;
                    }
                }
            }
            .description-footer {
                @include fj;
                margin-top: 0.5rem;
                padding-right: 1rem;
                p{
                    @include sc(.5rem, #fff);
                    span{
                        color: #fff;
                    }
                    .tip_icon{
                        padding: 0 .04rem;
                        border: 0.025rem solid #fff;
                        border-radius: 0.1rem;
                        font-size: .4rem;
                        display: inline-block;
                    }
                }
                .ellipsis {
                    width: 84%;
                }
                .footer-arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }

            }
        }
    }

    .activities-details {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #262626;
        z-index: 200;
        padding: 1.125rem;
        .activities-shoptitle {
            text-align: center;
            @include sc(.8rem,#fff);
        }
        .activities-ratingstar {
            display: flex;
            justify-content: center;
            transform: scale(2.2);
            margin-top: .7rem;
        }
        .activities-list {
            margin-top: 1.5rem;
            margin-bottom: 1rem;
            @include sc(.5rem,#fff);
            li {
                margin-bottom: .2rem;
                .activities-icon {
                    padding: 0 .2rem;
                    display: inline-block;
                    border: .025rem solid #fff;
                    border-radius: .1rem;
                };
                span {
                    color: #fff;
                    line-height: .6rem;
                }
            }
        }
        .activities-shopinfo {
            p {
                line-height: .7rem;
                @include sc(.5rem,#fff)
            }
        }
        .activities-title-style {
            text-align: center;
            margin-bottom: 1rem;
            span {
                @include sc(.5rem,#fff);
                border: 0.025rem solid #555;
                padding: .2rem .4rem;
                border-radius: 0.5rem;
            }
        }
        .close-activities {
            bottom: 1rem;
            @include cl;
        }
    }

    .change-show-type {
        display: flex;
        background-color: #fff;
        padding: .3rem .6rem;
        border: 1px solid #ebebeb;
        div {
            flex: 1;
            text-align: center;
            span {
                @include sc(.65rem,#666);
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show {
                color: #3190e8;
                border-color: #3190e8;
            }
        }
    }
</style>