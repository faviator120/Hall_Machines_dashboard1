// Import statements
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig/firebaseConfig";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { Container, Row, Col } from "reactstrap";

// Constant for styling
const space = { marginTop: "20px" };

// Login component
const Login = () => {
  // State variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  // Access the navigate function
  const navigate = useNavigate();

  // Function to handle login
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoginError(null);
        // Use navigate to redirect to the specified route
        navigate("/Home");
        console.log("user", user);
      })
      .catch((error) => {
        let errorMessage =''
        if(error.code ==='auth/network-request-failed')
        errorMessage = "Network failure."; 
      else
         errorMessage = "Incorrect username or password."; // More generic error message
        setLoginError(errorMessage);
        console.error(error.code);
      });
  };

  // Return the JSX
  return (
    <div>
      <Container
        className="w-100 justify-content-center align-items-center"
        style={{
          backgroundColor: "#11111166",
          borderRadius: "10px",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: '2vh 5vw',
        }}
      >
        <Row  className=" text-white justify-content-center align-items-center">
         {/* Inserting the image */}
         <img  src={require("assets/img/poster.png")} alt="Poster" style={{ width:"80%", padding:"20px", marginBottom: "20px" }} />
         </Row>

        <div
          className="w-100 text-white justify-content-center align-items-center"
        >
         
          <div style={{width:"100%", backgroundColor: "#11111166", borderRadius: "10px", padding: "20px" }}>
            <Row style={space} className="align-items-center">
              <Col xs={12} md={4} className="d-flex align-items-center">
                <label htmlFor="email-address" style={{ marginBottom: 0 }}>Email address</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  type="email"
                  className="form-control"
                  id="email-address"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Row>

            <Row style={space} className="align-items-center">
              <Col xs={12} md={4} className="d-flex align-items-center">
                <label htmlFor="password" style={{ marginBottom: 0 }}>Password</label>
              </Col>
              <Col xs={12} md={8}>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  aria-describedby="emailHelp"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <Col xs={12} className="align-items-center" style={space}>
                {loginError && <p className="text-danger text-center">{loginError}</p>}
              </Col>
            </Row>

            <div className="text-center" style={space}>
              <button type="button" className="btn btn-primary" onClick={onLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </Container>

      <div
        className="text-center"
        style={{
          width: '100%',
          position: 'absolute',
          bottom: '1vh',
          paddingBottom: '1vh',
        }}
      >
        <p>Developed by BB&GG Group ®</p>
        <p>Network Partners: Premier Sales Agency J&K</p>
      </div>
    </div>
  );
};

export default Login;
