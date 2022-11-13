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
import {useState} from 'react';
import {CLOTH_SIZES,SHOE_SIZES} from '../../data/sizes';

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

  const [quantity,setQuantity] = useState(1);
  const [selectedSize,setSelectedSize] = useState(0);

  //dispatch adding product to cart action
  const onAddToCartHandler = () => {
    dispatch(updateCartThunk({item:product,quantity}));
  }

  const addQuantity = () => {
    setQuantity(prev=>prev+1);
  }
  const subtractQuantity = () => {
    setQuantity(prev=> (prev===1) ? prev : prev-1);
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
          <Link href={'/categories/'+product.category.id}><span>{product.category.name}</span></Link>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          
        </div>
        </div>

        <div className={styles.productSelections}>
        <span className={styles.price}>{product.price}₪</span >

        <div className={styles.sizeContainer}>
          {product.category.id === 2 && 
          SHOE_SIZES.map((size,index)=>{
            return <button key={size} className={`btn ${(selectedSize===index) ? styles.selected:''}`} 
            onClick={()=>setSelectedSize(index)}>
              {size}
              </button>
          })}

          {(product.category.id === 0 || product.category.id === 1) && 
          CLOTH_SIZES.map((size,index)=>{
            return <button key={size} className={`btn ${(selectedSize===index) ? styles.selected:''}`} 
            onClick={()=>setSelectedSize(index)}>
              {size}
              </button>
          })}
          {(product.category.id === 3) && 
            <button className={`btn ${styles.selected}`}>
              One Size
            </button>
          }
        </div>

        <div className={styles.quantityContainer}>
          <button className="btn" onClick={subtractQuantity}>-</button>
          <span>{quantity}</span>
          <button className="btn" onClick={addQuantity}>+</button>
        </div>

          {user && 
          <div className={styles.buttonsContainer}>
            <button className='btn' onClick={()=>onAddToCartHandler()}>Add to Cart</button>
            <button className='btn'>Buy Now</button>
          </div>}
          {!user && 
          <div>
            <Link href={'/signin'}><span className="btn">Login to Buy</span></Link>
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