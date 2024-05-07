import React, { useState, useEffect } from 'react';
import { authModalState } from "../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase/firebase';
import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";
import { toast } from 'react-toastify';
import styles from './login.module.css';

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, redirect to home page
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, []);
	const setAuthModalState = useSetRecoilState(authModalState);
  const handleClick = (type: "login" | "signup" | "forgotPassword") => {
    if (type === "forgotPassword") {
      router.push("/forgot-password");
    } else if (type === "signup") {
      router.push("/signup");
    } else {
      setAuthModalState((prev) => ({ ...prev, type }));
    }
  };
	const [inputs, setInputs] = useState({ email: "", password: "" });
	const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
	const router = useRouter();
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!inputs.email || !inputs.password) return alert("Please fill all fields");
		try {
			const newUser = await signInWithEmailAndPassword(inputs.email, inputs.password);
			if (!newUser) return;
			router.push("/");
		} catch (error: any) {
			toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) toast.error(error.message, { position: "top-center", autoClose: 3000, theme: "dark" });
	}, [error]);

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.loginTitle}>Login</h2>
        {error && (
  <p className={styles.errorMessage}>{error.message}</p>
)}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={inputs.email}
          onChange={handleInputChange}
          className={styles.loginEmailInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password}
          onChange={handleInputChange}
          className={styles.loginPasswordInput}
        />
        <button type="submit" className={styles.loginButton} disabled={loading}>
          {loading ? 'Loading...' : 'Log In'}
        </button>
        <div className={styles.loginLinks}>
          <p>
            <span onClick={() => handleClick('forgotPassword')}>Forgot Password?</span>
          </p>
          <p>
            Not Registered? <span onClick={() => handleClick('signup')}>Create Account</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
