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
            </div>
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
            </div>
            <div class="sort-item" :class="{choose_type:sortBy == 'activity'}">
                <div class="sort-item-container" @click="chooseType('activity')">
                    <span :class="{category_title:sortBy == 'activity'}">
                            筛选
                    </span>
                    <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort-icon">
                            <polygon points="0,3 10,3 5,8"/>
                    </svg>
                </div>
                <transition name="showList">
                    <section v-show="sortBy == 'activity'" class="sort-detail-type filter-container">
                        <section style="width:100%">
                            <header class="filter-header-style">配送方式</header>
                            <ul class="filter-ul">
                                <li v-for="item in delivery" :key=item.id class="filter-li"
                                    @click="selectDeliveryMode(item.id)">
                                    <svg :style="{opacity: (item.id == 0)&&(delivery_mode !== 0)? 0: 1}">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" :xlink:href="delivery_mode == item.id? '#selected':'#fengniao'"></use>
                                    </svg>
                                    <span :class="{selected_filter: delivery_mode == item.id}">{{item.text}}</span>
                                </li>
                            </ul>
                        </section>
                        <section style="width:100%">
                            <header class="filter-header-style">商家属性（可以多选）</header>
                            <ul class="filter-ul" style="paddingBottom:.5rem">
                                <li v-for="(item,index) in activity" :key="item.id" class="filter-li"
                                    @click="selectSupportIds(index,item.id)">
                                    <svg v-show="support_ids[index].status" class="activity-svg">
                                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#selected"></use>
                                    </svg>
                                    <span class="filter-icon" :style="{color:'#' + item.icon_color,borderColor: '#' + item.icon_color}"
                                          v-show="! support_ids[index].status">
                                        {{item.icon_name}}
                                    </span>
                                    <span :class="{selected_filter: support_ids[index].status}">{{item.name}}</span>

                                </li>
                            </ul>
                        </section>
                        <footer class="confirm-filter">
                            <div class="clear-all filter-button-style" @click="clearAll">清空</div>
                            <div class="confirm-select filter-button-style" @click="confirmSelectFun">
                            确定<span v-show="filterNum">({{filterNum}})</span>
                        </div>
                        </footer>
                    </section>
                </transition>
            </div>
        </section>
        <transition name="showcover">
            <div class="back-cover" v-show="sortBy"></div>
        </transition>
        <section class="shop-list-container">
            <shop-list :geohash="geohash" :restaurantCategoryId="restaurant_category_id"
                       :restaurantCategoryIds="restaurant_category_ids" :sortByType='sortByType'
                       :deliveryMode="delivery_mode" :confirmSelect="confirmStatus"
                       :supportIds="support_ids" v-if="latitude"  @DidConfrim="clearAll">
            </shop-list>
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

        .filter-container {
            flex-direction: column;
            align-items: flex-start;
            min-height: 10.6rem;
            background-color: #f1f1f1;
            .filter-header-style {
                @include sc(0.4rem, #333);
                line-height: 1.5rem;
                height: 1.5rem;
                text-align: left;
                padding-left: .5rem;
                background-color: #fff;
            }
            .filter-ul {
                display: flex;
                flex-wrap: wrap;
                padding: 0 .5rem;
                background: #fff;
                .filter-li {
                    display: flex;
                    align-items: center;
                    border: 0.025rem solid #eee;
                    @include wh(4.7rem, 1.4rem);
                    margin-right: .25rem;
                    border-radius: .125rem;
                    padding: 0 .25rem;
                    margin-bottom: .25rem;
                    svg{
                        @include wh(.8rem, .8rem);
                        margin-right: 0.125rem;
                    }
                    span{
                        @include sc(0.4rem, #333);
                    }
                    .filter-icon {
                        @include wh(.8rem,.8rem);
                        font-size: .5rem;
                        border: 0.025rem solid $bc;
                        border-radius: 0.15rem;
                        margin-right: .25rem;
                        line-height: .8rem;
                        text-align: center;
                    }
                    .activity-svg{
                        margin-right: .25rem;
                    }
                    .selected_filter{
                        color: $blue;
                    }

                }
            }
            .confirm-filter {
                display: flex;
                background-color: #f1f1f1;
                width: 100%;
                padding: .3rem .2rem;
                .filter-button-style {
                    @include wh(50%,1.8rem);
                    font-size: .8rem;
                    line-height: 1.8rem;
                    border-radius: .2rem;
                }
                .clear-all {
                    background-color: #fff;
                    margin-right: .5rem;
                    border: .025rem solid #fff;
                }
                .confirm-select{
                    background-color: #56d176;
                    color: #fff;
                    border: 0.025rem solid #56d176;
                    span{
                        color: #fff;
                    }
                }
            }
        }
    }

    .showcover-enter-active,.showcover-leave-active {
        transition: opacity .3s;
    }
    .showcover-enter, .showcover-leave-active {
        opacity: 0
    }
    .back-cover {
        position: fixed;
        @include wh(100%,100%);
        z-index: 10;
        background: rgba(0,0,0,.3);
    }
</style>
<script>
    import {mapState,mapMutations} from 'vuex'
    import headTop from '../../components/header/head'
    import shopList from '../../components/common/shoplist'
    import {foodCategory,msiteAdress,foodDelivery,foodActivity} from  '../../service/getData'
    import {getImgPath} from '../../components/common/mixin'
    export default {
        data() {
            return {
                geohash: '',
                foodTitle: '', // 排序左侧头部标题
                headTitle: '', // 标题
                restaurant_category_id: '', // 食品类型id值
                restaurant_category_ids: '', // 筛选类型的id
                sortByType: null, // 根据何种方式排序
                sortBy: '', // 筛选的条件
                category: null,// category分类左侧数据
                categoryDetail: [],
                delivery: null, // 配送方式数据
                activity: null, // 商家支持活动数据
                delivery_mode: null, // 选中的配送方式
                support_ids: [], // 选中的商铺活动列表
                filterNum: 0, // 所选中的所有样式的集合
                confirmStatus: false, // 确认选择
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
            headTop,shopList
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
                this.restaurant_category_id = this.$route.query.restaurant_category_id + '';
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
                //获取筛选列表的配送方式
                this.delivery = await foodDelivery(this.latitude,this.longitude);
                this.activity = await foodActivity(this.latitude,this.longitude);
                this.activity.forEach((item,index) => {
                    this.support_ids[index] = {
                        status: false,
                        id: item.id,
                    }
                })
            },
            //选中Category右侧列表的某个选项时，进行筛选，重新获取数据并渲染
            getCategoryIds(id, name) {
                this.restaurant_category_ids = id + '';
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
                    this.restaurant_category_id = id + '';
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
            },

            // 筛选选项中的配送方式选择
            selectDeliveryMode(id) {
                console.log(this.delivery_mode ,id,this.filterNum)
                // delivery_mode为空时，选中当前项，并且filterNum加一
                if (this.delivery_mode === null) {
                    this.filterNum ++;
                    this.delivery_mode = id + '';
                // delivery_mode为当前已有值时，清空所选项，并且filterNum减一
                } else if(this.delivery_mode == id) {
                    this.filterNum --;
                    this.delivery_mode = null;
                // delivery_mode已有值且不等于当前选择值，则赋值delivery_mode为当前所选id
                } else {
                    this.delivery_mode = id + '';
                }
            },

            // 点击商家活动，状态取反
            selectSupportIds(index,id) {
                // 数组替换新的值
                this.support_ids.splice(index, 1, {status: ! this.support_ids[index].status, id: id});
                this.filterNum = this.delivery_mode == null ? 0 : 1;
                this.support_ids.forEach(item => {
                    if (item.status) {
                        this.filterNum ++ ;
                    }
                })
            },
            clearAll() {
                this.delivery_mode = null;
                this.support_ids.map(item => item.status = false)
                this.filterNum = 0;
            },
            // 点击确认时，将需要筛选的id值传递给子组件，并且收回列表
            confirmSelectFun() {
                //状态改变时，因为子组件进行了监听，会重新获取数据进行筛选
                this.confirmStatus = ! this.confirmStatus;
                this.sortBy = '';
            }
        }
    }
</script>
