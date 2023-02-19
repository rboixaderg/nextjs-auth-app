import { useAuth } from "@/hooks/useAuth";
import styles from "@/styles/Header.module.css";
import Link from "next/link";

export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      <nav className={styles.nav}>
        <p>
          <Link href="/">Home page</Link>
        </p>
        <p>
          <Link href="/private">Private page</Link>
        </p>
        {user && <p>User logged {user.username}</p>}

        {!user && <Link href="/login">Go to Log in</Link>}

        {user && (
          <>
            <button onClick={async () => await logout()}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};
