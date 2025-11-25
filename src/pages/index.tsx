import Head from 'next/head'
import Calcular_imc from "./components/Calcimc"
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function Home() {
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
        backgroundColor: '#1e293b',
        padding: '1rem 0',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
          padding: '0 1rem'
        }}>
          <svg style={{ width: '24px', height: '24px', color: '#4ade80' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
          </svg>
          <h1 style={{
            color: 'white',
            fontSize: '18px',
            fontWeight: '500',
            margin: '0',
            textAlign: 'center'
          }}>Calculadora de IMC - Acompanhe sua saúde</h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        width: '100%',
        padding: '2rem 1rem'
      }}>
        <Calcular_imc />
      </div>
      </div>
    </>
  )
}