<script setup>

const marvelApi = useMarvelApi();
const props = defineProps(['comic'])

const getWritersAndEditors = (comic) => {
    if(!comic.creators || !comic.creators.items.length) return ""

    let items = comic.creators.items.filter((creator) => {
        return creator.role == "writer" || creator.role == "editor"
    })
    let names = items.map(i => i.name ).splice(0,2)
    return names.join(', ')
}

/**
 * 
 * get title page
 */
 const getTitle = (title)=>{
    return title.replace(/\(Variant\)/g,'').replace(/\(Variant Movie\)/g,'')
                .replace(/\([0-9]{4}\)/, '')
                .replace(/#[0-9]?[0-9]/, '')
                .replace(/[0-9]/, '').substring(0, 25)
}

const getUrl = (comic) => {
    if(!comic.urls.length)
        return "#"

    return '/comics/' + comic.id
}

</script>

<template>
    <NuxtLink
        class="comic"
        :to="getUrl(comic)"
        >
        <div class="comic-image-wrapper">
            <img :src="marvelApi.getThumbnail(comic.thumbnail)" class="comic-image">        
        </div>
        <h5 class="comic-title">{{ getTitle(comic.title) }}</h5>
        <div class="comic-author">{{ getWritersAndEditors(comic) }}</div>
    </NuxtLink>
</template>

