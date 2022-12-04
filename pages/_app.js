import '../styles/globals.css'

import { Layout } from '../components';
import { AppProps } from 'next/app';
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast'; // this is used to trigger a pop-up notification whenver we add something

 
export default function App({ Component, pageProps }) {
  return (
    <StateContext>
    <Layout>
      <Toaster />
      
      <Component {...pageProps} />
    </Layout>
    </StateContext>
  )
}
