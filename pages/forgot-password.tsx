import { auth } from "../utils/firebase/firebase";
import React, { useState, useEffect } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import styles from './forgotPassword.module.css';
type ForgotPasswordProps = {};

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
	const [email, setEmail] = useState("");
	const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
	const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const success = await sendPasswordResetEmail(email);
		if (success) {
			toast.success("Password reset email sent", { position: "top-center", autoClose: 3000, theme: "dark" });
		}
	};

	useEffect(() => {
		if (error) {
			alert(error.message);
		}
	}, [error]);
	return (
		<div className={styles.forgotPasswordContainer}>
		  <form className={styles.forgotPasswordForm} onSubmit={handleReset}>
			<h2 className={styles.forgotPasswordTitle}>Forgot Password</h2>
			<p className={styles.forgotPasswordDescription}>
			  Forgotten your password? Enter your email address below, and we'll send you an email allowing you to reset it.
			</p>
			<div className={styles.inputField}>
			  <label htmlFor="email" className={styles.fieldLabel}>Your email</label>
			  <input
				type="email"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className={styles.emailInput}
				placeholder="name@company.com"
			  />
			</div>
			<button type="submit" className={styles.resetButton} disabled={sending}>
			  {sending ? 'Sending...' : 'Reset Password'}
			</button>
		  </form>
		</div>
	  );
	};
export default ForgotPassword;
