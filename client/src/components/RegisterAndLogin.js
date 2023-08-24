import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export const RegisterAndLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState("Login");

  const navigate = useNavigate();
  const {
    streamKey,
    username: name,
    setStreamKey,
    setUsername: setName,
  } = useContext(UserContext);

  async function SubmitHandeler() {
    const url = tab === "Register" ? "/signup" : "/login";
    try {
      const { data, status } = await axios.post(url, {
        username,
        email,
        password,
      });
      if (status === 200) {
        setName(data.username);
        setStreamKey(data.streamKey);
        navigate("/");
      }
    } catch (error) {}
  }
  function changeTab() {
    if (tab === "Register") setTab("Login");
    else setTab("Register");
  }
  return (
    <section className="flex flex-col items-center justify-center h-screen mx-5 my-2 space-y-10 md:flex-row md:space-y-0 md:space-x-16 md:mx-0 md:my-0">
      <div className="max-w-sm md:w-1/3">
        <img src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" />
      </div>
      <div className="max-w-sm md:w-1/3">
        <div className="text-center md:text-left">
          <label className="mr-1">Sign in with</label>
          <button
            type="button"
            className="mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </button>
          <button
            type="button"
            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-3.5 w-3.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </button>
        </div>
        <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 font-semibold text-center text-slate-500">
            Or
          </p>
        </div>
        {tab === "Register" && (
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="w-full px-4 py-2 text-sm border border-gray-300 border-solid rounded"
            type="text"
            placeholder="Username"
          />
        )}
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full px-4 py-2 mt-4 text-sm border border-gray-300 border-solid rounded"
          type="password"
          placeholder="Password"
        />
        <div className="flex justify-between mt-4 text-sm font-semibold">
          <label className="flex cursor-pointer text-slate-500 hover:text-slate-600">
            <input className="mr-1" type="checkbox" />
            <span>Remember Me</span>
          </label>
          <a
            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center md:text-left">
          <button
            onClick={() => {
              SubmitHandeler();
            }}
            className="px-4 py-2 mt-4 text-xs tracking-wider text-white uppercase bg-blue-600 rounded hover:bg-blue-700"
            type="submit"
          >
            {tab === "Login" ? "Login" : "Register"}
          </button>
        </div>
        <div className="mt-4 text-sm font-semibold text-center text-slate-500 md:text-left">
          {tab === "Login"
            ? `Don't have an account?`
            : "Already have an account?"}{" "}
          <a
            className="text-red-600 cursor-pointer hover:underline hover:underline-offset-4"
            onClick={() => {
              changeTab();
            }}
          >
            {tab === "Login" ? "Register" : "Login"}
          </a>
        </div>
      </div>
    </section>
  );
};
