'use client'

import { useEffect } from "react";
import { signOut } from "../fetch";
import { useRouter } from "next/navigation";
import styles from './styles.module.scss'

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    signOut().then(() => router.push('/'))
  }, [])

  return <p className={styles['signout']}>signing out...</p>
}