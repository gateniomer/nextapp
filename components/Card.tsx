import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Card.module.css';
import { ProductType } from "../utils/types";
import {useState} from 'react';

const Card = ({product}:{product:ProductType}) => {
  const handleImage = ()=>{
    if(!product.images[0].includes('http')){
      return <Image src={'/product_placeholder.jpg'} layout={'fill'} objectFit={'cover'} placeholder={'blur'} blurDataURL={'/product_placeholder.jpg'}/>
    }
    return <Image src={product.images[0]} layout={'fill'} objectFit={'cover'} placeholder={'blur'} blurDataURL={'/product_placeholder.jpg'}/>
  }

  return (
    <Link key={product.id} href={'/products/'+product.id}>
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {handleImage()}
      </div>
      <span className={styles.category}>{product.category.name}</span>
      <div className={styles.bottomContainer}>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.price}>{product.price}₪</span>
      </div>
    </div>
  </Link>
  )
}

export default Card;