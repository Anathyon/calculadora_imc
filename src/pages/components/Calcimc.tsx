import { useState } from "react"
import Form_e_inputs from "./Form_e_inputs_camp"
import Tabela_imc from "./Tabela_Info_imc"
import Historico from "./Historico_pag"


export default function Calcular_imc() {
  const [peso, setPeso] = useState<string>("0")
  const [altura, setAltura] = useState<string>("0")
  const [imc, setImc] = useState<string>("0")
  const [historico, setHistorico] = useState<{ peso: string, altura: string, imc: string }[]>([])
  const [mostrarHistorico, setMostrarHistorico] = useState(false)

  const limpa_historico = ():void => {
       setHistorico([])
  }

  const calc_imc = ():void =>  {
    const p = parseFloat(peso.replace(",", "."))
    const a = parseFloat(altura.replace(",", "."))

    if (!isNaN(p) && !isNaN(a) && a > 0) {
      const resultado = p / (a * a)
      const resultadoFormatado = resultado.toFixed(2)
      setImc(resultadoFormatado)

      setHistorico(prev => [...prev, { peso, altura, imc: resultadoFormatado }])
    } else {
      setImc("Inválido")
    }
  }

  return (
    <div className="flex justify-center flex-col items-center w-full mb-6">
      <Form_e_inputs label="Peso" state={peso} set={setPeso} vel_max={"635"} />
      <Form_e_inputs label="Altura" state={altura} set={setAltura} vel_max={"2.51"} />

      <p className="bg-white/10 text-white text-lg px-4 py-2 rounded-lg shadow-sm my-4" style={{margin:"2%", padding:"0.7%"}}>
        Resultado: {imc}
      </p>

      <button
        className="bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
        onClick={calc_imc}
        style={{padding:"0.5%"}}
      >
        Enviar medidas <i className="bi bi-send"></i>
      </button>

      <Tabela_imc imc={parseFloat(imc)} />

      <button
        className="bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 text-gray-900 font-semibold px-6 py-2 rounded-lg shadow-lg hover:scale-105 transition-all"
        onClick={() => setMostrarHistorico(true)}
        style={{padding:"0.5%"}}
      >
        Ver Histórico
      </button>

      <Historico
        aberto={mostrarHistorico}
        fechar={() => setMostrarHistorico(false)}
        historico={historico}
        limpar_historico={limpa_historico}
      />
    </div>
  )
}