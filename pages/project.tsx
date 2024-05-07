import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './project.module.css';
import firebaseConfig from '../utils/firebase/firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

interface FormData {
  projectName: string;
  projectDescription: string;
  projectLink: string;
  entryBadge: string;
  projectImage: File | null;
}

const Project: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    projectLink: '',
    entryBadge: '',
    projectImage: null,
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const projectRef = collection(db, "projects");

    const getProjects = async () => {
      const projectSnapshot = await getDocs(projectRef);
      const projectList = projectSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProjects(projectList);
    };

    getProjects();
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setLoggedIn(true);
      } else {
        setUserId(null);
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const toggleForm = () => {
    if (loggedIn) {
      setShowForm(!showForm);
    } else {
      alert("Please log in to add a project.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, projectImage: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    // Read the uploaded image file (if any)
    const reader = new FileReader();
    let imageUrl: string | null = null;

    reader.onload = function (event) {
      if (event && event.target && event.target.result && typeof event.target.result === 'string') {
        imageUrl = event.target.result;
      }
    };

    if (formData.projectImage) {
      reader.readAsDataURL(formData.projectImage);
    }

    // Wait for image processing (if any) to finish before adding to Firestore
    await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust timeout if needed

    if (imageUrl) {
      // Add the image URL if available
      const projectRef = collection(db, "projects");
      const newProject = {
        userId: userId,
        projectName: formData.projectName,
        projectDescription: formData.projectDescription,
        projectLink: formData.projectLink,
        entryBadge: formData.entryBadge,
        imageUrl: imageUrl,
      };

      try {
        const docRef = await addDoc(projectRef, newProject);
        console.log("Project added successfully!");

        // Update the projects state with the newly added project
        setProjects([...projects, { ...newProject, id: docRef.id }]);
      } catch (error) {
        console.error("Error adding project:", error);
      }
    }

    // Reset form data and hide form
    setFormData({
      projectName: '',
      projectDescription: '',
      projectLink: '',
      entryBadge: '',
      projectImage: null,
    });
    setShowForm(false);
  };

  return (
    <div>
      <title>Project - Sniveling Majestic Wren</title>
      <Header />
      <div className={styles.bodyContainer}>
          <div className={styles.buttonContainer}>
            <button className={styles.toggleFormBtn} id="toggleFormBtn" onClick={toggleForm}>Add Project</button>
          </div>
            {showForm && (
              <div id="addProjectFormContainer" className={styles.addProjectFormContainer}>
                <form id="addProjectForm" className={styles.addProjectForm} onSubmit={handleSubmit}>
                  <h2>Add New Project</h2>
                  <label htmlFor="projectName">
                    Project Name:
                    <input
                      type="text"
                      id="projectName"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="projectDescription">
                    Description:
                    <textarea
                      id="projectDescription"
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleChange}
                      required
                    >
                    </textarea>
                  </label>
                  <br />
                  <br />
                  <label htmlFor="projectImage">
                    Upload Image:
                    <input
                      type="file"
                      id="projectImage"
                      name="projectImage"
                      accept="image/*"
                      onChange={handleImageChange}
                      required
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="projectLink">
                    Link:
                    <input
                      type="url"
                      id="projectLink"
                      name="projectLink"
                      value={formData.projectLink}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <br />
                  <br />
                  <label htmlFor="entryBadge">
                    Entry Badge:
                    <input
                      type="text"
                      id="entryBadge"
                      name="entryBadge"
                      value={formData.entryBadge}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <br />
                  <button type="submit">Add Project</button>
                </form>
              </div>
            )}
            <h1 className={styles.projectTitle}> Projects </h1>
            <div className={styles.galleryContainer}>
              {projects.map((project) => (
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
      <Footer />
    </div>
  );
}

export default Project;
