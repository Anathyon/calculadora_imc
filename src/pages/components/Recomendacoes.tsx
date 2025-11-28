import { motion } from "framer-motion"
import { useImcStore } from "../../store/imcStore"
import { useState, useEffect } from "react"

interface RecomendacoesProps {
  darkMode: boolean
}

export default function Recomendacoes({ darkMode }: RecomendacoesProps) {
  const { imc } = useImcStore()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  const getRecomendacoes = (imcValue: number) => {
    if (imcValue < 18.5) {
      return {
        titulo: "Baixo Peso - Recomendações",
        cor: "#60a5fa",
        icone: "⚠️",
        dicas: [
          "Consulte um nutricionista para ganho de peso saudável",
          "Inclua mais proteínas e carboidratos na dieta",
          "Faça exercícios de fortalecimento muscular",
          "Monitore sua saúde regularmente"
        ]
      }
    }
    if (imcValue <= 24.9) {
      return {
        titulo: "Peso Normal - Mantenha o Equilíbrio",
        cor: "#4ade80",
        icone: "✅",
        dicas: [
          "Continue com uma alimentação balanceada",
          "Pratique exercícios regularmente (150min/semana)",
          "Mantenha hidratação adequada",
          "Durma bem (7-9 horas por noite)"
        ]
      }
    }
    if (imcValue <= 29.9) {
      return {
        titulo: "Pré-obesidade - Ação Preventiva",
        cor: "#facc15",
        icone: "⚡",
        dicas: [
          "Reduza calorias gradualmente (300-500 cal/dia)",
          "Aumente atividade física para 300min/semana",
          "Evite alimentos ultraprocessados",
          "Busque orientação profissional"
        ]
      }
    }
    if (imcValue <= 34.9) {
      return {
        titulo: "Obesidade Grau I - Mudanças Necessárias",
        cor: "#fb923c",
        icone: "🎯",
        dicas: [
          "Procure acompanhamento médico e nutricional",
          "Estabeleça metas de perda de peso realistas",
          "Combine dieta e exercícios supervisionados",
          "Considere apoio psicológico se necessário"
        ]
      }
    }
    if (imcValue <= 39.9) {
      return {
        titulo: "Obesidade Grau II - Intervenção Urgente",
        cor: "#f87171",
        icone: "🚨",
        dicas: [
          "Busque acompanhamento médico imediato",
          "Avalie riscos cardiovasculares",
          "Considere tratamentos especializados",
          "Monitore pressão arterial e glicemia"
        ]
      }
    }
    return {
      titulo: "Obesidade Grau III - Cuidado Intensivo",
      cor: "#ef4444",
      icone: "🏥",
      dicas: [
        "Procure equipe médica multidisciplinar",
        "Avalie opções de cirurgia bariátrica",
        "Monitore comorbidades constantemente",
        "Suporte familiar e psicológico essencial"
      ]
    }
  }

  const imcNumerico = parseFloat(imc)
  const temResultado = !isNaN(imcNumerico) && imc !== "0" && imc !== "Inválido"

  if (!temResultado) return null

  const recomendacao = getRecomendacoes(imcNumerico)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      style={{
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '24px',
        border: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
        marginTop: '16px'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{
          fontSize: '24px'
        }}>
          {recomendacao.icone}
        </div>
        <h3 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: recomendacao.cor,
          margin: '0'
        }}>{recomendacao.titulo}</h3>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {recomendacao.dicas.map((dica, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '12px',
              backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f8fafc',
              borderRadius: '8px',
              border: `1px solid ${recomendacao.cor}20`
            }}
          >
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: recomendacao.cor,
              borderRadius: '50%',
              marginTop: '6px',
              flexShrink: 0
            }} />
            <span style={{
              color: darkMode ? '#e5e7eb' : '#374151',
              fontSize: isMobile ? '14px' : '15px',
              lineHeight: '1.5'
            }}>
              {dica}
            </span>
          </motion.div>
        ))}
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        borderRadius: '8px',
        border: '1px solid rgba(34, 197, 94, 0.2)'
      }}>
        <p style={{
          color: darkMode ? '#9ca3af' : '#6b7280',
          fontSize: '12px',
          margin: '0',
          textAlign: 'center'
        }}>
          ⚠️ Estas são orientações gerais. Sempre consulte profissionais de saúde para orientação personalizada.
        </p>
      </div>
    </motion.div>
  )
}