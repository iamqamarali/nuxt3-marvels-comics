<script setup>

const { $debounce } = useNuxtApp();
const marvelApi = useMarvelApi();
const router = useRouter()
const route = useRoute()


const allCharacters = useState('allCharacters', () => [])
const characters = useState('characters', ()=>{})

const search = useState(() => route.query.search || '')
const page = useState(() => 3)
const noMorecharacters = useState(() => false)


/**
 * 
 * fetch characters
 */
const fetchcharacters = async () => {
    let { data } = await marvelApi.getCharacters({
        query:{
            nameStartsWith : search.value ? search.value.toLowerCase() : undefined,
            orderBy : "-modified",
            limit: 30,
            offset: (page.value - 1) * 30,
        }
    })
    if(!data.results.length){
        noMorecharacters.value = true
    }

    data.results = marvelApi.removeWithoutImages(data.results)
    characters.value = data
    //console.log(data)

    allCharacters.value.push(...data.results)

    console.log(allCharacters);
}



// Watch Search
// when customer typesomething then filter search results
watch(search, $debounce(async (val) => {
    // init values
    noMorecharacters.value = false
    page.value = 1
    allCharacters.value = []

    // fetch
    await fetchcharacters()
    router.push({query: {search: val}})
}, 200))


/**
 * 
 * when clicked Load More
 */
const loadMore = $debounce(async () =>{
    page.value++
    noMorecharacters.value = false
    
    await fetchcharacters()
}, 200)



/**
 * fetch characters on mount
 */
onMounted(async () => {        
    if(allCharacters.value.length){
        return
    }

    await fetchcharacters()
})


</script>


<template>
    <main class="all-characters-page py-5">
        <section class="custom-container ">

            <header class="d-flex align-items-center">
                <h2 class="mt-4 mb-5 fw-bold">Characters</h2>
                <form class="d-flex ms-auto">
                    <input class="form-control me-4"  v-model="search" type="search" placeholder="Search" aria-label="Search">
                </form>
            </header>

            
            
            <div class="grid--six-column" v-if="characters">
                <Character
                    v-for="character in allCharacters"    
                    :character="character"
                    :key="character.id"
                    >

                </Character>
            </div>


            <div class="text-center py-5" v-if="noMorecharacters">
                <h4>No More characters</h4>
            </div>
            <div class="text-center py-5" v-else>
                <button class="btn btn-primary" @click="loadMore">Load More</button>
            </div>


        </section>
    </main>
</template>


