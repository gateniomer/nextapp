import { GetStaticPaths, GetStaticProps, NextPage, } from "next"
import Link from "next/link";
import { dbProduct,Product } from "../../utils/types";
import styles from '../../styles/Product.module.css';
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { addProductToCartThunk } from "../../utils/thunk";
import { products } from "../../data/products";
import { getProduct } from "../api/products/[id]";
import {useEffect, useState} from 'react';
import {CLOTH_SIZES,SHOE_SIZES} from '../../data/sizes';
import { searchProductsByQuery } from "../api/products";
import { useRouter } from "next/router";
import CardGrid from "../../components/CardGrid";

export const getStaticProps:GetStaticProps = async (context)=>{
  const id = context.params?.id;
  const product = getProduct(id);
  if (!product) return {props:{}};

  const relatedProducts = searchProductsByQuery({
    limit:4,
    random:'true',
    category:product.category.id,
    ignore:[product.id]
  });

  return {
    props: {title:`${product.title}`,product,relatedProducts,key:id}
  }
}

export const getStaticPaths:GetStaticPaths = async () => {
  const paths = products.map(product=>({params:{id:product.id.toString()}}))
  return {
    paths,
    fallback: false,
  }
}

export const ProductPage:NextPage<{product:dbProduct,relatedProducts:dbProduct[]}> =  ({product,relatedProducts}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state=>state.userDetails.user);
  const router = useRouter();
  
  const [quantity,setQuantity] = useState(1);
  const [selectedSize,setSelectedSize] = useState(0);
  
  //adding quantity and size to convert to 'Product' type (product is a 'dbProduct' type)
  const productToAdd:Product = {
    ...product,
    quantity,
    size:product.category.sizes[selectedSize]
  }

  //dispatch adding product to cart action
  const onAddToCartHandler = () => {
    dispatch(addProductToCartThunk(productToAdd));
  }

  const onBuyNowHandler = async () => {
    //creating new checkout session by fetching request to out api.
    const resp = await fetch('/api/checkout-sessions',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        items:[productToAdd],
        user,
        buynow:true,
        fallbackUrl:`${origin}/products/${product.id}`})
    }).catch(e=>console.log(e));

    const data = resp && await resp.json();
    
    //redirect user to the recived url from stripe
    router.push(data.url); 
  }

  //add quantity by updating 'quantity' state
  const addQuantity = () => {
    setQuantity(prev=>prev+1);
  }
  //subtract quantity by updating 'quantity' state
  const subtractQuantity = () => {
    setQuantity(prev=> (prev===1) ? prev : prev-1);
  }

  return(
    <div className={styles.container}>

      {/* Related Products */}
      <div className={styles.cardGridContainer}>
        <CardGrid products={relatedProducts}/>
      </div>

      <div className={styles.containerSmall}>
        {/* Product Thumbnail and description */}
        <div className={styles.productDetailsContainer}>
        <div className={styles.imageContainer}>
          <Image src={product.image} layout={'fill'} objectFit={'cover'} placeholder={'blur'} blurDataURL={product.image}/>
        </div>
        <div>
          <Link href={'/categories/'+product.category.id}><span>{product.category.name}</span></Link>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          
        </div>
        </div>
        
        {/* Product details selection */}
        <div className={styles.productSelections}>
        <span className={styles.price}>{product.price}???</span >

        <div className={styles.sizeContainer}>
          {product.category.id === 2 && 
          SHOE_SIZES.map((size,index)=>{
            return <button key={size} className={`btn ${selectedSize === index ? styles.selected:''}`} 
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
            <button className='btn' onClick={()=>onBuyNowHandler()}>Buy Now</button>
          </div>}
          {!user && 
          <div className={styles.buttonsContainer}>
            <Link href={'/auth'}><span className="btn">Login to Buy</span></Link>
          </div>}
        </div>
        
        </div>
    </div>
  )
}
export default ProductPage;