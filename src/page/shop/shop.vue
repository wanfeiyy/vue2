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
                    <footer class="description-footer" v-if="shopDetailData.activities.length"
                            @click="showActivitiesFun">
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
                                <span class="activities-icon"
                                      :style="{backgroundColor:'#' + item.icon_color,borderColor:'#' + item.icon_color}">
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
            <transition name="fade-choose">
                <section v-show="changeShowType === 'food'" class="food-container">
                    <section class="menu-container">
                        <section class="menu-left" id="wrapper-menu">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index" class="menu-left-li"
                                    :class="{activity_menu:index == menuIndex}" @click="chooseMenu(index)">
                                    <img :src="getImgPath(item.icon_url)" v-if="item.icon_url">
                                    <span>{{item.name}}</span>
                                    <span class="category-num" v-if="categoryNum[index] && item.type == 1">{{categoryNum[index]}}</span>
                                </li>
                            </ul>
                        </section>
                        <section class="menu-right" ref="menuFoodList">
                            <ul>
                                <li v-for="(item,index) in menuList" :key="index">
                                    <header class="menu-detail-header">
                                        <section class="menu-detail-header-left">
                                            <strong class="menu-item-title">{{item.name}}</strong>
                                            <strong class="menu-item-description">{{item.description}}</strong>
                                        </section>
                                        <span class="menu-detail-header-right" @click="showTitleDetail(index)"></span>
                                        <p class="description-tip" v-if="index == TitleDetailIndex"
                                           @click="NoneTitleDetail">
                                            <span>{{item.name}}</span>
                                            {{item.description}}
                                        </p>
                                    </header>
                                    <section v-for="(foods,foodindex) in item.foods" :key="foodindex"
                                             class="menu-detail-list">
                                        <router-link :to="{path:'shop/foodDetail',query:{image_path:foods.image_path,
                                        description:foods.description,month_sales: foods.month_sales, name: foods.name,
                                        rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate,
                                        foods, shopId}}" tag="div" class="menu-detail-link">
                                            <section class="menu-food-img">
                                                <img :src="getImgPath(foods.image_path)">
                                            </section>
                                            <section class="menu-food-description">
                                                <h3 class="food-description-head">
                                                    <strong class="description-foodname">{{foods.name}}</strong>
                                                    <ul v-if="foods.attributes.length" class="attributes-ul">
                                                        <li v-for="(attribute, foodindex) in foods.attributes"
                                                            :key="foodindex"
                                                            :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}"
                                                            :class="{attribute_new: attribute.icon_name == '新'}">
                                                            <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">
                                                                {{attribute.icon_name == '新'? '新品':attribute.icon_name}}
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </h3>
                                                <p class="food-description-content">{{foods.description}}</p>
                                                <p class="food-description-sale-rating">
                                                    <span>月售{{foods.month_sales}}份</span>
                                                    <span>好评率{{foods.satisfy_rate}}%</span>
                                                </p>
                                                <p v-if="foods.activity" class="food-activity">
                                                    <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                                                </p>
                                            </section>
                                        </router-link>
                                    </section>
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </transition>
        </section>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex'
    import {shopDetails, msiteAdress, foodMenu} from '../../service/getData'
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
                menuList: [], // 食品列表
                menuIndex: 0, //已选菜单索引值，默认为0
                categoryNum: [], //商品类型右上角已加入购物车的数量
                TitleDetailIndex: null, //点击展示列表头部详情
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
                'latitude', 'longitude'
            ]),
            promotionInfo: function () {
                return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰期请提前下单，谢谢。'
            },
        },
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS',
            ]),
            // 初始化时获取基本数据
            async initData() {
                if (!this.latitude) {
                    //获取位置信息
                    let res = await msiteAdress(this.geohash);
                    // 记录当前经度纬度进入vuex
                    this.RECORD_ADDRESS(res);
                }
                // 获取商铺信息
                this.shopDetailData = await shopDetails(this.shopId, this.latitude, this.longitude);
                // 获取商铺食品列表

                this.menuList = await foodMenu(this.shopId);
            },
            // 控制活动详情页的显示隐藏
            showActivitiesFun(){
                this.showActivities = !this.showActivities;
            },
            // 商品、评论切换状态
            changeShowType: value => {
                if (value === 'rating') {

                }

            },
            // 选中菜单
            chooseMenu(index) {
                this.menuIndex = index;
            },
            //
            showTitleDetail(index) {
                if (this.TitleDetailIndex == index) {
                    this.TitleDetailIndex = null;
                } else {
                    this.TitleDetailIndex = index;
                }
            },
            NoneTitleDetail() {
                this.TitleDetailIndex = null;
            },
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
            background-color: rgba(119, 103, 137, .43);
            padding: 0.4rem 0 0.4rem 0.4rem;
            width: 100%;
            overflow: hidden;
            .description-top {
                display: flex;
                .description-left {
                    margin-right: .3rem;
                    img {
                        @include wh(2.9rem, 2.9rem);
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
                p {
                    @include sc(.5rem, #fff);
                    span {
                        color: #fff;
                    }
                    .tip_icon {
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
                .footer-arrow {
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
            @include sc(.8rem, #fff);
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
            @include sc(.5rem, #fff);
            li {
                margin-bottom: .2rem;
                .activities-icon {
                    padding: 0 .2rem;
                    display: inline-block;
                    border: .025rem solid #fff;
                    border-radius: .1rem;
                }
            ;
                span {
                    color: #fff;
                    line-height: .6rem;
                }
            }
        }
        .activities-shopinfo {
            p {
                line-height: .7rem;
                @include sc(.5rem, #fff)
            }
        }
        .activities-title-style {
            text-align: center;
            margin-bottom: 1rem;
            span {
                @include sc(.5rem, #fff);
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
                @include sc(.65rem, #666);
                padding: .2rem .1rem;
                border-bottom: 0.12rem solid #fff;
            }
            .activity_show {
                color: #3190e8;
                border-color: #3190e8;
            }
        }
    }

    .food-container {
        display: flex;
        flex: 1;
        padding-bottom: 2rem;
    }

    .menu-container {
        display: flex;
        flex: 1;
        overflow-y: hidden;
        .menu-left {
            background-color: #f8f8f8;
            width: 3.8rem;
            .menu-left-li {
                padding: .7rem .3rem;
                border-bottom: 0.025rem solid #ededed;
                box-sizing: border-box;
                border-left: 0.15rem solid #f8f8f8;
                position: relative;
                img {
                    @include wh(.5rem, .6rem);
                }
                span {
                    @include sc(.6rem, #666);
                }
                .category-num {
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    background-color: #ff461d;
                    line-height: .6rem;
                    text-align: center;
                    border-radius: 50%;
                    border: 0.025rem solid #ff461d;
                    min-width: .6rem;
                    height: .6rem;
                    @include sc(.5rem, #fff);
                    font-family: Helvetica Neue, Tahoma, Arial;
                }
            }

            .activity_menu {
                border-left: 0.15rem solid #3190e8;
                background-color: #fff;
                span:nth-of-type(1) {
                    font-weight: bold;
                }

            }

        }
        .menu-right {
            flex: 4;
            overflow-y: auto;
            .menu-detail-header {
                width: 100%;
                padding: .4rem;
                position: relative;
                @include fj;
                align-items: center;
                .menu-detail-header-left {
                    width: 11rem;
                    white-space: nowrap;
                    overflow: hidden;
                    .menu-item-title {
                        @include sc(.7rem, #666);
                        font-weight: bold;
                    }
                    .menu-item-description {
                        @include sc(.5rem, #999);
                        width: 30%;
                        overflow: hidden;

                    }
                }
                .menu-detail-header-right {
                    @include wh(.5rem, .5rem);
                    display: block;
                    @include bis('../../images/icon_point.png');
                    background-size: 100% .4rem;
                    background-position: left center;
                }
                .description-tip {
                    background-color: #39373a;
                    opacity: .95;
                    @include sc(.5rem, #fff);
                    position: absolute;
                    top: 1.5rem;
                    z-index: 14;
                    width: 8rem;
                    right: .2rem;
                    padding: .5rem .4rem;
                    border: 1px;
                    border-radius: .2rem;
                    span {
                        color: #fff;
                        line-height: .6rem;
                        font-size: .55rem;
                    }
                }
                .description-tip::after {
                    content: '';
                    position: absolute;
                    @include wh(.4rem, .4rem);
                    background-color: #39373a;
                    top: -.5rem;
                    right: .7rem;
                    transform: rotate(-45deg) translateY(.41rem);
                }
            }
            .menu-detail-list {
                background-color: #fff;
                padding: .6rem .4rem;
                border-bottom: 1px solid #f8f8f8;
                position: relative;
                overflow: hidden;
                .menu-detail-link {
                    display: flex;
                    .menu-food-img {
                        margin-right: .4rem;
                        img {
                            @include wh(2rem,2rem);
                            display: block;
                        }
                    }
                    .menu-food-description {
                        width: 100%;
                        .food-description-head {
                            @include fj;
                            margin-bottom: .2rem;
                            align-items: center;
                            .description-foodname {
                                @include sc(.7rem,#333);
                            }
                            .attributes-ul {
                                display: flex;
                                li {
                                    font-size: .3rem;
                                    height: .6rem;
                                    line-height: .35rem;
                                    padding: .1rem;
                                    border: 1px solid #666;
                                    border-radius: 0.3rem;
                                    margin-right: .1rem;
                                    transform: scale(.8);
                                    p{
                                        white-space: nowrap;
                                        line-height: .4rem;
                                    }
                                }
                            }
                        }
                        .food-description-content {
                            @include sc(.5rem,#999);
                            line-height: .6rem;
                        }
                        .food-description-sale-rating {
                            line-height: .8rem;
                            span {
                                @include sc(.5rem,#333);
                            }
                        }
                        .food-activity {
                            line-height: .4rem;
                            span {
                                font-size: .3rem;
                                border: 1px solid currentColor;
                                border-radius: 0.3rem;
                                padding: .08rem;
                                display: inline-block;
                                transform: scale(.8);
                                margin-left: -0.35rem;
                            }
                        }
                    }
                }
            }
        }

    }
</style>