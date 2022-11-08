import type { GetServerSideProps } from 'next'
import { ProductType } from '../utils/types'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useAppDispatch } from '../utils/hooks'
import { updateProducts } from '../utils/products.slice'
import Card from '../components/Card'

export const getServerSideProps:GetServerSideProps = async () => {
  const products = await (await fetch(process.env.NEXT_PUBLIC_URL+'/api/products')).json();
  console.log(products);
  const categories = await (await fetch('https://api.escuelajs.co/api/v1/categories')).json();
  return {
    props:{products,categories}
  }
}

const Home = ({products,categories}:{products:ProductType[],categories:any}) => {

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
        {products && products.map((product,index) =>{
          if (index>8) return;
          return <Card key={product.id} product={product}/>
        })}
      </div>
    </main>

    <section id={'section-a'} className={'block'}>
      <div>

      </div>
      <div>

      </div>
    </section>

    <section id={'section-b'} className={'block'}>
      <div>

      </div>
      <div>

      </div>
    </section>

    <section id={'section-c'} className={'block'}>
      <div>

      </div>
      <div>

      </div>
    </section>
    </>
  )
}

export default Home
