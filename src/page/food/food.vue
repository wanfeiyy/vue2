<template>
    <div class="food-container">
        <head-top :goBack="true" :head-title="headTitle"></head-top>
        <section class="sort-container">
            <div class="sort-item" :class="{choose_type:sortBy == 'food'}">
                <div class="sort-item-container">
                    <div class="sort-item-border">
                        <span :class="{category_title:sortBy == 'food'}">
                            {{foodTitle}}
                        </span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
            </div>
            <transition name="showList" v-show="category">
                <section v-show="sortBy == 'food'" class="category-container sort-detail-type">
                    <section class="category-left">
                        <ul>
                            <li v-for="(item,index) in category" :key="index"
                                class="category-left-li" :class="{category_active:restaurant_category_id == item.id}" >
                                <section>
                                    <img :src="getImgPath(item.image_url)" v-if="index" class="category-icon">
                                    <span>{{item.name}}</span>
                                </section>
                                <section>
                                    <span class="category-count">{{item.count}}</span>
                                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category-arrow" >
                                        <path d="M0 0 L6 4 L0 8"  stroke="#bbb" stroke-width="1" fill="none"/>
                                    </svg>
                                </section>
                            </li>
                        </ul>
                    </section>
                </section>
            </transition>
        </section>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .food-container {
        padding-top: 3.6rem;
    }
    .sort-container {
        background-color: #fff;
        border-bottom: .025rem solid #f1f1f1;
        position: fixed;
        top: 1.95rem;
        right: 0;
        width: 100%;
        display: flex;
        z-index: 13;
        box-sizing: border-box;
        .sort-item {
            @include sc(.55rem,#444);
            @include wh(33%,1.6rem);
            text-align: center;
            line-height: 1rem;
            .sort-item-container {
                @include wh(100%,100%);
                position: relative;
                z-index: 14;
                background-color: #fff;
                box-sizing: border-box;
                padding-top: .3rem;
                .sort-item-border {
                    height: 1rem;
                    border-right: .025rem solid $bc;
                }
                .sort-icon {
                    vertical-align: middle;
                    transition: all .3s;
                    fill: #666;
                }
            }
        }
        .choose_type {
            .sort-item-container {
                .category_title {
                    color: $blue;
                }
                .sort-icon {
                    transform: rotate(180deg);
                    fill: $blue;
                }
            }
        }
        .showList-enter, .showList-leave-active {
            opacity: 0;
            transform: translateY(-100%);
        }
        .sort-detail-type {
            width: 100%;
            position: absolute;
            display: flex;
            top: 1.6rem;
            left: 0;
            border-top: .025rem solid $bc;
            background-color: #fff;
        }
        .category-container {
            .category-left {
                flex: 1;
                background-color: #f1f1f1;
                height: 16rem;
                overflow-y: auto;
                span {
                    @include sc(.5rem,#666);
                    line-height: 1.8rem;
                }
                .category-left-li {
                    @include fj;
                    padding: 0 .5rem;
                    .category-icon {
                        @include wh(.8rem,.8rem);
                        vertical-align: middle;
                        margin-right: .2rem;
                    }
                    .category-count {
                        background-color: #ccc;
                        @include sc(.4rem,#fff);
                        padding: 0 .1rem;
                        border: .025rem solid #ccc;
                        border-radius: .8rem;
                        vertical-align: middle;
                        margin-right: .25rem;
                    }
                    .category-arrow {
                        vertical-align: middle;
                    }
                }
            }
            .category_active {
                background-color: #fff;
            }

        }
    }

</style>
<script>
    import {mapState,mapMutations} from 'vuex'
    import headTop from '../../components/header/head'
    import {foodCategory,msiteAdress} from  '../../service/getData'
    import {getImgPath} from '../../components/common/mixin'
    export default {
        data() {
            return {
                foodTitle: '', // 排序左侧头部标题
                headTitle: '', // 标题
                restaurant_category_id: '', // 食品类型id值
                sortBy: '', // 筛选的条件
                category: null,// category分类左侧数据
            }
        },
        computed: {
            ...mapState([
                'latitude','longitude'
            ])
        },
        mounted() {
            this.initData();
        },
        components: {
            headTop,
        },
        mixins: [getImgPath],
        methods: {
            ...mapMutations([
                'RECORD_ADDRESS'
            ]),
            async initData() {
                this.headTitle = this.$route.query.title;
                this.foodTitle = this.headTitle;
                this.geohash = this.$route.query.geohash;
                this.restaurant_category_id = this.$route.query.restaurant_category_id;
                //防止刷新页面时，vuex状态丢失，经度纬度需要重新获取，并存入vuex
                if (!this.latitude) {
                    //获取位置信息
                    let res = await msiteAdress(this.geohash);
                    // 记录当前经度纬度进入vuex
                    this.RECORD_ADDRESS(res);
                }
                // 获取category分类左侧数据
                this.category = await foodCategory(this.latitude,this.longitude);
            }

        }

    }
</script>
