<script setup>
defineProps(['comics'])

const marvelApi = useMarvelApi()

</script>

<template>
    <div class="featured-comics">

        <div class="featured-comic"
            v-for="comic in comics"
            :key="comic.id"
            >
            <div class="comic-image-wrapper">
                <img :src="marvelApi.getThumbnail(comic.thumbnail)" class="comic-image">        
            </div>

            <!-- <h5 class="comic-title">{{ comic.title }}</h5> -->

        </div>
    </div>
</template>