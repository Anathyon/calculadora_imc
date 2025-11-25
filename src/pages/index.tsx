import Head from 'next/head'
import Calcular_imc from "./components/Calcimc"
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      <Head>
        <title>Calculadora IMC - Acompanhe sua saúde</title>
        <meta name="description" content="Calcule seu Índice de Massa Corporal de forma rápida e precisa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2322c55e'%3E%3Cpath d='M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z'/%3E%3C/svg%3E" />
      </Head>
      <div className={inter.className} style={{
        minHeight: '100dvh',
        width: '100dvw',
        backgroundColor: '#0f172a',
        margin: '0',
        padding: '0'
      }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#374151',
        padding: isMobile ? '1.5rem 1rem' : '2rem 0',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: isMobile ? '0.375rem' : '0.5rem',
          marginBottom: isMobile ? '0.375rem' : '0.5rem',
          flexWrap: isMobile ? 'wrap' : 'nowrap'
        }}>
          <svg style={{ 
            width: isMobile ? '24px' : '32px', 
            height: isMobile ? '24px' : '32px', 
            color: '#22c55e' 
          }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
          <h1 style={{
            color: 'white',
            fontSize: isMobile ? '1.75rem' : '2.5rem',
            fontWeight: 'bold',
            margin: '0',
            lineHeight: '1.2'
          }}>Calculadora de IMC</h1>
        </div>
        <p style={{
          color: '#9ca3af',
          fontSize: isMobile ? '0.875rem' : '1.125rem',
          margin: '0',
          fontWeight: '400',
          lineHeight: '1.4',
          maxWidth: isMobile ? '90%' : '100%',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>Calcule seu Índice de Massa Corporal e acompanhe seu histórico</p>
      </div>

      {/* Main Content */}
      <div style={{
        width: '100%',
        padding: '2rem 1rem'
      }}>
        <Calcular_imc />
      </div>
      
      {/* Footer */}
      <div style={{
        backgroundColor: '#1e293b',
        padding: isMobile ? '1rem' : '1.5rem 0',
        width: '100%',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <p style={{
          color: '#64748b',
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          margin: '0',
          fontWeight: '400'
        }}>Calculadora de IMC - Acompanhe sua saúde</p>
      </div>
      </div>
    </>
  )
}