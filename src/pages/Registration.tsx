import axios from "axios";
import { useState } from "react";

const Registration = () => {
  const [error, setError] = useState("");
  const [msg, setmsg] = useState("");
  const [regisData, setRegisData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisData({ ...regisData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/registration",
        regisData,
      );
      console.log(res.data);
      if (res?.data?.success == false) {
        setError(res?.data?.message);
      } else {
        setError("");
        setmsg(res?.data?.message);
      }
    } catch (err) {
      console.log("FULL ERROR:", err);
      console.log("SERVER DATA:", err.response?.data);

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setmsg("");
    }
  };

  return (
    <div>
      <input
        onChange={handleCange}
        name="username"
        type="text"
        placeholder="username"
        value={regisData.username}
      />

      <br />
      <input
        onChange={handleCange}
        name="email"
        type="email"
        placeholder="email"
        value={regisData.email}
      />
      <br />
      <input
        onChange={handleCange}
        name="password"
        type="password"
        placeholder="password"
        value={regisData.password}
      />
      <br />
      <p className={`${error ? "text-red-400" : "text-green-500 "}  p-2  `}>
        {error || msg}
      </p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Registration;
