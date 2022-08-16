import Head from 'next/head';
import NavBar from './navBar';

const Layout = ({children}) => (
    <>
    <Head>
        <title>Joker Inventory</title>
    </Head>
    <NavBar/>
    {children}
    </>

)

export default Layout;