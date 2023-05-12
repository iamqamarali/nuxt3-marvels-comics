export default function useComics() {

    const getTitle = (title)=>{
        return title.replace(/\(Variant\)/g,'').replace(/\(Variant Movie\)/g,'')
                    .replace(/\([0-9]{4}\)/, '')
                    .replace(/#[0-9]?[0-9]/, '')
                    .replace(/[0-9]/, '').substring(0, 25)
    }

    const getCoverArtist = (comic) => {
        let creator = comic.creators.items.find(creator => creator.role=="penciler (cover)")
        if(creator) return creator.name
    
        creator = comic.creators.items.find(creator => creator.role=="penciller (cover)")
        if(creator) return creator.name
    
        creator = comic.creators.items.find(creator => creator.role=="inker")
        if(creator) return creator.name
    
        return "Murewa Ayodele";
    }
    
    const getPenciler = (comic) => {
        let creator = comic.creators.items.find(creator => creator.role=="penciller")
        if(creator) return creator.name
    
        creator = comic.creators.items.find(creator => creator.role=="penciler")
        if(creator) return creator.name
    
        creator = comic.creators.items.find(creator => creator.role=="penciller (cover)")
        if(creator) return creator.name
    
        creator = comic.creators.items.find(creator => creator.role=="inker")
        if(creator) return creator.name
    
        return "Murewa Ayodele";
    }
    
    const getWriter = (comic) => {
        let creator = comic.creators.items.find(creator => creator.role=="writer")
        if(creator) return creator.name
    
        return ""
    }

    const getFocDate = (comic) =>{
        let focDate = comic.dates.find(date => date.type=="focDate")
        if(focDate){
            let date = new Date(focDate.date)
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        }

        return ""
    }

    
    return { 
        getCoverArtist,
        getPenciler,
        getWriter,
        getFocDate,
        getTitle
    };
}