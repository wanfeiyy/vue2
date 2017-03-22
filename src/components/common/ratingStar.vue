<template>
    <div class="rating-container">
        <section class="star-container">
            <svg class="grey-fill" v-for="num in 5" :key="num">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
            </svg>
        </section>
        <div :style="'width:' + rating*2/5 + 'rem'" class="star-overflow">
            <section class="star-container">
                <svg  class="orange-fill" v-for="num in 5" :key="num">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
                </svg>
            </section>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    @import "../../style/mixin";
    .rating-container {
        position: relative;
        @include wh(2rem,.4rem);
        .star-overflow {
            overflow: hidden;
            position: relative;
            height: 100%;
        }
        .star-container {
            position: absolute;
            display: flex;
            @include wh(2rem,.4rem);
            top: -.02rem;
            left: -.02rem;
            .grey-fill {
                fill: #d1d1d1;
            }
            .orange-fill {
                fill: #ff9a0d;
            }

        }
    }
</style>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            "rating": {
                type: Number,
                default() {
                    return 0
                }
            }
        },
        mounted() {

        },

    }
</script>
