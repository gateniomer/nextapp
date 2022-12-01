import { GetStaticPaths, GetStaticProps } from "next";
import { Product,Category } from "../../utils/types";
import { CATEGORIES } from "../../data/categories";
import { searchProductsByQuery } from "../api/products";
import styles from '../../styles/Category.module.css';
import CardGrid from "../../components/CardGrid";

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
  const category = Object.values(CATEGORIES)[parseInt(id)];

  return {
    props:{
      title:category.name,
      products,
      category
    }
  }
}

const Category = ({products,title,category}:{products:Product[],title:string,category:Category})=>{
  return(
    <div className={styles.container}>
      <div>
      <h2>Browsing {title}</h2>
      <p>{category.description}</p>
      </div>
      <CardGrid products={products}/>
    </div>
  )
}

export default Category;