import type { GetServerSideProps } from 'next'
import { ProductType } from '../utils/types'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export const getServerSideProps:GetServerSideProps = async () => {
  const resp = await fetch('https://fakestoreapi.com/products/');
  const products:ProductType[] = await resp.json();
  return {
    props:{products}
  }
}

const Home = ({products,test}:{products:ProductType[],test:any}) => {

  return (
    <>
    <div className={styles.container}>
    {products && products.map(product =>
    <Link key={product.id} href={'/products/'+product.id}>
      <div className={styles.card}>
        <h4>{product.title}</h4>
        <span>{product.category}</span>
        <span>{product.price}</span>
        <span>{product.description}</span>
        <Image src={product.image} width={'100px'} height={'300px'}/>
      </div>
    </Link>
    )}
    </div>
    </>
  )
}

export default Home
