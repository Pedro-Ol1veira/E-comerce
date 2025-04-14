import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { logout } from "@/redux/auth/authSlice";

export default function Header() {
  const user = useAppSelector((state) => state.auth.user);
  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="flex justify-center p-4 mx-auto  bg-zinc-950 sticky top-0">
        <header className="flex justify-between w-9/12">
          <Link to="/" className="text-white">
            E-Comerce
          </Link>
          {user ? (
            <nav className="space-x-8">
              <Link
                to="/login"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                testando
              </Link>
              <button
                onClick={handleLogout}
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link} hover:cursor-pointer`}
              >
                sair
              </button>
            </nav>
          ) : (
            <nav className="space-x-8">
              <Link
                to="/login"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                Cadastrar
              </Link>
            </nav>
          )}
        </header>
      </div>
      
        {authState.admin && (
          <div className="bg-zinc-950 flex justify-center">
            <nav className="space-x-8 w-9/12 flex justify-end">
              <Link
                to="/"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                Dashboard
              </Link>
              <Link
                to="/"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                Vendas
              </Link>
              <Link
                to="/"
                className={`text-white hover:underline  hover:text-red-900 ${styles.nav_link}`}
              >
                Grenciar Produtos
              </Link>

            </nav>
          </div>
        )}
    </>
  );
}
