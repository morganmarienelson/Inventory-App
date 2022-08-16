import Link from 'next/link';
import styles from './css/navBar.module.css'

const NavBar = () => {
   return (

    <nav className={styles.navBar}>
        <Link href='/'>
            <a className={styles.link}>Inventory Table</a>
        </Link>
        <Link href='/log'>
        <a className={styles.link}>Inventory Log</a>
        </Link>
    </nav>
   )

}

export default NavBar;