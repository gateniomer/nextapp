import {useState,useEffect,useRef} from 'react';
import { dbProduct } from '../utils/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import useOutsideAlerter from '../hooks/useOutsideAlerter';

const Search = ({callback}:{callback?:()=>void}) => {
  const [input,setInput] = useState('');
  const [searchResult,setSearchResult] = useState<(dbProduct|string)[]>([]);

  const ref = useRef(null);
  const [clickedOutside] = useOutsideAlerter(ref);
  useEffect(()=>{clearSearch()},[clickedOutside]);

  const clearSearch = () => {
    setSearchResult([]);
  }
  useEffect(()=>{
    if(input.length<3) {
      setSearchResult([]);
      return;
    }
    const timer = setTimeout(()=>{
      if(input===''){
        setSearchResult([]);
      }else{
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?search=${input}`)
        .then(resp=>resp.json())
        .then(filteredProducts=>{
          if(filteredProducts.length===0){
            return setSearchResult(['No products found..'])
          }
          setSearchResult(filteredProducts)
        })
        .catch(error=>console.log(error))
      }
    },500);

    return ()=>clearTimeout(timer);
  },[input])
  console.log('res',searchResult);
  return (
    <div className={styles.search} ref={ref}>
      <input type="text" value={input} onInput={(e)=>setInput((e.target as HTMLInputElement).value)} placeholder='search for products'/>
      {(searchResult.length>0) && 
      <div className={styles.searchResultsContainer}>
        {
          searchResult.map((product:dbProduct|string)=>{
            if(typeof product === 'string'){
              return(
                <div key={product} className={styles.searchResultsItem}>
                  <span>{product}</span>
                </div>
              )
            } 
            return <Link key={product.id} href={'/products/'+product.id}>
            <div onClick={()=>{
              clearSearch();
              callback && callback();
            }} className={styles.searchResultsItem}>
              <Image src={product.image} 
              width={'50%'}
              height={'50%'}
              objectFit='cover'/>
              <span>{product.title}</span>
            </div>
          </Link>
          }
          
        )
        }
      </div>}
    </div>
  )
}

export default Search;