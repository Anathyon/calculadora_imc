import { useImcStore } from '../src/store/imcStore'

describe('IMC Store', () => {
  beforeEach(() => {
    useImcStore.setState({
      peso: "0",
      altura: "0",
      imc: "0",
      historico: [],
      mostrarHistorico: false
    })
  })

  it('deve calcular IMC corretamente', () => {
    const store = useImcStore.getState()
    
    store.setPeso("70")
    store.setAltura("1.75")
    store.calcularImc()
    
    const state = useImcStore.getState()
    expect(state.imc).toBe("22.86")
    expect(state.historico).toHaveLength(1)
  })

  it('deve respeitar limite máximo de peso (640kg)', () => {
    const store = useImcStore.getState()
    
    store.setPeso("640")
    store.setAltura("2.80")
    store.calcularImc()
    
    const state = useImcStore.getState()
    expect(state.imc).toBe("81.63")
  })

  it('deve respeitar limite máximo de altura (2.80m)', () => {
    const store = useImcStore.getState()
    
    store.setPeso("100")
    store.setAltura("2.80")
    store.calcularImc()
    
    const state = useImcStore.getState()
    expect(state.imc).toBe("12.76")
  })

  it('deve retornar inválido para valores incorretos', () => {
    const store = useImcStore.getState()
    
    store.setPeso("0")
    store.setAltura("0")
    store.calcularImc()
    
    const state = useImcStore.getState()
    expect(state.imc).toBe("Inválido")
  })

  it('deve limpar histórico', () => {
    const store = useImcStore.getState()
    
    store.setPeso("70")
    store.setAltura("1.75")
    store.calcularImc()
    store.limparHistorico()
    
    const state = useImcStore.getState()
    expect(state.historico).toHaveLength(0)
  })
})