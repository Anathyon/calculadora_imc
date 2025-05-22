import { useRef, useEffect, } from "react"

interface HistoricoProps {
  aberto: boolean
  fechar: () => void
  historico: { peso: string, altura: string, imc: string }[]
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

  if (!aberto) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50">
      <div
        ref={modalRef}
        className={`
          absolute 
          w-[90vw] max-w-[30rem] 
          p-4 rounded-xl 
          bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 
          shadow-xl text-center cursor-default
          text-base
        `}
        style={{
          position: "absolute",
        }}
      >
        <h2 className="drag-header cursor-move font-bold mb-4 text-gray-800 select-none text-2xl">
          Histórico de IMC
        </h2>

        <ul className="space-y-2 text-gray-800 items-center justify-center flex flex-col">
          {historico.length === 0 ? (
            <li>Nenhum dado ainda.</li>
          ) : (
            historico.map((e, i) => (
              <li key={i} className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-900 border-2 p-2 rounded w-[90%] text-white" style={{margin:"0.5%"}}>
                Peso: {e.peso} kg, Altura: {e.altura} m, IMC: {e.imc}
              </li>
            ))
          )}
        </ul>

        <div className="mt-4 flex justify-center gap-4 flex-wrap">
          <button
            onClick={limpar_historico}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            style={{margin:"1%", padding:"1%"}}
          >
            Limpar
          </button>
          <button
            onClick={fechar}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
            style={{margin:"1%", padding:"1%"}}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}