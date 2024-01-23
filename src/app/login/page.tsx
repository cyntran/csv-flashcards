"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
import { loginUser } from "../fetch";
import { useRouter } from "next/navigation";

export default function Page() {
  return <Login />;
}

const Login = () => {
  const [err, setErr] = useState("");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    loginUser(
      event.target["username"].value,
      event.target["password"].value
    ).then((accountId) => {
      accountId
        ? router.push(`/decks?AccountId=${accountId}`)
        : setErr("Wrong credentials");
    });
  };

  const handleChange = (input: any) => {
    setCredentials({
      ...credentials,
      [input.name]: input.value,
    });
  };

  return (
    <div className={styles["parent-container"]}>
      <div className={styles["login-container"]}>
        <h1 className={styles["app-name"]}>CSV To Flashcard</h1>
        <div className={styles["login-component"]}>
          {<p className={styles["err-msg"]}>{err}</p>}
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              name="username"
              placeholder="username"
              onChange={(e) => {
                handleChange(e.target);
              }}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => handleChange(e.target)}
            />
            <button type="submit" className={styles["submit-btn"]}>
              sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
