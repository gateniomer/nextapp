import { GetServerSideProps } from "next";
import Link from "next/link";
import { ProductType } from "../../utils/types";

export const getServerSideProps:GetServerSideProps = async ({params}) => {
  
  if(!params) return {props:{}}

  try{
    const resp = await fetch('https://api.escuelajs.co/api/v1/categories/'+params.id+'/products');
    const products = await resp.json();
    return{
      props:{products}
    }
  }catch(e){
    return{
      props:{error:'no such id ' + params.id}
    }
  }
  
}

const Category = ({products}:{products:ProductType[]})=>{
  return(
    <div>
      {products.map(product=>
      <Link href={'/products/'+product.id}>
        <div>
          <h3>{product.title}</h3>
          <h3>{product.price}</h3>
        </div>
      </Link>)}
    </div>
  )
}

export default Category;