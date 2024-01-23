"use client";

import { ReactElement } from "react";
import Link from "next/link";
import styles from "./layout.module.scss";

function Nav() {
  return (
    <div className={styles["nav-container"]}>
      <div className={styles["nav"]}>
        <div className={styles["nav-upload-csv"]}>
          <p>Upload CSV</p>
          <img src={"/info.svg"} style={{ color: "#fff" }} />
        </div>
        <div className={styles["nav-divider"]}></div>
        <Link className={styles["nav-signout-link"]} href={"/signout"}>
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default function LayoutWithNav({
  children,
}: {
  children: ReactElement;
}) {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
}
