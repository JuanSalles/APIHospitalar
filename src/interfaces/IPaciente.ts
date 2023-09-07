export interface IPaciente {
    name: string
    id: number
    historico: Historico[]
    diagnosticosAnteriores: Diagnostico[]
    consultasMarcadas: Consulta[]
}