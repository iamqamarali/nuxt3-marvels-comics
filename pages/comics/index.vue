<script setup>


const { $debounce } = useNuxtApp();
const router = useRouter()
const route = useRoute()


const marvelApi = useMarvelApi()
const allComics = useState('allComics', () => [])
const comics = useState('comics', ()=>{})
const search = useState(() => route.query.search || '')
const page = useState(() => 2)
const limit = useState(() => 20)
const noMoreComics = useState(() => false)


// Fetch Comics
const fetchComics = async () => {

    let { data: c } = await marvelApi.getComics({
        query:{
            titleStartsWith : search.value ? search.value.toLowerCase() : undefined,
            format : "comic",
            formatType : 'comic',
            noVariants : true,
            orderBy: "-focDate",
            limit: limit.value,
            offset: page.value * limit.value,
        }
    })
    if(!c.results.length){
        noMoreComics.value = true
    }

    c.results = marvelApi.removeWithoutImages(c.results)
    comics.value = c
    //console.log(c)

    allComics.value.push(...c.results)

    return { 
        comics: c
    }
}


// Watch Search
// when customer typesomething then filter search results
watch(search , $debounce(async (val) => {
    // init values
    noMoreComics.value = false
    page.value = 1
    allComics.value = []

    router.push({query: {search: val}})
    // fetch
    await fetchComics()
}, 200))


// when page changes
const loadMore = $debounce(async () =>{
    page.value++
    noMoreComics.value = false
    
    await fetchComics()
}, 200)




/**
 * fetch comics on mount
 */
onMounted(async () => {  
    if(allComics.value.length){
        return 
    }     
    //await fetchComics()
    let {comics} = await fetchComics()

    //console.log(comics);
})


</script>


<template>
    <main class="all-comics-page py-5">
        <section class="custom-container ">

            <header class="d-flex align-items-center">
                <h2 class="mt-4 mb-5 fw-bold">Comics</h2>
                <div class="ms-auto">
                    <input class="form-control "  v-model="search" type="search" placeholder="Search" aria-label="Search">
                </div>
            </header>

            
            
            <div class="grid--five-column" v-if="allComics">
                <Comic
                    v-for="comic in allComics"    
                    :comic="comic"
                    :key="comic.id"
                    :id="comic.id"
                    >
                </Comic>
            </div>


            <div class="text-center py-5" v-if="noMoreComics">
                <h4>No More Comics</h4>
            </div>
            <div class="text-center py-5" v-else>
                <button class="btn btn-primary" @click="loadMore">Load More</button>
            </div>


        </section>
    </main>
</template>


