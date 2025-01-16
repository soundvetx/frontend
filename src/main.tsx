import '@/styles/globals.css'

import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from '@/App.tsx'
import { LoadingProvider } from '@/contexts/loading-context'
import { AuthProvider } from '@/contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
import { LoadingPage } from '@/components/loading-page'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <Suspense fallback={<LoadingPage />}>
            <App />
          </Suspense>

          <Toaster closeButton richColors />
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
