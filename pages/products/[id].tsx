import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head";
import Link from "next/link";
import { ProductType } from "../../utils/types";
import styles from '../../styles/Product.module.css';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { updateCartThunk } from "../../utils/thunk";
import { products } from "../../data/products";
import { getProduct } from "../api/products/[id]";
import { searchProductsByQuery } from "../api/products";
import Card from "../../components/Card";

export const getStaticProps:GetStaticProps = async (context)=>{
  const id = context.params?.id;
  const product = getProduct(id);
  if (!product) return {props:{}};
  const relatedProducts = searchProductsByQuery(
    {
      limit:4,
      category:product.category.id,
      ignore:[product.id],
      random:'true'
    });

  return {
    props: {product,relatedProducts}
  }
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = products.map(product=>({params:{id:product.id.toString()}}))
  return {
    paths,
    fallback: false,
  }
}

export const Product:NextPage<{product:ProductType,relatedProducts:ProductType[]}> =  ({product,relatedProducts}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.userDetails.user);

  //dispatch adding product to cart action
  const onAddToCartHandler = (product:ProductType) => {
    dispatch(updateCartThunk({item:product}));
  }

  return(
    <>
      <Head>
        <title>Next E-Store | {product?.title}</title>
      </Head>
      {product && 
      <div className={styles.container}>
        <div className={styles.productDetailsContainer}>
        <div className={styles.imageContainer}>
          <Image src={product.image} layout={'fill'} objectFit={'cover'}/>
        </div>
        <div>
          <p>{product.category.name}</p>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          
        </div>
        </div>

        <div className={styles.productSelections}>
        <p>{product.price}₪</p>
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
          {/* <h3>Related Products</h3> */}
        <div className={styles.relatedProductsContainer}>
          {relatedProducts.map(product=>
            <Card key={product.id} product={product}/>
          )}
        </div>
    </>
  )
}
export default Product;