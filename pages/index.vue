<script setup>

const marvelApi = useMarvelApi();
const featuredComics = useState('featuredComics', () => [])


/**
 *  fetch featured characters
 */
const featureCharacters = useState('featureCharacters', ()=>{})
const fetchfeatureCharacters = async () => { 
    let{ data } = await marvelApi.getCharacters({
        query:{
            orderBy : "-modified",
            limit: 20,
            offset: 80,
        }
    })
    data.results = marvelApi.removeWithoutImages(data.results).slice(0,6)
    featureCharacters.value = data
}




/**
 * fetch banner comics
 */
const carouselComics = useState('carouselComics',() => [])
const sliderComics = useState('sliderComics', () => [])
const bestSellingComics = useState('bestSellings', () => [])
const fetchBannerComics = async () => {
    let  { data } =  await useFetch('/api/comics/banner', {
        cache: false
    })

    return Array.from(data.value.data);
}

fetchBannerComics().then((data)=> carouselComics.value = data)
fetchBannerComics().then( data => sliderComics.value = data)



const fetchbestSellingComics = async () =>{
    const {data} = await marvelApi.getComics({
        query:{
            formatType : "comic",
            noVariants : true,
            dateDescriptor : "lastWeek",
            orderBy : "-issueNumber",
            limit: 30,
            offset: 0,
        }
    })

    data.results = marvelApi.removeWithoutImages(data.results)
    bestSellingComics.value = data.results

}



/**
 * 
 * init page
 */

onMounted(async function(){    
    fetchfeatureCharacters();   
    fetchbestSellingComics();
})



let chooseFrom = [
    "captian america",
    "hulk",
    "iron man",
    "black panther",
    "captain marvel",
    "wolverine",
    "hawkeye",
    "deadpool",
    "deadpool",
    "punisher",
    "punisher",
    "groot",
    "loki",
    "thor",
    "doctor strange"
]



</script>

<template>
    <div class="home-page">

        <!-- TOP HERO BANNER -->
        <ComicsCarousel
            :comics="carouselComics"    
        >
        </ComicsCarousel>

        <!-- fEATURED CHARACTERS -->
        <section class="custom-container mt-5 pt-2 pt-sm-5">
            <header class=" mb-5">
                <h3 class="roboto-condensed fw-semibold text-primary-gradient">FEATURED CHARACTERS</h3>
                <p>Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!</p>
            </header>

            <div class="grid--six-column" v-if="featureCharacters" >
                <Character
                    v-for="character in featureCharacters.results"    
                    :character="character"
                    :key="character.id"
                    >
                </Character>
            </div>
        </section>

        <!-- New Releases -->
        <section class="my-5 custom-container ">
            <header class=" mb-5">
                <h3 class="roboto-condensed fw-semibold text-primary-gradient">THIS WEEKS - NEW RELEASES</h3>
            </header>


            <ComicsSlider
                :comics="bestSellingComics"   
                :autoplayTime="2000" 
                >
            </ComicsSlider>
        </section>


        <!-- fEATURED COMICS -->
        <section class="my-5 custom-container ">
            <header class=" mb-5">
                <h3 class="roboto-condensed fw-semibold text-primary-gradient">FEATURED COMICS</h3>
            </header>


            <ComicsSlider
                :autoplayTime="3000" 
                :comics="sliderComics"    
                >
            </ComicsSlider>
        </section>

                    
        
    </div>
</template>
