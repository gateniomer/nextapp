import styles from '../styles/CardGrid.module.css';
import { dbProduct } from '../utils/types';
import Card from './Card';

type Props = {
  products:dbProduct[]
}

export const CardGrid = ({products}:Props) => {
  return (
    <div className={styles.container}>
      {products.map((product,index)=> <Card key={index} product={product}/>)}
    </div>
  )
}

export default CardGrid;