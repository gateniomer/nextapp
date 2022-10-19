import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";
import { useContext } from "react";
import { CartContext } from "../../utils/contexts";
import { ProductType } from "../../utils/types";
import styles from '../../styles/Product.module.css';
import Image from "next/image";
export const getServerSideProps:GetServerSideProps = async ({params}) => {
  
  if(!params) return {props:{}}

  try{
    const resp = await fetch('https://fakestoreapi.com/products/'+params.id);
    const product = await resp.json();
    return{
      props:{product}
    }
  }catch(e){
    return{
      props:{error:'no such id ' + params.id}
    }
  }
  
}
export const Product:NextPage<{product?:ProductType,error?:Error}> =  ({product,error}) => {
  const {addToCart} = useContext(CartContext);
  if(error) console.log(error);
  return(
    <div>
      <Head>
        <title>Next E-Store | {product?.title}</title>
      </Head>
      {product && <div className={styles.container}>
        <Image src={product.image} width='300px' height='400px'/>
        <div>
          <h2>{product.title}</h2>
          <p>{product.category}</p>
          <p>{product.price}</p>
          <button onClick={()=>{
          addToCart(product);
        }}>Add To Cart</button>
          <button>Buy Now</button>
        </div>
        </div>}
    </div>
  )
}
export default Product;