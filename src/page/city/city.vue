<template>
    <div class='city-container'>
        <head-top :head-title="cityname" :go-back='true'>
            <router-link to="/home" slot="changecity" class="change-city">切换城市</router-link>

        </head-top>
        <form class="city-form" v-on:submit.prevent>
            <div>
                <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city-input input-style" required v-model="inputValue">
            </div>
            <div>
                <input type="submit" name="submit" class="city-submit input-style" @click="postpois">
            </div>
        </form>
        <header v-if="historytitle" class="pois-search-history">搜索历史</header>
        <ul class="getpois-ul">
            <li v-for="(item, index) in placelist" @click='nextpage(index, item.geohash)' :key="index">
                <h4 class="pois-name ellipsis">{{item.name}}</h4>
                <p class="pois-address ellipsis">{{item.address}}</p>
            </li>
        </ul>
        <div class="search-none-place" v-if="placeNone">很抱歉！无搜索结果</div>
    </div>
</template>
<style lang="scss" scoped>
    @import '../../style/mixin';
    .city-container {
        padding-top: 2.35rem;
    }
    .change-city {
        right: .4rem;
        @include sc(.6rem,#fff);
        @include ct
    }
    .city-form {
        background-color: #fff;
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-top: .4rem;
        div {
            width: 90%;
            margin: 0 auto;
            text-align: center;
            .input-style {
                border-radius: .1rem;
                margin-bottom: .4rem;
                @include wh(100%, 1.4rem);
            }
            .city-input {
                border: 1px solid $bc;
                padding: 0 .3rem;
                @include sc(.65rem,#333);
            }
            .city-submit {
                background-color: $blue;
                @include sc(.65rem,#fff);
            }
        }
    }
    .pois-search-history {
        border-top: 1px solid $bc;
        border-bottom: 1px solid $bc;
        padding-left: .5rem;
        @include font(.475rem,.8rem);
    }
    .getpois-ul {
        background-color: #fff;
        border-top: 1px solid $bc;
        li {
            margin: 0 auto;
            padding-top: .65rem;
            border-bottom: 1px solid $bc;
            .pois-name {
                margin: 0 auto .35rem;
                width: 90%;
                @include sc(.65rem,#333);
            }
            .pois-address {
                width: 90%;
                margin: 0 auto .55rem;
                @include sc(.45rem,#999);
            }
        }
    }

    .search-none-place {
        margin: 0 auto;
        @include font(.65rem,1.75rem);
        color: #333;
        background-color: #fff;
        text-indent: .75rem;
    }
</style>
<script>
    import headTop from '../../components/header/head'
    import {currentcity,searchplace} from '../../service/getData'
    import {setStore,getStore} from '../../config/mUtils'
    export default ({
        data() {
            return {
                inputValue: '', // 搜索地址
                cityid: '', // 当前城市id
                cityname: '', // 当前城市名字
                placelist:[], // 搜索城市列表
                placeHistory:[], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false, // 搜索无结果，显示提示信息
            }
        },
        mounted() {
            this.cityid = this.$route.params.cityid;
            currentcity(this.cityid).then((res) => {
                this.cityname = res.name;
            })
            // 获取搜索记录
            if (getStore('placeHistory')) {
                //console.log(JSON.parse(getStore('placeHistory')))
                this.placelist = JSON.parse(getStore('placeHistory'));
            }
        },

        components: {
            headTop,
        },
        methods: {
            // 发送搜索信息inputVaule
            postpois() {
                if (this.inputValue) {
                    searchplace(this.cityid,this.inputValue).then(res => {
                        this.historytitle = false;
                        this.placelist = res;
                        this.placeNone = res.length ? false : true;
                    })
                }
            },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index,geohash) {
                let history = getStore('placeHistory');
                let choosePlace = this.placelist[index];
                if (history) {
                    let checkreapt = false;
                    this.placeHistory = JSON.parse(history);
                    this.placeHistory.forEach(item => {
                        if (item.geohash == geohash) {
                            checkreapt = true;
                        }
                    })
                    ! checkreapt && this.placeHistory.push(choosePlace);
                } else {
                    this.placeHistory.push(choosePlace);
                }
                setStore('placeHistory',this.placeHistory);
                this.$router.push({path:'/msite', query:{geohash}})
            }
        }
    })
</script>
