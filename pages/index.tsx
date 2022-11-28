import type { GetServerSideProps } from 'next';
import { ProductType } from '../utils/types';
import styles from '../styles/Home.module.css';
import { useAppDispatch } from '../utils/hooks';
import { updateProducts } from '../utils/products.slice';
import Card from '../components/Card';
import { searchProductsByQuery } from './api/products';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

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
        <h1>Next E-Store</h1>
        <p>A simple online store made with <strong>NextJS</strong>, <strong>Redux</strong>, <strong>Firebase</strong> & <strong>Stripe</strong>. Written in <strong>TypeScript</strong>, with implementation of Webhooks, self made API and much more!</p>
        <p><i>This project was made as part of a challenge: learn from docs with no help from any tutorials/videos. I think it went alright! Please provide any feedback through linkedin.</i></p>
        <a href="https://github.com/gateniomer/nextapp" target={'_blank'} rel="noreferrer"><button className='btn' style={{marginRight:'10px'}}><FontAwesomeIcon icon={faGithub}/> Source Code</button></a>
        <a href="https://github.com/gateniomer/" target={'_blank'} rel="noreferrer"><button className='btn' style={{marginRight:'10px'}}><FontAwesomeIcon icon={faLayerGroup}/> More Projects</button></a>
      </div>
      <div className={styles.cardContainer}>
        {
          products.map(product=><Card key={product.id} product={product}/>)
        }
      </div>
    </main>
    </>
  )
}
export default Home
