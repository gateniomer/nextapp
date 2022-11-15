import {useState,useEffect,useRef} from 'react';
import { useAppSelector } from '../utils/hooks';
import { ProductType } from '../utils/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Search.module.css';
import useOutsideAlerter from '../hooks/useOutsideAlerter';

const Search = () => {
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
        fetch(`${process.env.NEXT_PUBLIC_URL}/api/products?search=${input}`)
        .then(resp=>resp.json())
        .then(filteredProducts=>setSearchResult(filteredProducts))
        .catch(error=>console.log(error))
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
              <Image src={product.image} 
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