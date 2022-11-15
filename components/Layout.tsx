import Head from 'next/head'
import {ReactElement } from "react"
import Header from './Header';
import Footer from './Footer';


export default function Layout ({children}:{children?: ReactElement}) {
  return(
  <div>
    <Head>
      <title>{children?.props.title ? 'Next E-Store | ' + children?.props.title : 'Next E-Store'}</title>
    </Head>
    <Header/>
    {children}
    <Footer/>
  </div>
  )
}