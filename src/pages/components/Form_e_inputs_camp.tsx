import { motion } from "framer-motion"
import { useImcStore } from "../../store/imcStore"
import { useState, useCallback, useMemo } from "react"

interface FormInputProps {
  label: string
  state: string
  vel_max: string
  darkMode: boolean
}

export default function Campo_formulario({ label, state, vel_max, darkMode }: FormInputProps) {
  const { setPeso, setAltura } = useImcStore()
  const [hasError, setHasError] = useState(false)
  
  const isWeight = useMemo(() => label?.includes("Peso") ?? false, [label])
  const setValue = isWeight ? setPeso : setAltura
  const placeholder = isWeight ? "Ex: 70.5" : "Ex: 1.75"

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    setHasError(false)
    
    if (value === "" || /^[0-9]*[.,]?[0-9]*$/.test(value)) {
      const numeric = parseFloat(value.replace(",", "."))
      const maxValue = parseFloat(vel_max)
      
      if (value === "" || (!isNaN(numeric) && numeric >= 0 && numeric <= maxValue)) {
        setValue(value)
      }
    }
  }, [setValue, vel_max])

  const handleBlur = useCallback(() => {
    if (state === "" || state === "0") {
      setHasError(true)
    }
  }, [state])

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
        color: darkMode ? '#cbd5e1' : '#374151',
        fontSize: '14px',
        fontWeight: '500',
        margin: '0'
      }}>{label}</label>

      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={state}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          style={{
            width: '100%',
            backgroundColor: darkMode ? '#374151' : '#f8fafc',
            border: hasError ? '1px solid #ef4444' : (darkMode ? '1px solid #4b5563' : '1px solid #d1d5db'),
            borderRadius: '12px',
            padding: '12px 48px 12px 16px',
            color: darkMode ? 'white' : '#1f2937',
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
          aria-label={label}
          aria-invalid={hasError}
        />
        
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <svg style={{ width: '20px', height: '20px', color: darkMode ? '#9ca3af' : '#6b7280' }} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
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
  