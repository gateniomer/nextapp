import type { GetServerSideProps } from 'next'
import { ProductType } from '../utils/types'
import styles from '../styles/Home.module.css'
import { useAppDispatch } from '../utils/hooks'
import { updateProducts } from '../utils/products.slice'
import Card from '../components/Card'
import { searchProductsByQuery } from './api/products'

export const getServerSideProps:GetServerSideProps = async () => {
  const products = searchProductsByQuery({limit:9,random:'true'});

  return {
    props:{title:'Welcome Home',products}
  }
}

const Home = ({products}:{title:string,products:ProductType[]}) => {
  const dispatch = useAppDispatch();
  dispatch(updateProducts(products));

  return (
    <>
    <main className={styles.container}>
      <div className={styles.mainTextContainer}>
        <h1>Awesome Next Store</h1>
        <p>A simple online store made with <strong>NextJS</strong>, <strong>Redux</strong>, <strong>Firebase</strong> & <strong>Stripe</strong>. Written in <strong>TypeScript</strong>, with implementation of Webhooks, self made API and much more!</p>
        <p>Most of the website using SSG with some pages using SSR, with minimal API calls and maximum performance!</p>
        <button className='btn' style={{marginRight:'10px'}}>Button 1</button>
        <button className='btn'>Button 2</button>
      </div>
      <div className={styles.cardContainer}>
        {
          products.map(product=><Card key={product.id} product={product}/>)
        }
      </div>
    </main>

    <section id={'section-a'} className={'block'}>
      <div>

      </div>
      <div>

      </div>
    </section>
    </>
  )
}
export default Home
