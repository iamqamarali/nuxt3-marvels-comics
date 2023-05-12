<script setup>
const route = useRoute()
const marvelApi = useMarvelApi();

const getThumbnail = useMarvelApi().getThumbnail

const character = useState(() => null)

onMounted(async () => {
    let {data } = await marvelApi.getSingleCharacter(route.params.id)
    console.log(data);
    character.value = data.results[0]

    let { data:evts} = await marvelApi.getEventsByCharacter(route.params.id)
    console.log(evts);
})

</script>


<template>
    <div class="single-character-page" v-if="character">

        <section class="details-section">
            <div class="custom-container">
                <img :src="getThumbnail(character.thumbnail)" class="character-image img-fluid" alt="">

                <div class="details-wrapper">
                    <h1 class="character-name">{{ character.name }}</h1>
                </div>
            </div>
        </section>

        <!-- More Info Section -->
        <section class="more-info-section ">
            <div class="custom-container">

                <h4 class="info-title">Biography</h4>
                <div class="info-content opacity-75 ">
                    <p>{{  character.description  }}</p>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. 
                    </p>
                    <p>
                        here are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
                    </p>
                    <p>
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>

                <h4 class="info-title">Description</h4>
                <div class="info-content opacity-75 ">
                    <p>{{  character.description  }}</p>                    
                    <!-- <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> -->
                </div>
            </div>
        </section>

    </div>
</template>
