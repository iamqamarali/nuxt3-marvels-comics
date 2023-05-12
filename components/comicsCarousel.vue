<script setup>
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'

const marvelApi = useMarvelApi();

defineProps({
    comics : {
        type: Array,
        default: []
    }
})


let settings = {  
    itemsToShow: 1,
    snapAlign: 'center', 
}

const getCreators = (comic) => {
    let creators = comic.creators.items.map(creator => creator.name)
    return creators.join(', ')
}

const getTitle = (title)=>{
    return title.replace(/\(Variant\)/g,'').replace(/\(Variant Movie\)/g,'')
                .replace(/\([0-9]{4}\)/, '')
                .replace(/#[0-9]?[0-9]/, '')
                .replace(/[0-9]/, '')
}
const getYear = (title)=>{
    let year = title.match(/\(([^)]+)\)/)[1];
    return year;
}

</script>


<template>
    <div class="comics-carousel">
        <Carousel
            v-bind="settings"
            :autoplay="3000"
            :wrap-around="true"

            >
            <Slide v-for="(comic, index) in comics" :key="comic">
                <div class="carousel__item" :id="comic.id" >
                    
                    <div class="custom-container">
                        <div class="comic-info text-white">
                            <div class="mb-4 mb-sm-4 fw-bold d-none d-sm-block">{{ getYear(comic.title) }}</div>

                            <h1 class="title mb-xs-2 mb-sm-2">{{ getTitle(comic.title) }}</h1> 
                            <p class="subtitle">
                                <b>Creators: </b>
                                {{ getCreators(comic) }}
                            </p>

                            <button class="btn btn-primary mt-5 d-none d-sm-inline-block">First look</button>

                        </div>

                        <div class="comic">
                            <div class="comic-image-wrapper">
                                <img :src="marvelApi.getThumbnail(comic.thumbnail)" class="comic-image">        
                            </div>
                        </div>
                    </div>

                </div>
            </Slide>

            <template #addons>
                <Navigation />
                <Pagination />
            </template>

        </Carousel>
    </div>
</template>
