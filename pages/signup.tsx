import React, { useState } from "react";
import { useRouter } from "next/router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import styles from "./signup.module.css";

const Signup: React.FC = () => {
  const [inputs, setInputs] = useState({ email: "", displayName: "", password: "" });
  const router = useRouter();
  const auth = getAuth();
  const db = getFirestore();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.email || !inputs.password || !inputs.displayName) {
      return alert("Please fill all fields");
    }

    try {
      toast.loading("Creating your account", { position: "top-center", toastId: "loadingToast" });
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
      const newUser = userCredential.user;

      // Create user data
      const userData = {
        uid: newUser.uid,
        email: newUser.email,
        displayName: inputs.displayName,
      };

      // Add user data to Firestore
      await setDoc(doc(db, "users", newUser.uid), userData);

      toast.success("Account created successfully!", { position: "top-center" });
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    } finally {
      toast.dismiss("loadingToast");
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupForm}>
        <h2 className={styles.signupTitle}>Register to DevKode</h2>
        <form onSubmit={handleRegister}>
          <div className={styles.inputField}>
            <label htmlFor="email" className={styles.fieldLabel}>
              Email
            </label>
            <input
              onChange={handleChangeInput}
              type="email"
              name="email"
              id="email"
              className={styles.signupEmailInput}
              placeholder="name@company.com"
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="displayName" className={styles.fieldLabel}>
              Display Name
            </label>
            <input
              onChange={handleChangeInput}
              type="text"
              name="displayName"
              id="displayName"
              className={styles.signupNameInput}
              placeholder="John Doe"
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password" className={styles.fieldLabel}>
              Password
            </label>
            <input
              onChange={handleChangeInput}
              type="password"
              name="password"
              id="password"
              className={styles.signupPasswordInput}
              placeholder="*******"
            />
          </div>
          <button type="submit" className={styles.signupButton}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
