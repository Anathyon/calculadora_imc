import Head from 'next/head'
import Calcular_imc from "./components/Calcimc"
import { Inter } from 'next/font/google'
import { useState, useEffect } from 'react'
import { useImcStore } from '../store/imcStore'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dicasOpen, setDicasOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [showPwaNotification, setShowPwaNotification] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const { historico, setPeso, setAltura } = useImcStore()

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const checkPwaInstallation = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      const isInWebAppiOS = 'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true
      const isInstalled = isStandalone || isInWebAppiOS
      
      if (!isInstalled) {
        setShowPwaNotification(true)
        if (!isMobile) {
          setTimeout(() => setShowPwaNotification(false), 5000)
        }
      }
    }
    
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    checkPwaInstallation()
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [isMobile])

  const downloadHistorico = () => {
    if (historico.length === 0) {
      alert('Nenhum histórico disponível para download')
      return
    }

    const csvContent = [
      'Data,Peso (kg),Altura (m),IMC,Classificação',
      ...historico.map(item => {
        const imcNum = parseFloat(item.imc)
        const classificacao = 
          imcNum < 18.5 ? 'Abaixo do peso' :
          imcNum < 25 ? 'Peso normal' :
          imcNum < 30 ? 'Sobrepeso' : 'Obesidade'
        return `${item.data},${item.peso},${item.altura},${item.imc},${classificacao}`
      })
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `historico-imc-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const limparDados = () => {
    setPeso('')
    setAltura('')
    if (isMobile) setSidebarOpen(false)
  }

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <>
      <Head>
        <title>Calculadora IMC - Acompanhe sua saúde</title>
        <meta name="description" content="Calcule seu Índice de Massa Corporal de forma rápida e precisa" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Calculadora IMC" />
        <link rel="icon" href="/assets/icon.png" />
      </Head>
      <div className={inter.className} style={{
        minHeight: '100dvh',
        width: '100dvw',
        backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
        margin: '0',
        padding: '0'
      }}>
      
      {/* PWA Notification */}
      {showPwaNotification && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          color: darkMode ? 'white' : '#1f2937',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: '500',
          maxWidth: isMobile ? '280px' : '320px',
          minWidth: '250px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg style={{ width: '20px', height: '20px', color: '#22c55e' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              <span>Instalar App</span>
            </div>
            <button
              onClick={() => setShowPwaNotification(false)}
              style={{
                background: 'none',
                border: 'none',
                color: darkMode ? '#94a3b8' : '#6b7280',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '0',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>
          <p style={{
            margin: '0 0 12px 0',
            fontSize: '13px',
            color: darkMode ? '#cbd5e1' : '#64748b',
            lineHeight: '1.4'
          }}>
            Adicione à tela inicial para acesso rápido!
          </p>
          {deferredPrompt && (
            <button
              onClick={async () => {
                deferredPrompt.prompt()
                const { outcome } = await deferredPrompt.userChoice
                if (outcome === 'accepted') {
                  setShowPwaNotification(false)
                }
                setDeferredPrompt(null)
              }}
              style={{
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Instalar Agora
            </button>
          )}
        </div>
      )}
      
      {/* Header */}
      <div style={{
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        padding: '1rem 1.5rem',
        width: '100%',
        borderBottom: darkMode ? '1px solid #334155' : '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Logo e Título */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#22c55e',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg style={{ width: '20px', height: '20px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 style={{
              color: darkMode ? 'white' : '#1f2937',
              fontSize: isMobile ? '1.25rem' : '1.5rem',
              fontWeight: '600',
              margin: '0'
            }}>Calculadora IMC</h1>
          </div>

          {/* Botões laterais */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            {isMobile ? (
              <button 
                onClick={() => setSidebarOpen(true)}
                style={{
                  backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  color: darkMode ? 'white' : '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </button>
            ) : (
              <>
                <button onClick={limparDados} style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clipRule="evenodd"/>
                  </svg>
                  Limpar
                </button>
                <button onClick={() => setDicasOpen(true)} style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                  </svg>
                  Dicas
                </button>
                <button onClick={toggleTheme} style={{
                  backgroundColor: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(75, 85, 99, 0.2)',
                  color: darkMode ? '#fbbf24' : '#4b5563',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  {darkMode ? (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                    </svg>
                  ) : (
                    <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                    </svg>
                  )}
                  {darkMode ? 'Claro' : 'Escuro'}
                </button>
                <button 
                  onClick={downloadHistorico}
                  disabled={historico.length === 0}
                  style={{
                    backgroundColor: historico.length === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(34, 197, 94, 0.2)',
                    color: historico.length === 0 ? '#6b7280' : '#22c55e',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: historico.length === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                  Download
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }} onClick={() => setSidebarOpen(false)}>
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            height: '100%',
            width: '280px',
            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
            padding: '1rem',
            borderLeft: darkMode ? '1px solid #334155' : '1px solid #e2e8f0'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: darkMode ? 'white' : '#1f2937', margin: 0 }}>Menu</h3>
              <button onClick={() => setSidebarOpen(false)} style={{
                background: 'none',
                border: 'none',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button onClick={limparDados} style={{
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clipRule="evenodd"/>
                </svg>
                Limpar Dados
              </button>
              <button onClick={() => { setDicasOpen(true); setSidebarOpen(false) }} style={{
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                color: '#3b82f6',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                Dicas de Saúde
              </button>
              <button onClick={toggleTheme} style={{
                backgroundColor: darkMode ? 'rgba(251, 191, 36, 0.2)' : 'rgba(75, 85, 99, 0.2)',
                color: darkMode ? '#fbbf24' : '#4b5563',
                border: 'none',
                borderRadius: '8px',
                padding: '1rem',
                fontSize: '1rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                width: '100%'
              }}>
                {darkMode ? (
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                  </svg>
                )}
                Modo {darkMode ? 'Claro' : 'Escuro'}
              </button>
              <button 
                onClick={downloadHistorico}
                disabled={historico.length === 0}
                style={{
                  backgroundColor: historico.length === 0 ? 'rgba(255, 255, 255, 0.05)' : 'rgba(34, 197, 94, 0.2)',
                  color: historico.length === 0 ? '#6b7280' : '#22c55e',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '1rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: historico.length === 0 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%'
                }}
              >
                <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                Download Histórico
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Dicas de Saúde */}
      {dicasOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }} onClick={() => setDicasOpen(false)}>
          <div style={{
            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0'
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ color: darkMode ? 'white' : '#1f2937', margin: 0, fontSize: '1.5rem' }}>Dicas de Saúde</h2>
              <button onClick={() => setDicasOpen(false)} style={{
                background: 'none',
                border: 'none',
                color: darkMode ? 'white' : '#1f2937',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}>×</button>
            </div>
            <div style={{ color: darkMode ? '#e2e8f0' : '#4b5563', lineHeight: '1.6' }}>
              <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>Classificação do IMC:</h3>
              <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                <li><strong>Abaixo de 18,5:</strong> Abaixo do peso</li>
                <li><strong>18,5 - 24,9:</strong> Peso normal</li>
                <li><strong>25,0 - 29,9:</strong> Sobrepeso</li>
                <li><strong>30,0 ou mais:</strong> Obesidade</li>
              </ul>
              <h3 style={{ color: '#22c55e', marginBottom: '1rem' }}>Dicas Importantes:</h3>
              <ul style={{ paddingLeft: '1.5rem' }}>
                <li>O IMC é apenas um indicador, consulte sempre um profissional de saúde</li>
                <li>Mantenha uma alimentação equilibrada e pratique exercícios regularmente</li>
                <li>Beba bastante água durante o dia</li>
                <li>Durma pelo menos 7-8 horas por noite</li>
                <li>Evite dietas extremas, prefira mudanças graduais</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{
        width: '100%',
        padding: '2rem 1rem'
      }}>
        <Calcular_imc darkMode={darkMode} />
      </div>
      
      {/* Footer */}
      <div style={{
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        padding: isMobile ? '1rem' : '1.5rem 0',
        width: '100%',
        textAlign: 'center',
        marginTop: 'auto',
        borderTop: darkMode ? 'none' : '1px solid #e2e8f0'
      }}>
        <p style={{
          color: darkMode ? '#64748b' : '#6b7280',
          fontSize: isMobile ? '0.75rem' : '0.875rem',
          margin: '0',
          fontWeight: '400'
        }}>Calculadora de IMC - Acompanhe sua saúde</p>
      </div>
      </div>
    </>
  )
}