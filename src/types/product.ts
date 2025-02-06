// types/Product.ts
export interface Product {
    title : string,
    description : string,
    productImage: string,
    price : number
    oldPrice:number
    tags: string
    dicountPercentage : number
    isNew : string
    tagline : string
    slug : {
      _type : "slug"
      current : string,
    }
  }


  export interface Iproduct {
    _id:string,
    title : string,
    description : string,
    productImage: string,
    price : number
    oldPrice:number
    tags: string
    dicountPercentage : number
    isNew : string
    tagline : string
    slug : {
      _type : "slug"
      current : string,
    }
    inventory: number,
  }