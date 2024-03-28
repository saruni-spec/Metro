import bus2 from "./assets/bus2.jpg";
import Background from "./components/Background";
import styles from "./core/styles";

const Home = () => {
  const emailAddress = "smithsaruni16@gmail.com";
  return (
    <Background>
      <div>
        <a
          href="/saccoRagistration"
          style={{ padding: 10, marginRight: 50, marginBottom: 10 }}
        >
          Sacco Registration
        </a>

        <a href="/login" style={{ padding: 10, marginLeft: 50 }}>
          Login
        </a>
      </div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${bus2})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          marginTop: 20,
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
      <div style={styles.container}></div>
      <div style={styles.container}>
        <div style={styles.box}>
          <div>
            Email: <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
          </div>
        </div>
      </div>
    </Background>
  );
};

export default Home;
