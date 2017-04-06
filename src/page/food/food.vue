<template>
    <div class="food-container">
        <head-top :goBack="true" :head-title="headTitle"></head-top>
        <section class="sort-container">
            <div class="sort-item" :class="{choose_type:sortBy == 'food'}" >
                <div class="sort-item-container" @click="chooseType('food')">
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
                                class="category-left-li"  @click="selectCategoryName(item.id, index)"
                                :class="{category_active:restaurant_category_id == item.id}" >
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
                    <section class="category-right">
                        <ul>
                            <li v-for="(item,index) in categoryDetail" :key="item.id"
                                class="category-right-li" @click="getCategoryIds(item.id,item.name)"
                                :class="{category_right_choosed: restaurant_category_ids == item.id || (!restaurant_category_ids)&&index == 0}">
                                <span>{{item.name}}</span>
                                <span>{{item.count}}</span>
                            </li>
                        </ul>
                    </section>
                </section>
            </transition>
            <div class="sort-item" :class="{choose_type:sortBy == 'sort'}">
                <div class="sort-item-container" @click="chooseType('sort')">
                    <div class="sort-item-border">
                        <span :class="{category_title:sortBy == 'sort'}">
                            排序
                        </span>
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
            </div>
            <transition name="showList">
                <section v-show="sortBy == 'sort'" class="sort-detail-type">
                    <ul class="sort-list-container" @click="sortList($event)">
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#default"></use>
                            </svg>
                            <p data="0" :class="{sort_select:sortByType == 0}">
                                <span>智能排序</span>
                                <svg v-if="sortByType == 0">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#distance"></use>
                            </svg>
                            <p data="5" :class="{sort_select: sortByType == 5}">
                                <span>距离最近</span>
                                <svg v-if="sortByType == 5">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#hot"></use>
                            </svg>
                            <p data="6" :class="{sort_select: sortByType == 6}">
                                <span>销量最高</span>
                                <svg v-if="sortByType == 6">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#price"></use>
                            </svg>
                            <p data="1" :class="{sort_select: sortByType == 1}">
                                <span>起送价最低</span>
                                <svg v-if="sortByType == 1">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#speed"></use>
                            </svg>
                            <p data="2" :class="{sort_select: sortByType == 2}">
                                <span>配送速度最快</span>
                                <svg v-if="sortByType == 2">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                        <li class="sort-list-li">
                            <svg>
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#rating"></use>
                            </svg>
                            <p data="3" :class="{sort_select: sortByType == 3}">
                                <span>评分最高</span>
                                <svg v-if="sortByType == 3">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                </svg>
                            </p>
                        </li>
                    </ul>
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
        .showList-enter-active, .showList-leave-active {
            transition: all .6s;
            transform: translateY(0);
        }
        .showList-enter, .showList-leave-active {
            opacity: 0;
            transition: all .6s;
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
                .category_active {
                    background-color: #fff;
                }
            }

            .category-right {
                flex: 1;
                background-color: #fff;
                padding-left: .5rem;
                height: 16rem;
                overflow-y: auto;
                .category-right-li {
                    @include fj;
                    height: 1.8rem;
                    line-height: 1.8rem;
                    padding-right: .5rem;
                    border-bottom: .025rem solid $bc;
                    span {
                        @include sc(.55rem,#666);
                    }

                }
                .category_right_choosed{
                    span{
                        color: $blue;
                    }
                }
            }
        }

        .sort-list-container {
            width: 100%;
            .sort-list-li {
                height: 2.5rem;
                display: flex;
                align-items: center;
                svg {
                    @include wh(0.7rem, 0.7rem);
                    margin: 0 .3rem 0 .8rem;
                }
                p {
                    line-height: 2.5rem;
                    flex: auto;
                    text-align: left;
                    text-indent: .25rem;
                    border-bottom: 0.025rem solid $bc;
                    @include fj;
                    align-items: center;
                    span {
                        color: #666;
                        font-size: .55rem;

                    }
                    .sort_select{
                        span{
                            color: $blue;
                        }
                    }
                }
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
                restaurant_category_ids: '', // 筛选类型的id
                sortByType: null, // 根据何种方式排序
                sortBy: '', // 筛选的条件
                category: null,// category分类左侧数据
                categoryDetail: []
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
                this.category.forEach(item => {
                    if (this.restaurant_category_id == item.id) {
                        this.categoryDetail = item.sub_categories;
                    }
                })
            },
            //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
            getCategoryIds(id, name) {
                this.restaurant_category_id = id;
                this.sortBy = '';
                this.foodTitle = this.headTitle = name;
            },
            //选中Category左侧列表的某个选项时，右侧渲染相应的sub_categories列表
            selectCategoryName(id,index) {
                // 第一个选项 -- 全部商家 因为没有自己的列表，所以点击则默认获取选所有数据
                if (index == 0) {
                    this.restaurant_category_ids = '';
                    this.sortBy = '';
                    this.foodTitle = this.headTitle
                } else {
                    this.restaurant_category_id = id;
                    this.categoryDetail = this.category[index].sub_categories;
                }

            },
            // 点击顶部三个选项，展示不同的列表，选中当前选项进行展示，同时收回其他选项
            async chooseType(type) {
                if (this.sortBy !== type) {
                    this.sortBy = type;
                    if (type == 'food') {
                        this.foodTitle = '分类';
                    } else {
                        this.foodTitle = this.headTitle;
                    }
                } else {
                    // 再次点击相同选项时收回列表
                    this.sortBy = '';
                    if (type == 'food') {
                        //将foodTitle 和 headTitle 进行同步
                        this.foodTitle = this.headTitle;
                    }
                }
            },
            sortList(event) {
                if (event.target.hasAttribute('data')) {
                    this.sortByType = event.target.getAttribute('data')
                } else {
                    this.sortByType =  event.target.parentNode.getAttribute('data')
                }

                this.sortBy = '';
            }
        }
    }
</script>
