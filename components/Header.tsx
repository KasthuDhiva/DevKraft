import React, { useState, useEffect } from 'react';
import { auth } from '../utils/firebase/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';

import styles from './header.module.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.homeHeader}>
        <header className={`${styles.homeNavbarInteractive} ${styles.navbarContainer}`}>
          <Link href="/" className={styles.homeLogo}>
            DEVKRAFT
          </Link>
          <div className={styles.homeDesktopMenu}>
            <nav className={styles.homeLinks}>
              <Link href="/" className={styles.homeNavItem}>
                Home
              </Link>
              <Link href="/project" className={styles.homeNavItem}>
                Project
              </Link>
              <Link href="/hackathon" className={styles.homeNavItem}>
                Hackathon
              </Link>
              <Link href="https://devkode-dk.vercel.app/" className={styles.homeNavItem}>
                Coding Challenges
              </Link>
              <Link href="/hostHackathon" className={styles.homeNavItem}>
                Host a Hackathon
              </Link>
              <Link href="/about" className={styles.homeNavItem}>
                About Us
              </Link>
              {/* Conditional rendering based on authentication status */}
              {isAuthenticated ? (
                <>
                  <button
                    onClick={async () => {
                      await auth.signOut();
                      router.push('/login'); // Redirect to login after logout
                    }}
                    className={styles.homeButton2}>
                    Logout
                  </button>
                  <Link href="/profile" className={styles.homeButton1}>
                    Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className={styles.homeButton2}>
                    Login
                  </Link>
                  <Link href="/signup" className={styles.homeButton1}>
                    Signup
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
