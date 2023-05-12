<script setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

defineProps({
    'comics':{
        type: Array,
        required: true
    },
    'autoplayTime': {
        type: Number,
        default: 3000 
    }
})


const settings = {
        itemsToShow: 1.8,
        snapAlign: 'start',
    }
    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
const bannerBreakpoints = {
    550: {
        itemsToShow: 2.5,
        snapAlign: 'start',
    },
    700: {
        itemsToShow: 3.3,
        snapAlign: 'start',
    },
    850: {
        itemsToShow: 4.3,
        snapAlign: 'start',
    },
    // 1024 and up
    1024: {
        itemsToShow: 5.3,
        snapAlign: 'start',
    }
}



</script>


<template>
    <div class="comics-slider">
        <Carousel
            v-bind="settings" :breakpoints="bannerBreakpoints"
            :autoplay="autoplayTime" :wrap-around="true" 
        >
            <Slide v-for="comic in comics" :key="comic.id">
                <div class="carousel__itemddf">
                    <Comic
                        :comic="comic"
                        >
                    </Comic>
                </div>
            </Slide>

            <template #addons>
                <Navigation />
            </template>

        </Carousel>
    </div>
</template>


<style lang="scss">
.comics-slider{
    
    .carousel__slide {
        align-items:flex-start;
    }

    .carousel__prev,
    .carousel__next {
        margin-top: -20px;
        box-sizing: content-box;
        color: white;
    }
}


</style>
