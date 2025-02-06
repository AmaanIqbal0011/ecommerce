import { product } from "@/sanity/schemaTypes/product";
import { Iproduct } from "@/types/product";



export const addToCart = (product : Iproduct) => {
    const cart  :Iproduct[] = JSON.parse(localStorage.getItem('cart') || '[]')

    const existingProductIndex = cart.findIndex(item => item.title === product.title)

    if(existingProductIndex > -1) {
        cart[existingProductIndex].inventory += 1
    }
    else {
        cart.push({
            ...product, inventory:1
        })
    }

localStorage.setItem('cart', JSON.stringify(cart))

}


export const removeItemCart = (productId : string) => {
    let cart : Iproduct[] = JSON.parse(localStorage.getItem('cart') || '[]')
    cart = cart.filter(item => item.title !== productId)
    localStorage.setItem('cart',JSON.stringify(cart))
}

export const updateCartQuantity = (productId : string , quantity : number) => {
    const cart : Iproduct[] = JSON.parse(localStorage.getItem('cart') || '[]')
    const productIndex = cart.findIndex(item => item.title === product.title)

    if(productIndex > -1){
        cart[productIndex].inventory = quantity
        localStorage.setItem('cart',JSON.stringify(cart))
    }

}

export const getCartItems = () : Iproduct[] => {
return JSON.parse(localStorage.getItem('cart') || '[]')
}