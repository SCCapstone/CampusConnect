// src/components/Home.js

import React from 'react';
import styles from './Home.module.css';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Home = () => {
  const openVideo = () => {
    window.open('https://youtu.be/FiveK8nVJv0', '_blank');
  };

  return (
    <div style={{textAlign: 'center', marginLeft: '50px', marginRight: '50px'}}>
      <h1>Campus Connect</h1>
      <h3 className={styles.heading2}>Check out a demo of our app below!</h3>
      <img
        className={styles.video_thumbnail}
        src="https://img.youtube.com/vi/FiveK8nVJv0/0.jpg"
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
      <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={1500}
      showStatus={false}
    >
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233856773-75f9787c-0016-4380-b786-3f35246bde9a.png" alt="Image 1" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233856731-313acf20-c518-4829-b699-bb882ba8fb19.png" alt="Image 2" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/227736574-e89381bf-e18e-47c2-8770-09b861c402b2.png" alt="Image 3" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233856890-c608dbd3-05a2-41ee-a380-728ecc996de2.png" alt="Image 4" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/221444775-4f74bec0-9c11-4674-85c9-b9c69db96066.png" alt="Image 5" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233857141-521d3805-643f-484b-8c31-d46f3659cbf0.png" alt="Image 6" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/219555509-0b5c117d-8337-4c37-8d38-dc762c80dca6.png" alt="Image 7" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/219556068-76f8905e-27b9-4ca1-b76f-5d5f4893739e.png" alt="Image 8" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233856837-1c4e0a6b-3c51-4aff-8711-398a6fb0f576.png" alt="Image 9" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/219564357-e4415aee-e316-46bb-84d9-504e7a8a78bf.png" alt="Image 10" />
      </div>
      <div>
        <img style={{width:'20%',height:'auto'}} src="https://user-images.githubusercontent.com/13265359/233857739-e87250ca-308b-4575-b678-25ac23e5ca7c.png" alt="Image 11" />
      </div>
    </Carousel>
      <h3 className={styles.heading}>Contact us!</h3>
      <p>If you have any questions please contact us at <a href="mailto:demboyz.sc@gmail.com">demboyz.sc@gmail.com</a></p>
      <br/><br/>
    </div>
  );
};

export default Home;
