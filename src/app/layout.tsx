import type { Metadata } from 'next'
import { Karla } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import nav from './nav.module.scss'
import { useEffect, useState } from 'react'
import { getStoredUserId } from './fetch'

const karla = Karla({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CSV To Flashcard App',
  icons: "https://fonts.googleapis.com/icon?family=Material+Icons"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="en">
      <body className={karla.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
