
export default () => {
    const config = useRuntimeConfig()
    let base_url = config.public.api_base_url
    let api_key = config.public.api_key


    return {
        base_url,
        api_key,



        /**
         * 
         * 
         */
        removeWithoutImages(data){
            return data.filter(item => {
                return item.thumbnail.path.indexOf('image_not_available') == -1
            })
        },

        /**
         * 
         * 
         */
        async makeRequest(url, options = {}){
            let ops = Object.assign({
                method : 'GET',
                baseURL: base_url,
                query:{

                }
            }, options)

            ops.query.apikey = api_key;

            return await $fetch(url, ops)
        },


        /**
         * 
         * 
         */
        getThumbnail(thumbnail){
            return thumbnail.path.concat('/portrait_uncanny', '.', thumbnail.extension)
        },


        /**
         * 
         * 
         */
        async getCharacters(options = {}){
            let url = '/v1/public/characters'
            return await this.makeRequest(url, options)
        },

        /**
         * 
         * 
         */
        async getSingleCharacter(id){
            let url = '/v1/public/characters/' + id
            return await this.makeRequest(url)
        },
        

        /**
         * 
         * 
         */
        async getComics(options = {}) {            
            let url = '/v1/public/comics'
            return await this.makeRequest(url, options)
        },


        /***
         * 
         * 
         */
        async getSingleComic(id){
            let url = '/v1/public/comics/' + id
            return await this.makeRequest(url)
        },


        /**
         * get stories by Comics
         * 
         */
        async getStoriesByComic(id){
            let url = '/v1/public/comics/' + id + '/stories'
            return await this.makeRequest(url)
        },


        /**
         * Events by Comics
         * 
         */
        async getEventsByComic(id){
            let url = '/v1/public/comics/' + id + '/events'
            return await this.makeRequest(url)
        },



        /**
         * 
         * Events By Characters
         */
        async getEventsByCharacter(id){
            let url = '/v1/public/characters/' + id + '/events'
            return await this.makeRequest(url)
        },


    }
}