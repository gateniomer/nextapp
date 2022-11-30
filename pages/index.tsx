import type { GetServerSideProps } from 'next';
import { Product } from '../utils/types';
import styles from '../styles/Home.module.css';
import { searchProductsByQuery } from './api/products';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import CardGrid from '../components/CardGrid';
export const getServerSideProps:GetServerSideProps = async () => {
  const searchParams = {
    limit:9,
    random:'true'
  }

  //get list of products by specific parameters
  const products = searchProductsByQuery(searchParams);

  return {
    props:{title:'Welcome Home',products}
  }
}

const Home = ({products}:{title:string,products:Product[]}) => {

  return (
    <>
    <main className={'page-container ' + styles.container}>
      <div className={styles.mainTextContainer}>
        <h1>Next E-Store</h1>
        <p>A simple online store made with <strong>NextJS</strong>, <strong>Redux</strong>, <strong>Firebase</strong> & <strong>Stripe</strong>. Written in <strong>TypeScript</strong>, with implementation of Webhooks, self made API and much more!</p>
        <p><i>This project was made as part of a challenge: learn from docs with no help from any tutorials/videos. I think it went alright! Please provide any feedback through linkedin.</i></p>
        <a href="https://github.com/gateniomer/nextapp" target={'_blank'} rel="noreferrer"><button className='btn btn-dark' style={{marginRight:'10px'}}><FontAwesomeIcon icon={faGithub}/> Source Code</button></a>
        <a href="https://github.com/gateniomer/" target={'_blank'} rel="noreferrer"><button className='btn' style={{marginRight:'10px'}}><FontAwesomeIcon icon={faLayerGroup}/> More Projects</button></a>
      </div>
      
      <CardGrid products={products}/>
    </main>
    </>
  )
}
export default Home
