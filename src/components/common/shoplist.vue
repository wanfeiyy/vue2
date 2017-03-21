<template>
    <div class="shoplist-container">
        <ul  v-if="shopListArr.length" type="1">
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
                </hgroup>
            </router-link>
        </ul>
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
        @include wh(2.7rem,2.7rem);
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
                font-size: .5rem;
                line-height: .6rem;
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
</style>
<script>
    import {mapState} from 'vuex'
    import {shopList} from '../../service/getData'
    import {getImgPath} from './mixin'
    export default {
        data() {
            return {
                shopListArr: [],
                offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
            }
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

        }

    }
</script>
