'use client'

import { useEffect } from 'react'
import styles from './main.module.scss'
import { getStoredUserId } from './fetch'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const userId = getStoredUserId();
    if (userId) {
      router.push(`/decks?AccountId=${userId}`);
    } else {
      router.push('/login')
    }
  }, [])

  return (
    <main className={styles.main}></main>
  )
}
