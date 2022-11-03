import Link from "next/link";
import Image from "next/image";
import styles from '../styles/Card.module.css';
import { ProductType } from "../utils/types";

const Card = ({product}:{product:ProductType}) => {
  return (
    <Link key={product.id} href={'/products/'+product.id}>
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={product.images[0]} layout={'fill'} objectFit={'cover'}/>
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