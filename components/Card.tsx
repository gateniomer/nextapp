import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Card.module.css';
import { dbProduct } from "../utils/types";

const Card = ({product}:{product:dbProduct}) => {

  return (
    <Link key={product.id} href={'/products/'+product.id}>
    <div className={styles.card}>
      <div className={styles.imageContainer}>
      <Image src={product.image} layout={'fill'} objectFit={'cover'} placeholder={'blur'} blurDataURL={product.image}/>
      </div>
      <div className={styles.categoryContainer}>
      <span className={styles.category}>{product.category.name}</span>
      </div>
      <div className={styles.bottomContainer}>
        <span className={styles.title}>{product.title}</span>
        <span className={styles.price}>{product.price}₪</span>
      </div>
    </div>
  </Link>
  )
}

export default Card;