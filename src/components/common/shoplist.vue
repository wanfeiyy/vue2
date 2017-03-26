<template>
    <div class="shoplist-container">
        <ul v-if="shopListArr.length" type="1">
            <router-link v-for="item in shopListArr" :key="item.id"  :to="{path:'shop',query:{geohash,id:item.id}}" tag='li' class="shop-li">
                <section>
                    <img :src="getImgPath(item.image_path)" class="shop-img">
                </section>
                <hgroup class="shop-right">
                    <header class="shop-header-detail">
                        <h4 :class="item.is_premium ? 'premium' : ''" class="shop-title ellipsis">
                            {{item.name}}
                        </h4>
                        <ul class="shop-detail-ul">
                            <li v-for="item in item.supports" :key="item.id" class="supports"> {{item.icon_name}}</li>
                        </ul>
                    </header>
                    <h5 class="rating-order-num">
                        <section class="rating-order-num-left">
                            <section class="rating-section">
                                <rating-star :rating='item.rating'></rating-star>
                                <span class="rating-num">{{item.rating}}</span>
                            </section>
                            <section class="order-section">
                                 月售{{item.recent_order_num}}单
                            </section>
                        </section>
                        <section class="rating-order-num-right" v-if="item.delivery_mode">
                            <span class="delivery-style delivery-left">{{item.delivery_mode.text}}</span>
                            <span class="delivery-style delivery_right">准时达</span>
                        </section>
                    </h5>
                    <h5 class="fee-distance">
                        <section class="fee">
                            ￥{{item.float_minimum_order_amount}}起送
                            <span class="segmentation">/</span>
                            {{item.piecewise_agent_fee.tips}}
                        </section>
                        <section class="distance-time">
                            <span>{{item.distance > 1000 ?
                                (item.distance/1000).toFixed(2) + 'km' :
                                item.distance + 'm'}}
                                 <span class="segmentation">/</span>
                            </span>
                            <span class="order-time">
                                {{item.order_lead_time}}分钟
                            </span>
                        </section>
                    </h5>
                </hgroup>
            </router-link>
        </ul>
        <p v-else class="empty-data">没有更多了</p>
        <aside class="return-top" @click="backTop" v-if="! showBackStatus">
            <svg class="back-top-svg">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
            </svg>
        </aside>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../style/mixin.scss";
    .shoplist-container {
        background-color: #fff;
        padding-bottom: 2rem;
    }
    .shop-li {
        display: flex;
        border-bottom: .025rem solid #f1f1f1;
        padding: .7rem .4rem;
    }
    .shop-img {
        @include wh(2.9rem,2.9rem);
        display: block;
        margin-right: .4rem;
    }
    .shop-right {
        flex: auto;
        .shop-header-detail {
            @include fj;
            align-items: center;
            .shop-title {
                width: 8.5rem;
                color: #333;
                padding-top: .01rem;
                @include font(0.65rem, 1rem, 'PingFangSC-Regular');
                font-weight: 700;
            }
            .premium::before {
                content: '品牌';
                display: inline-block;
                font-size: .3rem;
                line-height: 1rem;
                background-color: #ffd930;
                padding: 0 0.1rem;
                border-radius: 0.1rem;
                margin-right: 0.2rem;
                vertical-align: top;
            }
            .shop-detail-ul {
                display: flex;
                .supports {
                    @include sc(.5rem,#999);
                    border: .025rem solid #f1f1f1;
                    padding: .04rem;
                    border-radius: 0.08rem;
                    margin-left: 0.05rem;
                }
            }
        }

    }
    .rating-order-num {
        @include fj(space-between);
        height: 0.6rem;
        margin-top: 0.52rem;
        .rating-order-num-left {
            @include fj(flex-start);
            .rating-section {
                display: flex;
                .rating-num {
                    @include sc(0.4rem, #ff6000);
                    margin: 0 .2rem;
                }
            }
            .order-section {
                @include sc(0.4rem,#666);
            }
        }
        .rating-order-num-right {
            display: flex;
            align-items: center;
            .delivery-style {
                font-size: .4rem;
                padding: .04rem .08rem 0;
                border-radius: .08rem;
                margin-left: .08rem;
                border: 1px;
            }
            .delivery-left {
                color: #fff;
                background-color: $blue;
                border: 0.025rem solid $blue;
            }
            .delivery-right {
                color: $blue;
                border: 0.025rem solid $blue;
            }
        }
    }
    .fee-distance {
        margin-top: .52rem;
        @include fj;
        @include sc(.5rem,#666);
        .fee {
            @include sc(0.5rem, #666);
        }
        .distance-time {
            span {
                color: #999;
            }
            .order-time {
                color: $blue;
            }
            .segmentation {

                color: #ccc;
            }
        }
    }
    .return-top {
        position: fixed;
        bottom: 3rem;
        right: 1rem;
        .back-top-svg {
            @include wh(2rem,2rem);
        }
    }
</style>
<script>
    import {mapState} from 'vuex'
    import ratingStar from './ratingStar'
    import {animate} from '../../config/mUtils'
    import {shopList} from '../../service/getData'
    import {getImgPath} from './mixin'
    export default {
        data() {
            return {
                shopListArr: [],
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
                showBackStatus: false, // 返回顶部按钮
            }
        },
        components: {
            ratingStar
        },
        mounted() {
            this.initData()
        },
        props: {
            restaurantCategoryId: {
                type: String,
                default() {
                    return ''
                }
            },
            geohash: {
                type: String,
                default() {
                    return ''
                }
            }
        },
        mixins: [getImgPath],
        computed: {
            ...mapState([
                'latitude','longitude'
            ])
        },
        methods: {
            // 获取数据
            async initData() {
                let res = await shopList(this.latitude,this.longitude,this.offset,this.restaurantCategoryId);
                this.shopListArr = [...res];
            },
            // 返回顶部
            backTop() {

                animate(document.body,{"scrollTop":0},400,'ease-out')
            }
        }

    }
</script>
