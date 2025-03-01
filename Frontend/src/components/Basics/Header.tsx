import { Link } from "react-router-dom";
import styles from './Header.module.css';

export default function Header () {
  return (
    <div className="flex justify-center p-4 mx-auto  bg-zinc-950 sticky top-0">
        <header className="flex justify-between w-9/12">
            <Link to="/" className="text-white">E-Comerce</Link>
            <nav className="space-x-8">
                <Link to="/login" className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}>Login</Link>
                <Link to="/" className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}>Cadastrar</Link>
            </nav>
        </header>
    </div>
  );
}
