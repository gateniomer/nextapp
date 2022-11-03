import {useState,useEffect,useRef} from 'react';
import { useAppSelector } from '../utils/hooks';
import { ProductType } from '../utils/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import useOutsideAlerter from '../hooks/useOutsideAlerter';

const Search = () => {
  const products = useAppSelector(state=>state.products.products);
  const [input,setInput] = useState('');
  const [searchResult,setSearchResult] = useState<ProductType[]>([]);

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
        const filteredProducts = products.filter(product=>product.title.toLowerCase().includes(input.trim().toLowerCase()));
        setSearchResult(filteredProducts);
      }
    },500);

    return ()=>clearTimeout(timer);
  },[input])

  return (
    <div className={styles.search} ref={ref}>
      <input type="text" value={input} onInput={(e)=>setInput((e.target as HTMLInputElement).value)}/>
      {(searchResult.length>0) && 
      <div className={styles.searchResultsContainer}>
        {
          searchResult.map((product:ProductType)=>
          <Link key={product.id} href={'/products/'+product.id}>
            <div onClick={clearSearch} className={styles.searchResultsItem}>
              <Image src={product.images[0]} 
              width={'50%'}
              height={'50%'}
              objectFit='cover'/>
              <span>{product.title}</span>
            </div>
          </Link>
        )
        }
      </div>}
    </div>
  )
}

export default Search;