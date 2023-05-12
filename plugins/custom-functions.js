export default defineNuxtPlugin((nuxtApp) => {

    return {
        provide: {
            
            debounce : (func, wait) => {
                let timeout;
                return function (...args) {
                    const context = this;
                    if (timeout) clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        timeout = null;
                        func.apply(context, args);
                    }, wait);
                };

            },

            randomNumberBetween : (min, max) => {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }




        }

    }
})