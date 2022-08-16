import Link from 'next/link';
import styles from './css/navBar.module.css'

const NavBar = () => {
   return (

    <nav className={styles.navBar}>
        <Link href='/'>
            <a>Joker Inventory</a>
        </Link>
        <Link href='/restock'>
            <a>Restock Log</a>
        </Link>
    </nav>
   )

}

export default NavBar;