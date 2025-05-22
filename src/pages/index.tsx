import { useState, useEffect } from "react"
import Calcular_imc from "./components/Calcimc"
import { Lora } from 'next/font/google'

const lora = Lora ({
  subsets: ['latin'],      
  weight: ['400', '700'],   
  display: 'swap',         
})

export default function Home() {
  
   const [ajuste_css,Set_ajuste_css] = useState<string>("")
  
    useEffect(()=>{
        const aplicar_classe = () => {
        const largura = window.innerWidth
        if (largura <= 640) {
            Set_ajuste_css("ajuste_m")
        }else if (largura <= 1024){
            Set_ajuste_css("ajuste_t") 
        }else{
            Set_ajuste_css("ajuste_d") 
        }
      }
  
      aplicar_classe()
      window.addEventListener("resize", aplicar_classe)
      return () => window.removeEventListener("resize", aplicar_classe)
    },[])
  
  return (
   <section className={lora.className}>
   <div className={`bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 
                   h-auto w-full max-w-screen-lg mx-auto flex flex-col relative 
                   rounded-2xl mt-6 p-4 sm:p-6 ${ajuste_css}`}
                   style={{padding:"3%"}}>
           <h1 className="text-white text-xl font-semibold text-center mt-[5%]">Calculadora IMC</h1>
           <Calcular_imc/>
    </div>
    </section>
  )
}