<template>
    <div class="shoplist-container">
        <ul  v-if="shopListArr.length" type="1">
            <router-link v-for="item in shopListArr" :key="item.id"  :to="{path:'shop',query:{geohash,id:item.id}}" tag='li' class="shop-li">
                <section>
                    <img :src="getImgPath(item.image_path)" class="shop-img">
                </section>
                <hgroup class="shop-right">
                    <header class="shop-header-detail">
                        <h4 class="shop-title ellipsis">
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
<style>

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
