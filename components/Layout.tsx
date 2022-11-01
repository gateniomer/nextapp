import Head from 'next/head'
import { ReactNode } from "react"
import Nav from './Nav';

export default function Layout ({children}:{children?: ReactNode}) {
  return(
  <div className={'layout'}>
    <Head>
      <title>Next E-Store</title>
    </Head>
    <Nav/>
    {children}
  </div>
  )
}