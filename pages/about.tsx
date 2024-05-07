import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase/firebase';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import style from './about.module.css'; // Use relative path for CSS
const About = () => {
    const router = useRouter();
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, stay on home page
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div className={style.body}>       
        <Head>
         <link rel='icon' href='/favicon.png' />
          <title>DevKraft</title>
        </Head>
        <Header />
        <h1 className={style.aboutText}>The home for hackathons.</h1>
      <div className={style.aboutUs}>
      
        <div className={style.aboutTextCont}>
        
        
          DevKraft&apos;s mission is to ignite innovation and creativity among
          developers and enthusiasts alike. Our goal is to foster a community
          where anyone passionate about enhancing their skills or seeking
          inspiration to create, turns to DevKraft. We facilitate a wide range
          of hackathons, both software and non-software, providing a platform
          where participants can unleash their potential and bring their ideas
          to life. Whether you&apos;re a seasoned developer or just starting
          out, DevKraft is here to empower you on your journey of exploration
          and innovation.
        
        </div>
        <div className={style.aboutImageCont}>
            <img
          alt="image"
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDJ8fHN0dWRlbnRzJTIwd29ya2luZyUyMHxlbnwwfHx8fDE3MDc5ODUwMTV8MA&amp;ixlib=rb-4.0.3&amp;w=1000"
          className={style.aboutImage}
        />
        </div>
      </div>
      <div className={style.aboutContainer1}>
        <h1 className={style.aboutHead}>Competitions inspire developers</h1>
        <p className={style.aboutSpan}>
          <span>Deadlines create urgency</span>
          <br></br>
          <span>The best learning comes from building</span>
          <br></br>
          <span>Prizes are awarded without taking developer IP</span>
          <br></br>
          <span>Accomplishing a personal challenge brings satisfaction</span>
        </p>
        <p className={style.aboutSpan}>
          If you’re a developer looking to be inspired, check out our
          competitions.
        </p>
        <h1 className={style.aboutHead}>For our customers</h1>
        <p className={style.aboutSpan}>
          <span>
            Our fully-featured hackathon platform
          </span>
          <br></br>
          <span>Our large, global community</span>
          <br></br>
          <span>Our experienced services team</span>
        </p>
       
    </div>
    <Footer />
    </div>
  );
};

export default About;
