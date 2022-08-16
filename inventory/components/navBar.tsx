import Link from 'next/link';
import styles from './css/navBar.module.css'

const NavBar = () => {
   return (

    <nav className={styles.navBar}>
        <Link href='/'>
            <a className={styles.link}>Inventory</a>
        </Link>
        <Link href='/restock'>
        <a className={styles.link}>Restock Log</a>
        </Link>
    </nav>
   )

}

export default NavBar;