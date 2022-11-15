import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ProductType } from "../../utils/types";
import { CATEGORIES } from "../../data/categories";
import { searchProductsByQuery } from "../api/products";


export const getStaticPaths:GetStaticPaths = () => {
  const paths = Object.values(CATEGORIES).map(category=>(
    {
      params:{id:category.id.toString()}
  }))
  return {
    paths,
    fallback:false
  }
}

export const getStaticProps:GetStaticProps = (context) => {
  const id = context.params?.id;
  if(!id || typeof id === 'object') return{props:{}};

  const products=searchProductsByQuery({category:id});
  
  return {
    props:{title:Object.values(CATEGORIES)[parseInt(id)].name,products}
  }
}
// export const getServerSideProps:GetServerSideProps = async ({params}) => {
  
//   if(!params) return {props:{}}

//   try{
//     const resp = await fetch('https://api.escuelajs.co/api/v1/categories/'+params.id+'/products');
//     const products = await resp.json();
//     return{
//       props:{products}
//     }
//   }catch(e){
//     return{
//       props:{error:'no such id ' + params.id}
//     }
//   }
  
// }

const Category = ({products}:{products:ProductType[]})=>{
  return(
    <div>
      {products.map(product=>
      <Link href={'/products/'+product.id} key={product.id}>
        <div>
          <h3>{product.title}</h3>
          <h3>{product.price}</h3>
        </div>
      </Link>)}
    </div>
  )
}

export default Category;