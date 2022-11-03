import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Home.module.css';
import { ProductType } from "../utils/types";
import Vibrant from 'node-vibrant';
import {useState,useEffect} from 'react';

const Card = ({product}:{product:ProductType}) => {
  return (
    <Link key={product.id} href={'/products/'+product.id}>
    <div className={styles.card}>
      <Image src={product.images[0]} width={'50px'} height={'200px'}/>
      <span>{product.category.name}</span>
      <h4>{product.title}</h4>
      <span>{product.price}</span>
    </div>
  </Link>
  )
}

export default Card;