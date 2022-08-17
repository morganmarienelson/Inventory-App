import Head from 'next/head';
import NavBar from './navBar';

const Layout = ({children}) => (
    <>
    <Head>
        <title>Inventory</title>
    </Head>
    <NavBar/>
    {children}
    </>

)

export default Layout;