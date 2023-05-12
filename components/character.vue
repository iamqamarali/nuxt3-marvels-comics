<script setup>

const marvelApi = useMarvelApi();
const props = defineProps(['character'])


/**
 * 
 * move to character page
 */

</script>

<template>
    <NuxtLink 
    class="character"
    :to="'/characters/'+character.id">
        <div class="character-image-wrapper">
            <img :src="marvelApi.getThumbnail(character.thumbnail)" class="character-image">        
        </div>
        <div class="character-content">
            <h5 class="character-name">{{ character.name }}</h5>
        </div>

    </NuxtLink>
</template>

