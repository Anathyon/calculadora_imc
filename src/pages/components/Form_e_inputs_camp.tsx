import { Dispatch, SetStateAction } from "react"

interface Props_controle {
  label: string
  state: string
  set: Dispatch<SetStateAction<string>>
  vel_max: string
}

export default function Campo_formulario(props: Props_controle) {
  const aumentar = () => {
    props.set((v) => {
        const num = parseFloat(v.replace(",","."))
        return (!isNaN(num) ? Math.min(num + 1, Number(props.vel_max)) : 1).toString()
    })
  }
  const diminuir = () => {
    props.set((v) => {
      const num = parseFloat(v.replace(",","."))
      return (!isNaN(num) ? Math.max(num - 1, 0) : 0).toString()
    })
  }
 
  const decimal = () => {
    if (!props.state.includes(",") && !props.state.includes(".")) {
         props.set(props.state + ",")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const ne_value = e.target.value

    if (/^[0-9]*[.,]?[0-9]*$/.test(ne_value)) {
      const numeric = parseFloat(ne_value.replace(",", "."))
      if (!isNaN(numeric) && numeric <=  Number(props.vel_max)) {
        props.set(ne_value)
      } else if (ne_value === "" || ne_value === "0" || ne_value.endsWith(",") || ne_value.endsWith(".")) {
        props.set(ne_value) 
      }
    }
  }

  return (
    <div className="flex flex-col gap-2 w-64">
      <label className="text-white">{props.label}</label>

      <div className="flex items-center justify-between bg-gradient-to-br from-gray-100 via-gray-300 to-gray-500 rounded-xl shadow-lg px-2 py-1.5">
        <input
          type="text"
          value={props.state}
          onChange={handleChange}
          className="text-2xl font-bold bg-transparent outline-none text-black w-20"
          inputMode="decimal"
          style={{padding:"1.7%"}}
        />

        <div className="flex gap-1">
          <button
            onClick={diminuir}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <i className="bi bi-dash"></i>
          </button>

          <button
            onClick={aumentar}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <i className="bi bi-plus"></i>
          </button>

          <button
            onClick={decimal}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
          >
            <i className="bi bi-dot"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
  