import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Product } from "../../utils/types";
import { CATEGORIES } from "../../data/categories";
import { searchProductsByQuery } from "../api/products";
import styles from '../../styles/Category.module.css';
import Card from "../../components/Card";

export const getStaticPaths:GetStaticPaths = () => {
  const paths = Object.values(CATEGORIES).map(category=>(
    {
      params:{id:category.id.toString()}
  }))
  return {
    paths,
    fallback:false
  }
}

export const getStaticProps:GetStaticProps = (context) => {
  const id = context.params?.id;
  if(!id || typeof id === 'object') return{props:{}};

  const products=searchProductsByQuery({category:id});
  
  return {
    props:{
      title:Object.values(CATEGORIES)[parseInt(id)].name,
      products,
      category:Object.values(CATEGORIES)[parseInt(id)]}
  }
}

const Category = ({products,title,category}:{products:Product[],title:string,category:any})=>{
  return(
    <div className={styles.container}>
      <div>
      <h2>Browsing {title}</h2>
      <p>{category.description}</p>
      </div>
      <div className={styles.cardContainer}>
      {products.map((product,index)=>
        <Card key={index} product={product}/>
      )}
      </div>
    </div>
  )
}

export default Category;