// src/components/About.js

import React from 'react';
import styles from './About.module.css';

const About = () => {
  // Add team members' data here
  const teamMembers = [
    {
      name: 'Erik Connerty',
      email: 'erikc@cec.sc.edu',
      imageUrl: 'https://econnerty.github.io/static/media/profile_picture.309b7ef71615eb418517.jpg',
      description: 'Erik is a Ph.D student at the University of South Carolina and the lead developer of Campus Connect. (He\'s the one on the left)',
    },
    {
      name: 'Timothy Kranz',
      email: 'tkranz@email.sc.edu',
      imageUrl: 'https://img.youtube.com/vi/L4aMiWxlYxk/hqdefault.jpg',
      description: 'Timothy is a Computer Science major and the UX/UI designer of Campus Connect.',
    },
    {
        name: 'Coby Arambula',
        email: 'cobya@email.sc.edu',
        imageUrl: 'https://example.com/jane-smith.jpg',
        description: 'Coby is a Computer Engineering major and the UX/UI designer of Campus Connect.',
      },
      {
        name: 'Chase Allison',
        email: 'challison@email.sc.edu',
        imageUrl: 'https://example.com/jane-smith.jpg',
        description: 'Chase is a Computer Engineering major and the UX/UI designer of Campus Connect.',
      },
      {
        name: 'Neekon Sarmadi',
        email: 'nsarmadi@email.sc.edu',
        imageUrl: 'https://media.licdn.com/dms/image/C5603AQFxv4O42T2nUg/profile-displayphoto-shrink_400_400/0/1639803574919?e=1687392000&v=beta&t=op8MMJDJHh7_dykEprrBnqu-M6b-PqvGRk_P7U2g3DY',
        description: 'Neekon is a Computer Information Systems major and masters student at the University of South Carolina. Neekon is one of the developers of Campus Connect.',
      },
  ];

  return (
    <div>
      <h1 style={{textAlign: 'center', marginLeft: '50px', marginRight: '50px'}}>About Campus Connect</h1>
      <p style={{textAlign: 'center', marginLeft: '50px', marginRight: '50px'}}>
        Campus Connect is a social media app designed to help students and faculty
        communicate and collaborate within their campus community.
      </p>
      <h2 style={{textAlign: 'center', marginLeft: '50px', marginRight: '50px'}}>Meet the Team</h2>
      <div className={styles.team_container}>
        {teamMembers.map((member, index) => (
          <div key={index} className={styles.team_member}>
            <img src={member.imageUrl} alt={``} />
            <h3 className={styles.name}>{member.name}</h3>
            <p className={styles.email}>{member.email}</p>
            <p className={styles.description}>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
