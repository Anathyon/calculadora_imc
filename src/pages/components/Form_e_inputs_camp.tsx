import { motion } from "framer-motion"
import { useImcStore } from "../../store/imcStore"
import { useState, useEffect } from "react"

interface Props_controle {
  label: string
  state: string
  vel_max: string
}

export default function Campo_formulario(props: Props_controle) {
  const { setPeso, setAltura } = useImcStore()
  const [hasError, setHasError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const isWeight = props.label?.includes("Peso") || false
  const setValue = isWeight ? setPeso : setAltura

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value
    setHasError(false)
    
    // Só permite números, vírgula e ponto
    if (value === "" || /^[0-9]*[.,]?[0-9]*$/.test(value)) {
      const numeric = parseFloat(value.replace(",", "."))
      const maxValue = parseFloat(props.vel_max)
      
      // Não permite valores negativos ou maiores que o limite
      if (value === "" || (!isNaN(numeric) && numeric >= 0 && numeric <= maxValue)) {
        setValue(value)
      }
    }
  }

  const handleBlur = () => {
    if (props.state === "" || props.state === "0") {
      setHasError(true)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}
    >
      <label style={{
        color: '#cbd5e1',
        fontSize: '14px',
        fontWeight: '500',
        margin: '0'
      }}>{props.label}</label>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={props.state}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={props.label?.includes("Peso") ? "Ex: 70.5" : "Ex: 1.75"}
          style={{
            width: '100%',
            backgroundColor: '#374151',
            border: hasError ? '1px solid #ef4444' : '1px solid #4b5563',
            borderRadius: '12px',
            padding: isMobile ? '12px 48px 12px 16px' : '12px 48px 12px 16px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.2s'
          }}
          onFocus={(e) => {
            if (!hasError) {
              e.target.style.borderColor = '#22c55e'
            }
          }}
          inputMode="decimal"
        />
        
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
      
      {hasError && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            color: '#f87171',
            fontSize: '12px',
            margin: '0'
          }}
        >
          Campo obrigatório
        </motion.p>
      )}
    </motion.div>
  )
}
  