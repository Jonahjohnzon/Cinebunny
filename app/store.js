import { proxy } from 'valtio'

export const state = proxy({
    signUp:false,
    login:false,
    show:false,
    log:false,
    id:"",
    name:"",
    home:true,
    showmenu:false,
    publicMgs:"",
    alert:false,
    wishload:false,
    role:""
})

