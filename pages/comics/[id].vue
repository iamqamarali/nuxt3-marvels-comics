<script setup>
const { $randomNumberBetween } = useNuxtApp();
const route = useRoute()
const marvelApi = useMarvelApi();

const {
    getCoverArtist,
    getPenciler,
    getWriter,
    getFocDate,
    getTitle
} = useComics()


const comic = useState( () => {})
const moreComics = useState(() => {})
onMounted(async () => {
    let { data } = await marvelApi.getSingleComic(route.params.id);
    comic.value = data.results[0]

    // more comics like this
    let { data: moreComicsData } = await marvelApi.getComics({
        query:{
            titleStartsWith: comic.value.title.split(' ')[0],
            format : "comic",
            formatType : "comic",
            noVariants : true,
            limit: 10,
        }
    });

    moreComicsData.results = marvelApi.removeWithoutImages(moreComicsData.results)
    moreComics.value = moreComicsData.results
})

</script>


<template>
    <div class="single-comic-page" v-if="comic">

        <section class="comic-details-section ">
            <!-- Background Blured Image -->
            <div class="comic-details-background-wrapper">
                <img :src="marvelApi.getThumbnail(comic.thumbnail)" alt="">
            </div>

            <!-- More Information -->
            <section class="comic-info-wrapper ">
                <div class="custom-container">
                    <div class="row main-row">
                        <!--  comic image column -->
                        <div class="col-auto comic-image-column">
                            <img class="img-fluid" :src="marvelApi.getThumbnail(comic.thumbnail)" alt="" >
                        </div>
                        <!-- comic info column -->
                        <div class="col-md">
                            <div class="comic-info">
                                <div class="comic-info-box">
                                    <h3 class="comic-title mb-0">{{ comic.title }}</h3>
                                </div>
                                <div class="comic-info-box">
                                    <h5 class="info-title mb-0">Published: </h5>
                                    <p class="info-text mb-0">May 10, 2023</p>
                                </div>

                                <div class="row ">
                                    <div class="col-sm-6">
                                        <div class="comic-info-box">
                                            <h5 class="info-title mb-0">Writer: </h5>
                                            <p class="info-text mb-0">{{ getWriter(comic) }}</p>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="comic-info-box">
                                            <h5 class="info-title mb-0">Penciler: </h5>
                                            <p class="info-text mb-0">{{ getPenciler(comic) }}</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="comic-info-box">
                                    <h5 class="info-title mb-0">Cover Artist: </h5>
                                    <p class="info-text mb-0">{{ getCoverArtist(comic) }}</p>
                                </div>

                                <div class="row">
                                    <div class="col-lg-8">
                                        <div class="comic-info-description">
                                            {{ comic.description }}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> 
            </section> 

        </section>


        <!--  More Details -->
        <section class="more-details-section">
            <div class="custom-container">
                <h4 class="roboto-condensed fw-semibold section-heading">More Details</h4>
                
                <div class="row ">
                    <div class="col-md-4 more-details-inner-column">
                        <h6 class="heading">EXTENDED CREDITS AND INFO</h6>
                        <ul>
                            <li><b>Rating</b> Rated {{ ['T', 'T+'][$randomNumberBetween(0,1)] }}</li>
                            <li><b>Format</b> Comic</li>
                            <li><b>Price</b> ${{ $randomNumberBetween(2,9) }}.99</li>
                            <li><b>UPC</b> {{ comic.upc }}</li>
                            <li><b>FOC Date</b> {{ getFocDate(comic) }}</li>
                        </ul>
                    </div>
                    <div class="col-md-4 more-details-inner-column">
                        <h6 class="heading">STORIES</h6>
                        <ul >
                            <li
                                v-for="creator in comic.creators.items"
                                :key="creator.name"
                            >
                                <b>{{ creator.role.charAt(0).toUpperCase() +  creator.role.slice(1) }}</b> 
                                {{ creator.name }}
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-4 more-details-inner-column">
                        <h6 class="heading">COVER INFORMATION</h6>
                        <ul>

                            <li><b>Colorist (cover)</b> Lee Garbett</li>
                            <li><b>Inker (cover)</b> Lee Garbett</li>
                            <li><b>Editor:</b> Darren Shan</li>
                        </ul>
                    </div>
                </div>

            </div>
        </section>


        <section class="more-comics-section">
            <div class="custom-container">
                <h4 class="fw-semibold roboto-condensed section-heading ">More Like {{ getTitle(comic.title) }}</h4>

                <div class="grid--five-column ">
                    <Comic
                        v-for="comic in moreComics"
                        :key="comic.id"
                        :comic="comic"
                    >
                    </Comic>
                </div>

                <div class="mt-5 text-center">
                    <NuxtLink to="/comics" class="btn btn-primary">Find More COmics</NuxtLink>
                </div>

            </div>
        </section>



    </div>
</template>

