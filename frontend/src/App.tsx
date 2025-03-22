import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const startBot = async () => {
    setIsDisabled(true);
    try {
      const res = await axios.post("http://localhost:5000/start", {
        email,
        password,
        resumePath,
      });
      console.log(res.data);
    } catch (err) {
      console.error("Error starting bot:", err);
    }
    setIsDisabled(false);
  };

  return (
    <div className="container">
      <div className="card">
        <img
          src="/naukri_icon.svg"
          alt="LinkedIn Logo"
          width={120}
          height={50}
          style={{ objectFit: "cover" }}
        />

        <h2 className="heading">Naukri Bot</h2>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Enter resume path"
            value={resumePath}
            onChange={(e) => setResumePath(e.target.value)}
            className="input"
          />
        </div>

        <button onClick={startBot} disabled={isDisabled} className="button">
          {isDisabled ? "Running..." : "Start"}
        </button>
      </div>
    </div>
  );
}

export default App;
