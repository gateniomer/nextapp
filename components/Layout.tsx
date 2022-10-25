import Head from 'next/head'
import { ReactNode } from "react"
import Nav from './Nav';

type Props = {
  children?: ReactNode
}

export default function Layout ({children}:Props) {
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