// src/components/Home.js

import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  const openVideo = () => {
    window.open('https://www.youtube.com/watch?v=9tQWLg4E90M', '_blank');
  };

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Campus Connect</h1>
      <h3 className={styles.heading2}>Check out a demo of our app below!</h3>
      <img
        className={styles.video_thumbnail}
        src="https://img.youtube.com/vi/9tQWLg4E90M/0.jpg"
        alt="DEMO"
        onClick={openVideo}
      />
      <h3 className={styles.heading2}>Why use Campus Connect?</h3>
      <p>
        Students can use this social media application to stay in touch with and get involved in the campus community. Users can join groups, exchange images, publish updates, and follow events on it. This app makes it simple for students to stay updated about what's occurring on campus thanks to its intuitive design and user-friendly interface. Additionally, it gives students a venue to interact, exchange ideas, and work together on projects. Students can connect with and participate in their university wherever they are with the help of this app.
      </p>
      <h3 className={styles.heading2}>How to use Campus Connect!</h3>
      <p>
        Using Campus Connect is a breeze! Simply create an account using your UofSC email (it must end in @email.sc.edu) and you'll be sent an email to confirm your registration. Then, you're ready to start taking advantage of all the great features our app has to offer - like creating group chats, making posts, and much more! So what are you waiting for? Get started today with Campus Connect!
      </p>
      <div className={styles.image_row}>
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/227736574-e89381bf-e18e-47c2-8770-09b861c402b2.png" alt="Screenshot 2" />
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/219555237-69f2c3e0-2734-4add-91b2-b269de5bcf28.png" alt="Screenshot 3" />
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/221444567-f4b08674-8638-479c-9c73-7e0da7104ff3.png" alt="Screenshot 5" />
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/221444775-4f74bec0-9c11-4674-85c9-b9c69db96066.png" alt="Screenshot 6" />
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/219555244-16127b83-a5ca-4d8f-800f-bd61513c521d.png" alt="Screenshot 7" />
        <img className={styles.image} src="https://user-images.githubusercontent.com/13265359/219556068-76f8905e-27b9-4ca1-b76f-5d5f4893739e.png" alt="Screenshot 9" />
      </div>
      <h3 className={styles.heading}>Contact us!</h3>
      <p>If you have any questions please contact us at demboyz.sc@gmail.com</p>
      <br/><br/>
    </div>
  );
};

export default Home;
