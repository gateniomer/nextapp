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
  const resp = await fetch('https://api.escuelajs.co/api/v1/products');
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
    <div className={styles.container}>
    {products && products.map((product) =><Card key={product.id} product={product}/>)}
    </div>
    </>
  )
}

export default Home
