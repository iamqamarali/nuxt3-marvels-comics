export default defineNuxtConfig({

    runtimeConfig:{
        api_secret: process.env.api_secret,
        public:{
            api_key: process.env.api_key,
        }
    }
})
