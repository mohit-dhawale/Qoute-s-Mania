import React from "react";

const About = () => {
  return (
    <section id="about-us" className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <h2 className="display-4 mb-4 text-white">About Quote's Mania</h2>
            <p className="lead text-white-50">
              Welcome to Quote's Mania, your ultimate platform for all things
              related to quotes. Quote's Mania is a powerful and user-friendly
              web application that enables you to explore, create, favorite,
              edit, and manage your favorite quotes effortlessly. Dive into the
              world of wisdom, inspiration, and motivation with our user-centric
              platform.
            </p>
          </div>
          <div className="col-lg-3">
            <img
              src="http://localhost:3000/favicon.ico"
              alt="Quote's Mania"
              className="img-fluid rounded"
              style={{width:200}}
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg">
            <h2 className="display-4 mb-4 text-white">Our Mission</h2>
            <p className="lead text-white-50">
              Our mission at Quote's Mania is to provide a seamless and
              enriching experience for quote enthusiasts. We believe that words
              have the power to inspire, motivate, and change lives. Our
              platform is designed to empower you to connect with the words that
              resonate with you, create your own quotes, and curate your
              personal collection.
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg">
            <h2 className="display-4 mb-4 text-white">Key Features</h2>
            <ul className="list-unstyled text-white-50">
  <li className="list-item lead" style={{ background: 'rgba(0, 0, 0, 0)', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
    Add Quotes: Share your thoughts, experiences, and wisdom with the world by adding your own quotes to our platform. Express yourself and make an impact on others.
  </li>
  <li className="list-item lead" style={{ background: 'rgba(0, 0, 0, 0)', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
    Favorite Quotes: Discover a quote that truly speaks to your heart? Save it to your favorites for easy access and inspiration whenever you need it.
  </li>
  <li className="list-item lead" style={{ background: 'rgba(0, 0, 0, 0)', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
    Edit Quotes: As your journey evolves, so may your perspective. Quote's Mania allows you to revisit and edit your quotes, ensuring they always reflect your current outlook.
  </li>
  <li className="list-item lead" style={{ background: 'rgba(0, 0, 0, 0)', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
    Manage Quotes: Our platform offers a simple and effective way to manage your entire collection of quotes. Organize them, review them, and cherish them.
  </li>
</ul>

          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg">
            <h2 className="display-4 mb-4 text-white">Technology Stack</h2>
            <div className="text-white-50 lead">
  <div style={{ background: 'rgba(0, 0, 0, 0)', border: 'none', padding: '10px', marginBottom: '10px' }}>
    React: The front-end of our application is developed using React, providing a responsive and intuitive user interface that adapts to your needs.
  </div>
  <div style={{ background: 'rgba(0, 0, 0, 0)',border: 'none', padding: '10px', marginBottom: '10px' }}>
    Node.js: The back-end of Quote's Mania is powered by Node.js, offering efficient server-side performance and real-time capabilities.
  </div>
  <div style={{ background: 'rgba(0, 0, 0, 0)',border: 'none', padding: '10px' }}>
    MySQL: We store and manage your quotes and user data in a secure MySQL database, ensuring data integrity and reliability.
  </div>
</div>

          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg">
            <h2 className="display-4 mb-4 text-white">Meet the Developer</h2>
            <p className="lead text-white-50">
              Quote's Mania is the brainchild of Mohit Dhawale, an accomplished
              software developer. Mohit completed his CDAC in DAC courses from
              Sunbeam Pune, bringing a wealth of technical knowledge and
              expertise to the table. His dedication to creating a user-friendly
              and inspirational platform is at the heart of Quote's Mania.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
