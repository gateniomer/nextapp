
export type ProductType = {
  // [key:string]:any
  id:number,
  title:string,
  price:number,
  category:CategoryType,
  image:string,
  description:string,
  quantity?: number,
  size?: number | string
}

export type CategoryType = {
  id:number,
  name:string,
  description:string
}