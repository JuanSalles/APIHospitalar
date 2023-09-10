import { Response, Request } from "express";
import { paciente } from "../models/Paciente";
import { consulta } from "../models/Consulta";
import { historico } from "../models/Historico";

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export default class PacienteController {

    static async listarPacientes(req: Request, res: Response) {
        try {
            const listaPacientes = await paciente.find({});
            res.status(200).json(listaPacientes);
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar os pacientes` });
        }
    }


    static async listarPacienteById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const pacienteEncontrado = await paciente.findById(id);
            if (pacienteEncontrado) {
                res.status(200).json(pacienteEncontrado);
            } else {
                res.status(200).json({ message: "Paciente não encontrado na base de dados" });
            }

        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar o paciente` });
        }
    }

    static async adicionaPaciente(req: Request, res: Response) {
        const novoPaciente = req.body;
        try {
            const pacienteCriado = await paciente.create(novoPaciente);
            res.status(201).json({ message: "Paciente cadastrado com sucesso", Paciente: pacienteCriado });
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao cadastrar paciente` })
        }
    }

    static async editarPacientePorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const pacienteEncontrado = await paciente.findByIdAndUpdate(id, req.body);
            if (pacienteEncontrado) {
                res.status(200).json({ message: `Paciente atualizado!` });
            } else {
                res.status(200).json({ message: "Paciente não encontrado na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar o paciente` });
        }
    }

    static async cadastrarConsultaById(req: Request, res: Response) {
        try {
            const idPaciente = req.params.id;
            const idConsulta = req.body.id;
            const pacienteEncontrado = await paciente.findById(idPaciente);
            if (pacienteEncontrado) {
                const novaConsulta = await consulta.findById(idConsulta);
                if (novaConsulta) {
                    const consultas = pacienteEncontrado.consultasMarcadas;
                    consultas.push(novaConsulta);
                    await paciente.findByIdAndUpdate(idPaciente, { consultasMarcadas: consultas });
                    res.status(200).json({ message: `Consulta Adicionada com sucesso!` });
                } else {
                    res.status(200).json({ message: `Consulta não encontrada na base de dados!` });
                }

            } else {
                res.status(200).json({ message: "Paciente não encontrado na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar o paciente` });
        }
    }

    static async finalizarConsultaById(req: Request, res: Response) {
        try {
            const idPaciente = req.query.paciente;
            const idConsulta = req.query.consulta;
            const pacienteEncontrado = await paciente.findById(idPaciente);
            if (pacienteEncontrado) {
                const consultaFinalizada = await consulta.findByIdAndDelete(idConsulta);
                if (consultaFinalizada) {
                    await historico.create(consultaFinalizada);
                    res.status(200).json({ message: `Consulta Finalizada com sucesso!` });
                } else {
                    res.status(200).json({ message: `Consulta não encontrada na base de dados!` });
                }

            } else {
                res.status(200).json({ message: "Paciente não encontrado na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar o paciente` });
        }
    }

    static async deletarPacientePorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const pacienteEncontrado = await paciente.findByIdAndDelete(id);
            if (pacienteEncontrado) {
                res.status(200).json({ message: `Paciente Deletado!` });
            } else {
                res.status(200).json({ message: "Paciente não encontrado na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar o paciente` });
        }
    }

}