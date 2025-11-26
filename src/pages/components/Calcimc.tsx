import { motion } from "framer-motion"
import { useImcStore } from "../../store/imcStore"
import { useState, useEffect } from "react"
import Form_e_inputs from "./Form_e_inputs_camp"
import Resultado from "./Resultado"
import Recomendacoes from "./Recomendacoes"
import Historico from "./Historico_pag"

export default function Calcular_imc() {
  const { 
    peso, 
    altura, 
    historico, 
    mostrarHistorico, 
    calcularImc, 
    limparHistorico, 
    setMostrarHistorico 
  } = useImcStore()

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      {/* Layout Principal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '1rem' : '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Card Calcular IMC */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            backgroundColor: '#1e293b',
            borderRadius: '16px',
            padding: isMobile ? '1.25rem' : '1.5rem',
            border: '1px solid #334155'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem'
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
              <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: 'white',
              margin: '0'
            }}>Calcular IMC</h2>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <Form_e_inputs label="Peso (kg)" state={peso} vel_max={"640"} />
            <Form_e_inputs label="Altura (m)" state={altura} vel_max={"2.80"} />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={calcularImc}
            style={{
              width: '100%',
              backgroundColor: '#22c55e',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '16px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#16a34a'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#22c55e'}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Calcular IMC
          </motion.button>
        </motion.div>

        {/* Card Resultado */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Resultado />
          <Recomendacoes />
        </motion.div>
      </div>

      {/* Histórico */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          padding: isMobile ? '20px' : '24px',
          border: '1px solid #334155'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
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
                <svg style={{ width: '16px', height: '16px', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                </svg>
              </div>
              <h2 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '600',
                color: 'white',
                margin: '0'
              }}>Histórico ({historico.length})</h2>
            </div>
            {historico.length > 0 && (
              <button
                onClick={limparHistorico}
                style={{
                  color: '#f87171',
                  fontSize: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
              >
                Limpar
              </button>
            )}
          </div>
          
          {historico.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: isMobile ? '32px 16px' : '48px 24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <svg style={{ width: '32px', height: '32px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
              <p style={{
                color: '#9ca3af',
                fontSize: isMobile ? '16px' : '18px',
                margin: '0 0 4px'
              }}>Nenhum cálculo realizado ainda</p>
              <p style={{
                color: '#6b7280',
                fontSize: '14px',
                margin: '0'
              }}>Seus cálculos aparecerão aqui</p>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: '256px',
              overflowY: 'auto'
            }}>
              {historico.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                    borderRadius: '12px',
                    padding: '16px',
                    border: '1px solid #4b5563'
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr',
                    gap: '16px',
                    textAlign: 'center',
                    marginBottom: isMobile ? '8px' : '0'
                  }}>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>Peso</div>
                      <div style={{ color: 'white', fontWeight: '600' }}>{item.peso} kg</div>
                    </div>
                    <div>
                      <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>Altura</div>
                      <div style={{ color: 'white', fontWeight: '600' }}>{item.altura} m</div>
                    </div>
                    {isMobile ? (
                      <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                        <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>IMC</div>
                        <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '18px' }}>{item.imc}</div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '4px' }}>IMC</div>
                        <div style={{ color: '#4ade80', fontWeight: 'bold', fontSize: '18px' }}>{item.imc}</div>
                      </div>
                    )}
                  </div>
                  <div style={{
                    color: '#6b7280',
                    fontSize: '12px',
                    textAlign: 'center',
                    marginTop: '8px'
                  }}>
                    {item.data}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <Historico
        aberto={mostrarHistorico}
        fechar={() => setMostrarHistorico(false)}
        historico={historico}
        limpar_historico={limparHistorico}
      />
    </div>
  )
}