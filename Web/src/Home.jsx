import bus2 from "./assets/bus2.jpg";
import Background from "./components/Background";
import styles from "./core/styles";

const Home = () => {
  return (
    <Background>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bus2})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div style={styles.container}>
        <p>Why Use Metro?</p>
        <div style={styles.box}>
          <div>
            Time-Saving Commutes
            <br /> Optimize your daily travel with our bus booking system. Cut
            down on waiting periods, boost productivity, and make your commuting
            experience efficient.
          </div>
          <div>
            Smooth Urban Mobility
            <br /> Enjoy a hassle-free journey with streamlined processes. No
            more queues, experience comfort, and transform public transport into
            a reliable and pleasant choice for daily travel.
          </div>
          <div>
            Instant Convenience
            <br /> Take control of your travel schedule with our user-friendly
            app.Plan journeys effortlessly, and embrace a modern, convenient
            approach to urban living.
          </div>
        </div>
      </div>
      <div style={styles.container}>
        <div>Metro Rides</div>
        <div>
          <a href="/saccoRagistration">Vehicle Registration</a>
        </div>
      </div>
      <div style={styles.container}>
        <div>Contact Us</div>
        <div style={styles.box}>
          <div>Email</div>
          <div>Phone</div>
          <div>Twitter</div>
        </div>
      </div>
    </Background>
  );
};

export default Home;
