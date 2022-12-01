import Head from 'next/head'
import {ReactElement } from "react"
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import {StripeErrorMessage} from './CustomAlert';
export default function Layout ({children}:{children?: ReactElement}) {
  const router = useRouter();
  const {failed} = router.query;
  return(
  <div>
    <Head>
      <title>{children?.props.title ? 'Next E-Store | ' + children?.props.title : 'Next E-Store'}</title>
    </Head>
    <Header/>
    <div className='page-container'>
      {failed && <StripeErrorMessage/>}
      {children}
    </div>
    <Footer/>
  </div>
  )
}