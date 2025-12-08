import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Resultado from '../src/pages/components/Resultado'
import { useImcStore } from '../src/store/imcStore'

// Mock do framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
  },
}))

// Mock do store
jest.mock('../src/store/imcStore')

const mockUseImcStore = useImcStore as jest.MockedFunction<typeof useImcStore>

describe('Componente Resultado', () => {
  it('deve mostrar mensagem quando não há resultado', () => {
    mockUseImcStore.mockReturnValue({
      imc: "0",
      peso: "0",
      altura: "0",
      historico: [],
      setPeso: jest.fn(),
      setAltura: jest.fn(),
      setImc: jest.fn(),
      adicionarHistorico: jest.fn(),
      limparHistorico: jest.fn(),
      calcularImc: jest.fn(),
    })

    render(<Resultado darkMode={false} />)
    
    expect(screen.getByText('Preencha os campos e calcule seu IMC')).toBeInTheDocument()
  })

  it('deve mostrar resultado quando IMC é calculado', () => {
    mockUseImcStore.mockReturnValue({
      imc: "22.86",
      peso: "70",
      altura: "1.75",
      historico: [],
      setPeso: jest.fn(),
      setAltura: jest.fn(),
      setImc: jest.fn(),
      adicionarHistorico: jest.fn(),
      limparHistorico: jest.fn(),
      calcularImc: jest.fn(),
    })

    render(<Resultado darkMode={false} />)
    
    expect(screen.getByText('22.86')).toBeInTheDocument()
    expect(screen.getByText('Peso normal')).toBeInTheDocument()
    expect(screen.getByText('70 kg')).toBeInTheDocument()
    expect(screen.getByText('1.75 m')).toBeInTheDocument()
  })
})