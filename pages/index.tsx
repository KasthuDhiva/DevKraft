import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase/firebase';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './index.module.css'; // Use relative path for CSS
import Link from 'next/link';


const Home = () => {
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
    <div className={styles.body}>       
      <Head>
        <link rel='icon' href='/favicon.png' />
        <title>DevKraft</title>
      </Head>
      <Header />
    <div className={styles.container}>
        <div className={styles.heroContainer}>

              <h1 className={styles.homeHeroHeading}>
                Find Your Next Hackathon
              </h1>
              <div className={styles.homeBtnGroup}>
                <Link href="/hostHackathon" className={styles.heroButton1}>
                  For organizers
                </Link>
                <Link href="/hackathon" className={styles.heroButton2}>
                  For participants
                </Link>
              
          </div>
        </div>
      <div className={styles.homeBanner}>
        <h1 className={styles.bannerHeading}>
          Discover and Participate in Exciting Hackathons
        </h1>
        <Link href="/hackathon" className={styles.bannerButton}>
            <span>View all hackathons</span>   
        </Link>
      </div>
      <div className={styles.features}>

          <div className={styles.features1}>
          
            <div className={styles.container1}>
              <span className={styles.featureText}>
                features
              </span>
              <h2 className={styles.featuresHeading}>
                Unlock the Power of Hackathons
              </h2>
              <span className={styles.featureSubHeading}>
                  Join the community and unleash your creativity</span>
            </div>
            
            <div className={styles.container2}>
            <Link href="#hackathon" className={styles.cardLink}>
                <div className={styles.featureCard}>
                
                  <div className={styles.icon}>
                    <svg
                    viewBox="0 0 1024 1024"
                    className={styles.featureIcon}
                  >
                    
                    <path d="M809.003 291.328l-297.003 171.819-297.003-171.819 275.456-157.397c4.779-2.731 9.899-4.48 15.147-5.333 9.301-1.451 18.987 0.128 27.904 5.291zM491.776 979.669c6.016 3.243 12.928 5.077 20.224 5.077 7.381 0 14.336-1.877 20.395-5.163 15.189-2.475 29.909-7.68 43.392-15.36l298.709-170.709c26.368-15.232 45.269-38.315 55.424-64.597 5.675-14.592 8.619-30.165 8.747-46.251v-341.333c0-20.395-4.821-39.723-13.397-56.917-0.939-3.029-2.219-5.973-3.883-8.832-1.963-3.371-4.267-6.357-6.912-8.96-1.323-1.835-2.731-3.669-4.139-5.419-9.813-12.203-21.845-22.528-35.456-30.507l-299.051-170.88c-26.027-15.019-55.467-19.84-83.328-15.531-15.531 2.432-30.507 7.637-44.288 15.488l-298.709 170.709c-16.341 9.429-29.824 21.888-40.149 36.267-2.56 2.56-4.864 5.547-6.784 8.832-1.664 2.901-2.987 5.888-3.925 8.96-1.707 3.456-3.243 6.955-4.608 10.496-5.632 14.635-8.576 30.208-8.704 45.995v341.632c0.043 30.293 10.581 58.197 28.331 80.128 9.813 12.203 21.845 22.528 35.456 30.507l299.051 170.88c13.824 7.979 28.587 13.099 43.605 15.445zM469.333 537.045v340.949l-277.12-158.336c-4.736-2.773-8.832-6.315-12.16-10.411-5.931-7.381-9.387-16.512-9.387-26.581v-318.379zM554.667 877.995v-340.949l298.667-172.757v318.379c-0.043 5.163-1.067 10.496-2.987 15.445-3.413 8.789-9.6 16.384-18.176 21.333z"></path>
                  </svg>
                  </div>
                  <div className={styles.container3}>
                    <h3 className={styles.cardText}>Search Hackathons</h3>
                    <span className={styles.descText}>
                      Find hackathons based on your interests and location
                    </span>
                  </div>
                </div>
                </Link>
                <Link href="#top" className={styles.cardLink}>
                <div className={styles.featureCard}>
                <div className={styles.icon}>
                  <svg
                    viewBox="0 0 1024 1024"
                    className={styles.featureIcon}
                  >
                    <path d="M809.003 291.328l-297.003 171.819-297.003-171.819 275.456-157.397c4.779-2.731 9.899-4.48 15.147-5.333 9.301-1.451 18.987 0.128 27.904 5.291zM491.776 979.669c6.016 3.243 12.928 5.077 20.224 5.077 7.381 0 14.336-1.877 20.395-5.163 15.189-2.475 29.909-7.68 43.392-15.36l298.709-170.709c26.368-15.232 45.269-38.315 55.424-64.597 5.675-14.592 8.619-30.165 8.747-46.251v-341.333c0-20.395-4.821-39.723-13.397-56.917-0.939-3.029-2.219-5.973-3.883-8.832-1.963-3.371-4.267-6.357-6.912-8.96-1.323-1.835-2.731-3.669-4.139-5.419-9.813-12.203-21.845-22.528-35.456-30.507l-299.051-170.88c-26.027-15.019-55.467-19.84-83.328-15.531-15.531 2.432-30.507 7.637-44.288 15.488l-298.709 170.709c-16.341 9.429-29.824 21.888-40.149 36.267-2.56 2.56-4.864 5.547-6.784 8.832-1.664 2.901-2.987 5.888-3.925 8.96-1.707 3.456-3.243 6.955-4.608 10.496-5.632 14.635-8.576 30.208-8.704 45.995v341.632c0.043 30.293 10.581 58.197 28.331 80.128 9.813 12.203 21.845 22.528 35.456 30.507l299.051 170.88c13.824 7.979 28.587 13.099 43.605 15.445zM469.333 537.045v340.949l-277.12-158.336c-4.736-2.773-8.832-6.315-12.16-10.411-5.931-7.381-9.387-16.512-9.387-26.581v-318.379zM554.667 877.995v-340.949l298.667-172.757v318.379c-0.043 5.163-1.067 10.496-2.987 15.445-3.413 8.789-9.6 16.384-18.176 21.333z"></path>
                  </svg>
                  </div>
                  <div className={styles.container3}>
                  <h3 className={styles.cardText}>Top Hackathons</h3>
                  <span className={styles.descText}>
                      Discover the most popular hackathons happening right now
                    </span>
                  </div>
                </div>
                </Link>
                <Link href="#preference" className={styles.cardLink}>
                <div className={styles.featureCard}>
                <div className={styles.icon}>
                  <svg
                    viewBox="0 0 1024 1024"
                    className={styles.featureIcon}
                  >
                    <path d="M809.003 291.328l-297.003 171.819-297.003-171.819 275.456-157.397c4.779-2.731 9.899-4.48 15.147-5.333 9.301-1.451 18.987 0.128 27.904 5.291zM491.776 979.669c6.016 3.243 12.928 5.077 20.224 5.077 7.381 0 14.336-1.877 20.395-5.163 15.189-2.475 29.909-7.68 43.392-15.36l298.709-170.709c26.368-15.232 45.269-38.315 55.424-64.597 5.675-14.592 8.619-30.165 8.747-46.251v-341.333c0-20.395-4.821-39.723-13.397-56.917-0.939-3.029-2.219-5.973-3.883-8.832-1.963-3.371-4.267-6.357-6.912-8.96-1.323-1.835-2.731-3.669-4.139-5.419-9.813-12.203-21.845-22.528-35.456-30.507l-299.051-170.88c-26.027-15.019-55.467-19.84-83.328-15.531-15.531 2.432-30.507 7.637-44.288 15.488l-298.709 170.709c-16.341 9.429-29.824 21.888-40.149 36.267-2.56 2.56-4.864 5.547-6.784 8.832-1.664 2.901-2.987 5.888-3.925 8.96-1.707 3.456-3.243 6.955-4.608 10.496-5.632 14.635-8.576 30.208-8.704 45.995v341.632c0.043 30.293 10.581 58.197 28.331 80.128 9.813 12.203 21.845 22.528 35.456 30.507l299.051 170.88c13.824 7.979 28.587 13.099 43.605 15.445zM469.333 537.045v340.949l-277.12-158.336c-4.736-2.773-8.832-6.315-12.16-10.411-5.931-7.381-9.387-16.512-9.387-26.581v-318.379zM554.667 877.995v-340.949l298.667-172.757v318.379c-0.043 5.163-1.067 10.496-2.987 15.445-3.413 8.789-9.6 16.384-18.176 21.333z"></path>
                  </svg>
                  </div>
                  <div className={styles.container3}>
                  <h3 className={styles.cardText}>
                      Online and In-person Hackathons
                    </h3>
                    <span className={styles.descText}>
                      Choose between online or in-person hackathons based on
                      your preference
                    </span>
                  </div>
                </div>
                </Link>
                <Link href="#themes" className={styles.cardLink}>
                <div className={styles.featureCard}>
                <div className={styles.icon}>
                   <svg
                    viewBox="0 0 1024 1024"
                    className={styles.featureIcon}
                  >
                    <path d="M809.003 291.328l-297.003 171.819-297.003-171.819 275.456-157.397c4.779-2.731 9.899-4.48 15.147-5.333 9.301-1.451 18.987 0.128 27.904 5.291zM491.776 979.669c6.016 3.243 12.928 5.077 20.224 5.077 7.381 0 14.336-1.877 20.395-5.163 15.189-2.475 29.909-7.68 43.392-15.36l298.709-170.709c26.368-15.232 45.269-38.315 55.424-64.597 5.675-14.592 8.619-30.165 8.747-46.251v-341.333c0-20.395-4.821-39.723-13.397-56.917-0.939-3.029-2.219-5.973-3.883-8.832-1.963-3.371-4.267-6.357-6.912-8.96-1.323-1.835-2.731-3.669-4.139-5.419-9.813-12.203-21.845-22.528-35.456-30.507l-299.051-170.88c-26.027-15.019-55.467-19.84-83.328-15.531-15.531 2.432-30.507 7.637-44.288 15.488l-298.709 170.709c-16.341 9.429-29.824 21.888-40.149 36.267-2.56 2.56-4.864 5.547-6.784 8.832-1.664 2.901-2.987 5.888-3.925 8.96-1.707 3.456-3.243 6.955-4.608 10.496-5.632 14.635-8.576 30.208-8.704 45.995v341.632c0.043 30.293 10.581 58.197 28.331 80.128 9.813 12.203 21.845 22.528 35.456 30.507l299.051 170.88c13.824 7.979 28.587 13.099 43.605 15.445zM469.333 537.045v340.949l-277.12-158.336c-4.736-2.773-8.832-6.315-12.16-10.411-5.931-7.381-9.387-16.512-9.387-26.581v-318.379zM554.667 877.995v-340.949l298.667-172.757v318.379c-0.043 5.163-1.067 10.496-2.987 15.445-3.413 8.789-9.6 16.384-18.176 21.333z"></path>
                  </svg>
                  </div>
                  <div className={styles.container3}>
                  <h3 className={styles.cardText}>List of Themes</h3>
                  <span className={styles.descText}>
                      Explore hackathons organized around various themes
                    </span>
                  </div>
                </div>
                </Link>
            </div>
          
          </div>
      </div>
      <div className={styles.themes}>
        <h1 className={styles.themesHead1}>
          List of Themes
        </h1>
        <h1 className={styles.themesHead2}>
          Explore hackathons organized around various themes
        </h1>
        <span className={styles.themesSubhead}>
                Explore a wide range of hackathons from various themes and
                locations. Join teams, showcase your skills, and win amazing
                prizes.
        </span>
        <Link href="/hackathons" className={styles.themesButton}>
          <span className={styles.themesText}>
            View all themes
          </span>
        </Link>
      </div>
      <div className={styles.topHackathons}>
        <div className={styles.topBanner}>
          <h1 className={styles.topHeading1}>
            Top Hackathons
          </h1>
          <h1 className={styles.topHeading2}>
            Discover the most popular hackathons happening right now
          </h1>
          <Link href="/hackathons" className={styles.bannerButton1}>
            <span className={styles.topText}>
              View all hackathons
            </span>
          </Link>
        </div>
      </div>
      
      <div className={styles.preference}>
        <div className={styles.preference2}>
          <h1 className={styles.preferenceHeading}>
            Online and In-person Hackathons
          </h1>
          <div className={styles.preferenceContainer}>
            <h1 className={styles.prefHeading}>
              <span className={styles.prefText}>
                Choose between online or in-person hackathons based on your
                preference
              </span>
              <br></br>
              <br></br>
            </h1>
            <div className={styles.prefButtonGrp}>
            <Link href="/hackathon" type="button" className={styles.prefButton}>
              Online Hackathons
            </Link>
            <Link href="/hackathon" type="button" className={styles.prefButton}>
              In-person hackathons
            </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      
      <div className={styles.faq}>
        <div className={styles.faqMain}>
          <div className={styles.faq1}>
            <div className={styles.faq2}>
              <span className={styles.faqHead1}>
                FAQ
              </span>
              <h2 className={styles.faqHead2}>Common questions</h2>
              <span className={styles.faqText}>
                  Here are some of the most common questions that we get.
              </span>
            </div>
            <div className={styles.faqContainer}>
              <div className={styles.faqCont}>
                <span className={styles.faqSubhead}>
                  What is a hackathon?
                </span>
                <span className={styles.faqSubtext}>
                  A hackathon is an event where programmers, designers, and
                  other tech enthusiasts come together to collaborate on
                  projects, solve problems, and showcase their skills.
                </span>
              </div>
              <div className={styles.faqCont}>
                <span className={styles.faqSubhead}>
                  How long does a hackathon usually last?
                </span>
                <span className={styles.faqSubtext}>
                  The duration of a hackathon can vary, but most hackathons
                  typically last anywhere from 24 hours to a few days.
                </span>
              </div>
              <div className={styles.faqCont}>
              <span className={styles.faqSubhead}>
                  Who can participate in a hackathon?
                </span>
                <span className={styles.faqSubtext}>
                  Hackathons are open to anyone with an interest in technology
                  and problem-solving. Participants can range from beginners to
                  experienced professionals.
                </span>
              </div>
              <div className={styles.faqCont}>
              <span className={styles.faqSubhead}>
                  Do I need to have a team to participate in a hackathon?
                </span>
                <span className={styles.faqSubtext}>
                  While some hackathons encourage team participation, there are
                  also hackathons that allow individuals to participate and form
                  teams on-site.
                </span>
              </div>
              <div className={styles.faqCont}>
              <span className={styles.faqSubhead}>
                  What should I bring to a hackathon?
                </span>
                <span className={styles.faqSubtext}>
                  It is recommended to bring your own laptop, chargers, any
                  necessary software or tools, and any personal items you may
                  need during the event.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
