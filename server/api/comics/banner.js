import data from '../../data/comics/banner.js'

export default defineEventHandler(event => {
    let bannerData = []

    data.forEach(character => {
        let arr = Object.values(character)[0]
        bannerData.push(arr[Math.floor(Math.random() * arr.length)])
    })


    // randomize array
    bannerData.sort(() => Math.random() - 0.5)

    return {
        data : bannerData
    }

})