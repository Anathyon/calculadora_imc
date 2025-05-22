interface TabelaProps {
  imc_res: number
}

export default function Tabela_imc({ imc_res }: TabelaProps) {
  const marcar = (min: number, max: number) =>
    imc_res >= min && imc_res <= max ? "bg-black text-white font-bold" : ""

  const acima = imc_res > 40 ? "bg-black text-white font-bold" : ""

  return (
    <div className="overflow-x-auto max-w-md w-auto rounded-xl shadow-lg mt-4" style={{marginTop:"2%", marginBottom:"2%"}}>
      <table className="w-full text-center table-fixed border-collapse border border-gray-300">
        <thead className="bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 text-black">
          <tr>
            <th className="border border-gray-400 px-2 py-2">Classificação</th>
            <th className="border border-gray-400 px-2 py-2">IMC</th>
          </tr>
        </thead>
        <tbody className="bg-white/80 text-gray-900">
          <tr className={imc_res < 18.5 ? "bg-black text-white font-bold" : ""}>
            <td className="border border-gray-300 px-2 py-2">Baixo peso</td>
            <td className="border border-gray-300 px-2 py-2">Menor que 18,5</td>
          </tr>
          <tr className={marcar(18.5, 24.9)}>
            <td className="border border-gray-300 px-2 py-2">Peso normal</td>
            <td className="border border-gray-300 px-2 py-2">18,5 – 24,9</td>
          </tr>
          <tr className={marcar(25, 29.9)}>
            <td className="border border-gray-300 px-2 py-2">Pré-obeso</td>
            <td className="border border-gray-300 px-2 py-2">25 – 29,9</td>
          </tr>
          <tr className={marcar(30, 34.9)}>
            <td className="border border-gray-300 px-2 py-2">Obesidade 1</td>
            <td className="border border-gray-300 px-2 py-2">30 – 34,9</td>
          </tr>
          <tr className={marcar(35, 39.9)}>
            <td className="border border-gray-300 px-2 py-2">Obesidade 2</td>
            <td className="border border-gray-300 px-2 py-2">35 – 39,9</td>
          </tr>
          <tr className={acima}>
            <td className="border border-gray-300 px-2 py-2">Obesidade 3</td>
            <td className="border border-gray-300 px-2 py-2">Acima de 40</td>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}