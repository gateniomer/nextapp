import styles from '../styles/CardGrid.module.css';
import { Product } from '../utils/types';
import Card from './Card';

type Props = {
  products:Product[]
}

export const CardGrid = ({products}:Props) => {
  return (
    <div className={styles.container}>
      {products.map((product,index)=> <Card key={index} product={product}/>)}
    </div>
  )
}

export default CardGrid;