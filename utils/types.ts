export type dbProduct = {
  id:number,
  title:string,
  price:number,
  category:Category,
  image:string,
  description:string,
}
export type Product = dbProduct & {
  quantity: number,
  size: number | string
}

export type Category = {
  id:number,
  name:string,
  description:string
}