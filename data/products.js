export const products = [
  {
    id:1,
    title:'test',
    price:120,
    category:'newcategory',
    image:'/products/test.jpg'
  },
  {
    id:2,
    title:'test2',
    price:70,
    category:'newcategory',
    image:'/products/test.jpg'
  },
  {
    id:3,
    title:'test3',
    price:70,
    category:'newcategory',
    image:'/products/test.jpg'
  },
  {
    id:4,
    title:'test4',
    price:70,
    category:'newcategory',
    image:'/products/test.jpg'
  },
];

export const findProduct = (id)=>{
  return products.find(product=>product.id=== parseInt(id));
}