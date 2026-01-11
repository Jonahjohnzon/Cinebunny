import { getCookies, getAdminCookies } from "./getCookie"
import { state } from "./store"

export const History = async(body)=>{
    try{
    const token = await getCookies()
    if(!token)
        {
            return
        }
    const data = await fetch(`/api/pushhistory`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json', 'accessToken': token},
        body:JSON.stringify(body)
    })
}
catch(error){
    console.log(error)
}
}

export const WishList = async(body)=>{
    try{
    state.wishload = true
    const token = await getCookies()
    if(!token)
        {
            return 
        }
    const data = await fetch(`/api/pushwishlist`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json', 'accessToken': token},
        body:JSON.stringify(body)
    })
    const info = await data.json()
    if(info?.alert)
    {
        state.publicMgs = info.message
        state.alert = true

        setTimeout(() => {
            state.alert = false;
          }, 10000); 
          state.wishload = false
          return false
    }
    state.wishload = false
    return true

}
catch(error){
    console.log(error)
    state.wishload = false
}
}

export function saveToRecentlyWatched(item) {
    try{
    let recentlyWatched = JSON.parse(localStorage.getItem('recentlyWatched')) || [];
    recentlyWatched = recentlyWatched.filter(existingItem => existingItem.id != item.id);
    recentlyWatched.unshift(item);
    if (recentlyWatched.length > 10) {
        recentlyWatched.pop();
    }
    localStorage.setItem('recentlyWatched', JSON.stringify(recentlyWatched));
}
catch(err)
{
    console.log(err)
}
}

export const getUserDetail = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
            {
                return 
            }
        const data = await fetch(`/api/getuser`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info.data
    }
    catch(error){
        console.log(error)
    }
}

export const getAdminDetail = async ()=>{
    try{
        const token = await getAdminCookies()
        if(!token)
            {
                return 
            }
        const data = await fetch(`/api/getuser`,{
            method:'GET',
            headers:{'adminToken': token},
        })
        const info = await data.json()
        return info.data
    }
    catch(error){
        console.log(error)
    }
}


export const DeleteWish = async (body)=>{
    try{
        const token = await getCookies()
        if(!token)
            {
                return
            }
        const data = await fetch(`/api/deletewishlist`,{
            method:'DELETE',
            headers:{'accessToken': token},
            body:JSON.stringify(body)
        })
        const info = await data.json()
        return info.results
    }
    catch(error){
        console.log(error)
    }
}

export const getUserHistory = async (page = 1)=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/gethistory?page=${page}`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info
    }
    catch(error){
        console.log(error)
    }
}

export const getUserWishlist = async (page = 1)=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/getwishlist?page=${page}`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info
    }
    catch(error){
        console.log(error)
    }
}

export const getWishlistId = async ()=>{
    try{
        const token = await getCookies()
        if(!token)
        {
            return []
        }
        const data = await fetch(`/api/wishlistid`,{
            method:'GET',
            headers:{'accessToken': token},
        })
        const info = await data.json()
        return info?.data
    }
    catch(error){
        console.log(error)
    }
}