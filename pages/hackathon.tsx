import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../utils/firebase/firebase';
import styles from './hackathon.module.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HackathonDisplay: React.FC = () => {
  const [hackathons, setHackathons] = useState<any[]>([]);

  useEffect(() => {
    const fetchHackathons = async () => {
      const hackathonRef = collection(db, "hackathons");
      const hackathonSnapshot = await getDocs(hackathonRef);
      const hackathonList = hackathonSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setHackathons(hackathonList);
    };

    fetchHackathons();
  }, []);

  return (
    <div>
      <title>Project - Sniveling Majestic Wren</title>
      <Header />
      <div className={styles.bodyContainer}>
        <div className={styles.projectContainer}>
          
          <div className={styles.projectContainer1}>
          <div className={styles.galleryContainer}>
  {hackathons.map((hackathon) => (
    <div key={hackathon.id} className={styles.galleryItem}>
      <a href={hackathon.link} className={styles.blockWrapperLink}>
      <div className={styles.softwareEntry}>
      <div className={styles.hackathonEntry}>
        <img
          src={hackathon.hackathonImage}
          alt={hackathon.name}
          className={styles.hackathonThumbnail}
        />
        <div className={styles.hackathonDetails}>
          <div className={styles.hackathonName}>
  <h3>{hackathon.name}</h3>
  </div>
  <div className={styles.detailsRow}>
    <div className={styles.detailsColumn1}>
      <p className={styles.hackathonTimeLeft}>{hackathon.timeleft}</p>
      <p className={styles.hackathonPrizes}>{hackathon.prizes}</p>
    </div>
    <div className={styles.detailsColumn1}>
    <div className={styles.detailsRow1}>
      <svg viewBox="0 0 1024 1024" className={styles.icon}>
        <path d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM751.59 704c8.58-40.454 13.996-83.392 15.758-128h127.446c-3.336 44.196-13.624 87.114-30.68 128h-112.524zM208.41 384c-8.58 40.454-13.996 83.392-15.758 128h-127.444c3.336-44.194 13.622-87.114 30.678-128h112.524zM686.036 384c9.614 40.962 15.398 83.854 17.28 128h-191.316v-128h174.036zM512 320v-187.338c14.59 4.246 29.044 11.37 43.228 21.37 26.582 18.74 52.012 47.608 73.54 83.486 14.882 24.802 27.752 52.416 38.496 82.484h-155.264zM331.232 237.516c21.528-35.878 46.956-64.748 73.54-83.486 14.182-10 28.638-17.124 43.228-21.37v187.34h-155.264c10.746-30.066 23.616-57.68 38.496-82.484zM448 384v128h-191.314c1.88-44.146 7.666-87.038 17.278-128h174.036zM95.888 704c-17.056-40.886-27.342-83.804-30.678-128h127.444c1.762 44.608 7.178 87.546 15.758 128h-112.524zM256.686 576h191.314v128h-174.036c-9.612-40.96-15.398-83.854-17.278-128zM448 768v187.34c-14.588-4.246-29.044-11.372-43.228-21.37-26.584-18.74-52.014-47.61-73.54-83.486-14.882-24.804-27.75-52.418-38.498-82.484h155.266zM628.768 850.484c-21.528 35.876-46.958 64.746-73.54 83.486-14.184 9.998-28.638 17.124-43.228 21.37v-187.34h155.266c-10.746 30.066-23.616 57.68-38.498 82.484zM512 704v-128h191.314c-1.88 44.146-7.666 87.040-17.28 128h-174.034zM767.348 512c-1.762-44.608-7.178-87.546-15.758-128h112.524c17.056 40.886 27.344 83.806 30.68 128h-127.446zM830.658 320h-95.9c-18.638-58.762-44.376-110.294-75.316-151.428 42.536 20.34 81.058 47.616 114.714 81.272 21.48 21.478 40.362 44.938 56.502 70.156zM185.844 249.844c33.658-33.658 72.18-60.932 114.714-81.272-30.942 41.134-56.676 92.666-75.316 151.428h-95.898c16.138-25.218 35.022-48.678 56.5-70.156zM129.344 768h95.898c18.64 58.762 44.376 110.294 75.318 151.43-42.536-20.34-81.058-47.616-114.714-81.274-21.48-21.478-40.364-44.938-56.502-70.156zM774.156 838.156c-33.656 33.658-72.18 60.934-114.714 81.274 30.942-41.134 56.678-92.668 75.316-151.43h95.9c-16.14 25.218-35.022 48.678-56.502 70.156z"></path>
      </svg>
      <p className={styles.hackathonLocation}>{hackathon.location}</p>
      </div>
      <p className={styles.hackathonParticipants}>{hackathon.participants}</p>
    </div>
    <div className={styles.detailsColumn1}>
    <div className={styles.detailsRow1}>
    <svg viewBox="0 0 1024 1024" className={styles.icon}>
          <path d="M784.341 184.235c-15.957-6.613-34.304-2.944-46.507 9.259-53.931 53.888-141.696 53.931-195.669 0-87.253-87.168-229.12-87.168-316.331 0-8.021 7.979-12.501 18.859-12.501 30.165v554.667c0 23.552 19.072 42.667 42.667 42.667s42.667-19.115 42.667-42.667v-194.261c54.229-42.539 133.163-38.869 183.168 11.093 87.253 87.168 229.163 87.168 316.331 0 8.021-8.021 12.501-18.859 12.501-30.165v-341.333c0-17.28-10.411-32.811-26.325-39.424z"></path>
      </svg>
      <p className={styles .hackathonSponsor}>{hackathon.sponsor}</p>
    </div>
    <div className={styles.detailsRow1}>
    <svg viewBox="0 0 1024 1024" className={styles.icon}>
          <path d="M810 854v-470h-596v470h596zM810 170q34 0 60 26t26 60v598q0 34-26 59t-60 25h-596q-36 0-61-24t-25-60v-598q0-34 25-60t61-26h42v-84h86v84h340v-84h86v84h42zM726 470v84h-86v-84h86zM554 470v84h-84v-84h84zM384 470v84h-86v-84h86z"></path>
      </svg>
      <p className={styles .hackathonElement}>{hackathon.date}</p>
    </div>
    <div className={styles.detailsRow1}>
      <svg viewBox="0 0 1085.1474285714285 1024" className={styles.icon}>
        <path d="M256 256c0-40.571-32.571-73.143-73.143-73.143s-73.143 32.571-73.143 73.143 32.571 73.143 73.143 73.143 73.143-32.571 73.143-73.143zM865.714 585.143c0 19.429-8 38.286-21.143 51.429l-280.571 281.143c-13.714 13.143-32.571 21.143-52 21.143s-38.286-8-51.429-21.143l-408.571-409.143c-29.143-28.571-52-84-52-124.571v-237.714c0-40 33.143-73.143 73.143-73.143h237.714c40.571 0 96 22.857 125.143 52l408.571 408c13.143 13.714 21.143 32.571 21.143 52zM1085.143 585.143c0 19.429-8 38.286-21.143 51.429l-280.571 281.143c-13.714 13.143-32.571 21.143-52 21.143-29.714 0-44.571-13.714-64-33.714l268.571-268.571c13.143-13.143 21.143-32 21.143-51.429s-8-38.286-21.143-52l-408.571-408c-29.143-29.143-84.571-52-125.143-52h128c40.571 0 96 22.857 125.143 52l408.571 408c13.143 13.714 21.143 32.571 21.143 52z"></path>
      </svg>
      <div>
      <p className={styles .hackathonTag}>{hackathon.skilllevel}</p>
      <p className={styles .hackathonTag}>{hackathon.category}</p>
      <p className={styles .hackathonTag}>{hackathon.difficulty}</p>
      </div>
      
    </div>
    </div>
    
  </div>
</div>
      </div>
      </div>
      </a>
    </div>
  ))}
</div>
</div>
</div>
</div>
    <Footer />
    </div>
  );
}

export default HackathonDisplay;
