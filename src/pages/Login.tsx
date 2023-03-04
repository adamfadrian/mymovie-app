import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, login } from "../features/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies();

  const handleLogin = () => {
    const user: User = {
      username,
      password,
    };
    if (user.username !== "" && user.password !== "") {
      setCookie("Username", username, { path: "/" });
      setCookie("Password", password, { path: "/" });
      dispatch(login(user));
      navigate(`/${username}`, {
        state: {
          username: username,
        },
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "Username or password is empty",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-md shadow-md flex flex-col gap-5">
        <h1>Login</h1>
        <div>
        <h4>Username :</h4>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs bg-white"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div>
        <h4>Password :</h4>
        <input
          type="password"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button
          className="btn btn-outline btn-success"
          type="submit"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
