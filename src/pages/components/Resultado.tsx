import { motion } from "framer-motion"
import { useImcStore } from "../../store/imcStore"
import { useState, useEffect } from "react"

export default function Resultado() {
  const { imc, peso, altura } = useImcStore()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const getClassificacao = (imcValue: number) => {
    if (imcValue < 18.5) return { texto: "Baixo peso", cor: "#60a5fa", bg: "rgba(30, 58, 138, 0.3)" }
    if (imcValue <= 24.9) return { texto: "Peso normal", cor: "#4ade80", bg: "rgba(20, 83, 45, 0.3)" }
    if (imcValue <= 29.9) return { texto: "Pré-obeso", cor: "#facc15", bg: "rgba(133, 77, 14, 0.3)" }
    if (imcValue <= 34.9) return { texto: "Obesidade grau I", cor: "#fb923c", bg: "rgba(154, 52, 18, 0.3)" }
    if (imcValue <= 39.9) return { texto: "Obesidade grau II", cor: "#f87171", bg: "rgba(153, 27, 27, 0.3)" }
    return { texto: "Obesidade grau III", cor: "#ef4444", bg: "rgba(153, 27, 27, 0.4)" }
  }

  const imcNumerico = parseFloat(imc)
  const classificacao = getClassificacao(imcNumerico)
  const temResultado = !isNaN(imcNumerico) && imc !== "0" && imc !== "Inválido"

  if (!temResultado) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          backgroundColor: '#1e293b',
          borderRadius: '16px',
          padding: isMobile ? '20px' : '24px',
          border: '1px solid #334155',
          textAlign: 'center'
        }}
      >
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
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: 'white',
          margin: '0'
        }}>Preencha os campos e calcule seu IMC</h3>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '24px',
        border: '1px solid #334155'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
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
        <h3 style={{
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: '600',
          color: 'white',
          margin: '0'
        }}>Resultado</h3>
      </div>

      <div style={{
        textAlign: 'center',
        marginBottom: '24px'
      }}>
        <div style={{
          color: '#9ca3af',
          fontSize: '14px',
          marginBottom: '8px'
        }}>Seu IMC é</div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          style={{
            fontSize: isMobile ? '48px' : '60px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            lineHeight: '1'
          }}
        >
          {imc}
        </motion.div>
        
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            color: '#9ca3af',
            fontSize: '14px',
            marginBottom: '8px'
          }}>Classificação</div>
          <div style={{
            backgroundColor: classificacao.bg,
            color: classificacao.cor,
            borderRadius: '8px',
            padding: '12px 16px',
            fontWeight: 'bold',
            fontSize: isMobile ? '16px' : '18px'
          }}>
            {classificacao.texto}
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px',
        textAlign: 'center',
        marginBottom: '16px'
      }}>
        <div>
          <div style={{
            color: '#9ca3af',
            fontSize: '14px',
            marginBottom: '4px'
          }}>Peso</div>
          <div style={{
            color: 'white',
            fontWeight: '600',
            fontSize: isMobile ? '16px' : '18px'
          }}>{peso} kg</div>
        </div>
        <div>
          <div style={{
            color: '#9ca3af',
            fontSize: '14px',
            marginBottom: '4px'
          }}>Altura</div>
          <div style={{
            color: 'white',
            fontWeight: '600',
            fontSize: isMobile ? '16px' : '18px'
          }}>{altura} m</div>
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#6b7280',
        textAlign: 'center'
      }}>
        {new Date().toLocaleString('pt-BR')}
      </div>
    </motion.div>
  )
}