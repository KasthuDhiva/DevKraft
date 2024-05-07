import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../utils/firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "./profile.module.css";

import { useRouter } from "next/router";

import Header from "../components/Header";

const ProfilePage = () => {
  const [user] = useAuthState(auth);
  const [userProjects, setUserProjects] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const fetchUserProjects = async () => {
        const projectsRef = collection(firestore, "projects");
        const q = query(projectsRef, where("userId", "==", user.uid));
        const userProjectsSnapshot = await getDocs(q);
        const projectsData = userProjectsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserProjects(projectsData);
      };

      fetchUserProjects();
    } else {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div>
      <Header />
      <div className={styles.profileContainer}>
        <h1 className={styles.profileHeader}>
          Welcome, {user ? user.displayName : "Guest"}
        </h1>
        <h2 className={styles.projectsHeader}>Your Projects:</h2>
        <div className={styles.projectsGrid}>
          {userProjects.map((project) => (
            <div key={project.id} className={styles.galleryItem}>
            <a href={project.projectLink} className={styles.blockWrapperLink}>
              <div className={styles.softwareEntry}>
                <figure>
                  <img src={project.imageUrl} alt={project.projectName} className={styles.softwareThumbnail} />
                  <figcaption className={styles.softwareDetails}>
                    <h5>{project.projectName}</h5>
                    <p className={styles.tagline}>{project.projectDescription}</p>
                    {project.entryBadge && <div className={styles.entryBadge}>{project.entryBadge}</div>}
                  </figcaption>
                </figure>
              </div>
            </a>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;