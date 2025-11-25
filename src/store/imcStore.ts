import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface HistoricoItem {
  peso: string
  altura: string
  imc: string
  data: string
}

interface ImcStore {
  peso: string
  altura: string
  imc: string
  historico: HistoricoItem[]
  mostrarHistorico: boolean
  setPeso: (peso: string) => void
  setAltura: (altura: string) => void
  setImc: (imc: string) => void
  adicionarHistorico: (item: Omit<HistoricoItem, 'data'>) => void
  limparHistorico: () => void
  setMostrarHistorico: (mostrar: boolean) => void
  calcularImc: () => void
}

export const useImcStore = create<ImcStore>()(persist(
  (set, get) => ({
    peso: "0",
    altura: "0", 
    imc: "0",
    historico: [],
    mostrarHistorico: false,
    
    setPeso: (peso) => set({ peso }),
    setAltura: (altura) => set({ altura }),
    setImc: (imc) => set({ imc }),
    
    adicionarHistorico: (item) => {
      const novoItem = { 
        ...item, 
        data: new Date().toLocaleString('pt-BR')
      }
      set((state) => ({
        historico: [...state.historico, novoItem]
      }))
    },
    
    limparHistorico: () => set({ historico: [] }),
    setMostrarHistorico: (mostrar) => set({ mostrarHistorico: mostrar }),
    
    calcularImc: () => {
      const { peso, altura } = get()
      const p = parseFloat(peso.replace(",", "."))
      const a = parseFloat(altura.replace(",", "."))

      if (!isNaN(p) && !isNaN(a) && a > 0) {
        const resultado = p / (a * a)
        const resultadoFormatado = resultado.toFixed(2)
        set({ imc: resultadoFormatado })
        
        get().adicionarHistorico({ peso, altura, imc: resultadoFormatado })
      } else {
        set({ imc: "Inválido" })
      }
    }
  }),
  {
    name: 'imc-storage',
    partialize: (state) => ({ historico: state.historico })
  }
))