import type { GetServerSideProps } from 'next'
import { ProductType } from '../utils/types'
import styles from '../styles/Home.module.css'
import { useAppDispatch } from '../utils/hooks'
import { updateProducts } from '../utils/products.slice'
import Card from '../components/Card'

export const getServerSideProps:GetServerSideProps = async () => {
  const products = await (await fetch(process.env.NEXT_PUBLIC_URL+'/api/products')).json();

  const getRandomProducts = (num:number) => {
    let productsArray:ProductType[] = [];

    while(productsArray.length<num){
      const random = Math.floor(Math.random()*products.length);
        productsArray.push(products[random]);
        products.splice(random,1);
    }

    return productsArray;
  }

  const productsToDisplay = getRandomProducts(9);

  return {
    props:{products:productsToDisplay}
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
