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
                        </section>
                        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1"
                             class="description-arrow">
                            <path d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"/>
                        </svg>
                    </router-link>
                    <footer class="description-footer" v-if="shopDetailData.activities.length">
                        <p class="ellipsis">
                            <span class="tip-icon"
                                  :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">
                                {{shopDetailData.activities[0].icon_name}}
                            </span>
                            <span>
                                {{shopDetailData.activities[0].description}}（APP专享）
                            </span>
                        </p>
                        <p>
                            {{shopDetailData.activities.length}}个活动
                        </p>
                        <svg class="footer-arrow">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
                        </svg>
                    </footer>
                </section>
            </header>
        </section>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {shopDetails,msiteAdress} from '../../service/getData'
    import {getImgPath} from '../../components/common/mixin'
    export default{
        data() {
            return {
                geohash: '', //geohash位置信息
                shopId: null, //商店id值
                shopDetailData: null, //商铺详情
                showActivities: false, //是否显示活动详情
                windowHeight: null, //屏幕的高度
            }
        },
        created() {
            console.log('created');
            this.geohash = this.$route.query.geohash;
            this.shopId = this.$route.query.id;
        },
        mounted() {
            console.log('mounted');
            this.windowHeight = window.innerHeight;
            this.initData();
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
        filter: blur(10px);
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
                    .description_arrow {
                        @include ct;
                        right: 0.3rem;
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
                .footer_arrow{
                    @include wh(.45rem, .45rem);
                    position: absolute;
                    right: .3rem;
                }

            }
        }
    }
</style>