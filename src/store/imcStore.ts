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
  setPeso: (peso: string) => void
  setAltura: (altura: string) => void
  setImc: (imc: string) => void
  adicionarHistorico: (item: Omit<HistoricoItem, 'data'>) => void
  limparHistorico: () => void
  calcularImc: () => void
}

const MAX_HISTORICO = 50

export const useImcStore = create<ImcStore>()(persist(
  (set, get) => ({
    peso: "0",
    altura: "0", 
    imc: "0",
    historico: [],

    setPeso: (peso: string) => set({ peso }),
    setAltura: (altura: string) => set({ altura }),
    setImc: (imc: string) => set({ imc }),
    
    adicionarHistorico: (item: Omit<HistoricoItem, 'data'>) => {
      const novoItem: HistoricoItem = { 
        ...item, 
        data: new Date().toLocaleString('pt-BR')
      }
      set((state) => {
        const novoHistorico = [...state.historico, novoItem]
        return {
          historico: novoHistorico.slice(-MAX_HISTORICO)
        }
      })
    },
    
    limparHistorico: () => set({ historico: [] }),

    calcularImc: () => {
      const { peso, altura } = get()
      const p = parseFloat(peso.replace(",", "."))
      const a = parseFloat(altura.replace(",", "."))

      if (!isNaN(p) && !isNaN(a) && p > 0 && a > 0) {
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