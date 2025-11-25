import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HistoricoItem {
  peso: string
  altura: string
  imc: string
  data: string
}

interface HistoricoProps {
  aberto: boolean
  fechar: () => void
  historico: HistoricoItem[]
  limpar_historico: () => void
}

export default function Historico({ aberto, fechar, historico, limpar_historico }: HistoricoProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const mostrou_alerta = useRef(false)
  
  useEffect(() => {
    if (!aberto || !modalRef.current) return

    const modal = modalRef.current

    const modalW = modal.offsetWidth
    const modalH = modal.offsetHeight
    const telaW = window.innerWidth
    const telaH = window.innerHeight

    const centroX = (telaW - modalW) / 2
    const centroY = (telaH - modalH) / 2

    modal.style.left = `${centroX}px`
    modal.style.top = `${centroY}px`
  }, [aberto])

  useEffect(() => {
    if (aberto && !mostrou_alerta.current && window.innerWidth >= 768) {
      alert("Você pode arrastar essa janela clicando no topo dela!")
      mostrou_alerta.current = true
    }
  }, [aberto])

  useEffect(() => {
    if (!aberto || window.innerWidth < 768) return

    const modal = modalRef.current
    if (!modal) return

    let movendo = false
    let startX = 0, startY = 0
    let offsetX = 0, offsetY = 0

    const header = modal.querySelector(".drag-header") as HTMLElement
    if (!header) return

    const mouseDown = (ev: MouseEvent) => {
      movendo = true
      startX = ev.clientX
      startY = ev.clientY
      const rect = modal.getBoundingClientRect()
      offsetX = rect.left
      offsetY = rect.top
      document.addEventListener("mousemove", mouseMove)
      document.addEventListener("mouseup", mouseUp)
    }

    const mouseMove = (e: MouseEvent) => {
      if (!movendo) return

      let x = offsetX + (e.clientX - startX)
      let y = offsetY + (e.clientY - startY)

      const modalW = modal.offsetWidth
      const modalH = modal.offsetHeight
      const telaW = window.innerWidth
      const telaH = window.innerHeight

      x = Math.max(0, Math.min(x, telaW - modalW))
      y = Math.max(0, Math.min(y, telaH - modalH))

      modal.style.left = `${x}px`
      modal.style.top = `${y}px`
    }

    const mouseUp = () => {
      movendo = false
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)
    }

    header.addEventListener("mousedown", mouseDown)

    return () => {
      header.removeEventListener("mousedown", mouseDown)
      document.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseup", mouseUp)
    }
  }, [aberto])

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={fechar}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-hidden border border-slate-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <i className="bi bi-clock-history text-white"></i>
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Histórico ({historico.length})
                </h2>
              </div>
              <button
                onClick={fechar}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              >
                <i className="bi bi-x text-lg"></i>
              </button>
            </div>

            <div className="overflow-y-auto max-h-96 space-y-3">
              {historico.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="bi bi-exclamation-circle text-2xl text-slate-400"></i>
                  </div>
                  <p className="text-slate-400">Nenhum cálculo realizado ainda</p>
                  <p className="text-slate-500 text-sm mt-1">Seus cálculos aparecerão aqui</p>
                </div>
              ) : (
                historico.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-slate-700/50 rounded-xl p-4 border border-slate-600"
                  >
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-slate-400 text-xs">Peso</div>
                        <div className="text-white font-semibold">{item.peso} kg</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">Altura</div>
                        <div className="text-white font-semibold">{item.altura} m</div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs">IMC</div>
                        <div className="text-green-400 font-bold text-lg">{item.imc}</div>
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs text-center mt-2">
                      {item.data}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={limpar_historico}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <i className="bi bi-trash"></i>
                Limpar Histórico
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fechar}
                className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Fechar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}