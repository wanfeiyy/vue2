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
                        <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                            <polygon points="0,3 10,3 5,8"/>
                        </svg>
                    </div>
                </div>
            </div>
            <transition name="showList" v-show="category">
                <section v-show="sortBy == 'food'" class="category-container-sort-detail-type">
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
                                    <svg v-if="index" width="8" height="8" xmlns="http://www.w3.org/2000/svg" version="1.1" class="category_arrow" >
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
<style>
</style>
<script>
    import headTop from '../../components/header/head'
    import {getImgPath} from '../../components/common/mixin'
    export default {
        data() {
            return {
                headTitle: '', // 标题
                sortBy: '', // 筛选的条件
                category: null,// category分类左侧数据
            }
        },
        mounted() {
            this.initData();
        },
        components: {
            headTop,
        },
        mixins: [getImgPath],
        methods: {
            async initData() {
                this.headTitle = this.$route.query.title;;
            }

        }

    }
</script>
