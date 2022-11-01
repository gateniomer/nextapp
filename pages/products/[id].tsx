import { GetServerSideProps, NextPage } from "next"
import Head from "next/head";
import Link from "next/link";
import { ProductType } from "../../utils/types";
import styles from '../../styles/Product.module.css';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { updateCartThunk } from "../../utils/thunk";

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
export const Product:NextPage<{product?:ProductType}> =  ({product}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.userDetails.user);
  const onAddToCartHandler = (product:ProductType) => {
    dispatch(updateCartThunk(product))
  }

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
          {user && 
          <div>
            <button onClick={()=>onAddToCartHandler(product)}>Add To Cart</button>
            <button>Buy Now</button>
          </div>}
          {!user && 
          <div>
            <Link href={'/signin'}>Sign In To Buy</Link>
          </div>}
        </div>
        </div>}
    </div>
  )
}
export default Product;