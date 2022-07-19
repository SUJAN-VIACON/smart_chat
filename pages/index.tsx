import type { NextPage } from 'next'
import Head from 'next/head'

import Login from './Login'

const Home: NextPage = () => {

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </div>
  )
}

export default Home
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}

