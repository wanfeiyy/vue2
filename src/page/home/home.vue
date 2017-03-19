<template>
    <div>
        <head-top>
            <span slot='logo' class="head_logo">ele.me</span>
        </head-top>
        <nav class="city-nav">
            <div class="city-tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <div class="guess-city">
                <span>{{guessCity}}</span>
                <svg class="arrow-right">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </div>
        </nav>
        <section id="hot-city-container">
            <h4 class="city-title">热门城市</h4>
            <ul class="citylistul clear">
                <router-link  tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter-classirf">
                <li class="letter-classify-li" v-for="(value,key,index) in sortgroupcity" :key="key">
                    <h4 class="city-title">
                        {{key}} <span v-if="index === 0">按字母排序</span>
                    </h4>
                    <ul class='groupcity_name_container citylistul clear'>
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>

            </ul>

        </section>
    </div>
</template>
<style lang="scss" scoped>
    @import '../../style/mixin';
    .head_logo {
        left: 0.4rem;
        font-weight: 400;
        @include sc(0.7rem, #fff);
        @include wh(2.3rem, 0.7rem);
        @include ct;
    }
    .city-nav {
        padding-top: 2.35rem;
        border-top: 1px solid $bc;
        background-color: #fff;
        margin-bottom: 0.4rem;
        .city-tip {
            @include fj;
            line-height: 1.45rem;
            padding: 0 0.45rem;
            span:nth-of-type(1) {
                @include sc(0.55rem, #666);
            }
            span:nth-of-type(2) {
                font-weight: 900;
                @include sc(0.475rem, #9f9f9f);
            }
        }
        .guess-city {
            @include fj;
            align-items: center;
            height: 1.8rem;
            padding: 0 0.45rem;
            border-top: 1px solid $bc;
            border-bottom: 2px solid $bc;
            @include font(0.75rem, 1.8rem);
            span:nth-of-type(1) {
                color: $blue;
            }
            .arrow-right {
                @include wh(.6rem,.6rem);
                fill: #999;
            }
        }
    }
    #hot-city-container {
        background-color: #fff;
        border-bottom: .4rem;
    }
    .citylistul {
        li {
            float: left;
            text-align: center;
            color: $blue;
            border-bottom: 0.025rem solid $bc;
            border-right: 0.025rem solid $bc;
            @include wh(25%, 1.75rem);
            @include font(0.6rem, 1.75rem);
        }
        li:nth-of-type(4n){
            border-right: none;
        }
    }
    .city-title {
        color: #666;
        font-weight: 500;
        text-indent: .45rem;
        border-top: 2px solid $bc;
        border-bottom: 1px solid $bc;
        @include font(0.55rem, 1.45rem, "Helvetica Neue");
    }
    .letter-classify-li{
        margin-bottom: 0.4rem;
        background-color: #fff;
        border-bottom: 1px solid $bc;
        .groupcity_name_container{
            li{
                color: #666;
            }
        }
    }
</style>
<script>
    import headTop from '../../components/header/head.vue'
    import {hotcity,cityGuess,groupcity} from '../../service/getData'
    export default {
        data(){
            return{
                guessCity: '',   //当前城市
                guessCityid: '', //当前城市id
                hotcity: [],     //热门城市列表
                groupcity: [],   //所有城市列表
            }
        },
        mounted(){
            //获取热门城市
            hotcity().then(res => {
               this.hotcity = res;
            }),
            cityGuess().then(res => {
                this.guessCity = res.name;
                this.guessCityid = res.id;
            }),
            groupcity().then(res => {
                this.groupcity = res;
            })
        },

        components:{
            headTop
        },

        computed:{
            sortgroupcity() {
                let sortObj = {};
                for (let i = 65; i <= 90; i++) {
                    var char = String.fromCharCode(i);
                    if (this.groupcity[char]) {
                        sortObj[char] = this.groupcity[char]
                    }
                }
                return sortObj;
            }
        },

        methods:{
            //点击图标刷新页面
            reload(){
                window.location.reload();
            }
        },
    }
</script>
