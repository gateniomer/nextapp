import type { GetServerSideProps } from 'next'
import { ProductType } from '../utils/types'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useAppDispatch } from '../utils/hooks'
import { updateProducts } from '../utils/products.slice'
import Vibrant from 'node-vibrant'
import Card from '../components/Card'

export const getServerSideProps:GetServerSideProps = async () => {
  const resp = await fetch('https://api.escuelajs.co/api/v1/products?offset=1&limit=12');
  const products = await resp.json();
  return {
    props:{products}
  }
}

const Home = ({products}:{products:ProductType[]}) => {

  const dispatch = useAppDispatch();
  dispatch(updateProducts(products));
  return (
    <>
    <main className={styles.container}>
      <div className={styles.mainTextContainer}>
        <h1>Awesome Next Store</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, vitae.</p>
      </div>
      <div className={styles.cardContainer}>
        {products && products.map((product) =><Card key={product.id} product={product}/>)}
      </div>
    </main>
    </>
  )
}

export default Home
