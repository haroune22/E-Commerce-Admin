import type { Metadata } from 'next'

import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { ModalProvider } from '@/providers/ModalProvider'
import { ToastProvider } from '@/providers/ToastProvider'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { DarkModeProvider } from '@/providers/DarkModeProvider'




export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body>
          <DarkModeProvider
          >
            <ToastProvider/>
            <ModalProvider/>
            {children}
          </DarkModeProvider>
          </body>
        </html>
      </ClerkProvider>
  )
}
