export default defineNuxtConfig({

    runtimeConfig:{
        api_secret: process.env.api_secret,
        public:{
            api_base_url : process.env.api_base_url,
            api_key: process.env.api_key,
        }
    }
})
