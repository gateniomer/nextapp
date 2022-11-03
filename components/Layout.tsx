import Head from 'next/head'
import { ReactNode } from "react"
import Nav from './Nav';
import Footer from './Footer';
export default function Layout ({children}:{children?: ReactNode}) {
  return(
  <div>
    <Head>
      <title>Next E-Store</title>
    </Head>
    <Nav/>
    {children}
    <Footer/>
  </div>
  )
}