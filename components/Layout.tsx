import Head from 'next/head'
import { ReactNode } from "react"
import Nav from './Nav';

export default function Layout ({children}:{children?: ReactNode}) {
  return(
  <div className={'layout'}>
    <Head>
      <title>Next E-Store</title>
    </Head>
    <h1>Next E-Store</h1>
    <Nav/>
    {children}
  </div>
  )
}