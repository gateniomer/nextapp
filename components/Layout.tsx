import Head from 'next/head'
import { ReactNode } from "react"
import Header from './Header';
import Footer from './Footer';
export default function Layout ({children}:{children?: ReactNode}) {
  return(
  <div>
    <Head>
      <title>Next E-Store</title>
    </Head>
    <Header/>
    {children}
    <Footer/>
  </div>
  )
}