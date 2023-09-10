import { Response, Request } from "express";
import { paciente } from "../models/Paciente";
import { consulta } from "../models/Consulta";
import { medico } from "../models/Medico";

function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message
    return String(error)
}

export default class ConsultaController {

    static async listarConsultas(req: Request, res: Response) {
        try {
            const listaConsultas = await consulta.find({});
            res.status(200).json(listaConsultas);
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar todas as consultas marcadas` });
        }
    }

    static async listarConsultaById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const consultaEncontrada = await consulta.findById(id);
            if (consultaEncontrada) {
                res.status(200).json(consultaEncontrada);
            } else {
                res.status(200).json({ message: "Consulta não encontrada na base de dados" });
            }

        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar a consulta` });
        }
    }

    static async adicionaConsulta(req: Request, res: Response) {
        const novaConsulta = req.body;
        try {
            const pacienteEncontrado = await paciente.findById(novaConsulta.paciente);

            const pacienteDaConsulta = {
                name: pacienteEncontrado?.name,
                id: pacienteEncontrado?._id
            }

            const listaDeConsultas = pacienteEncontrado?.consultasMarcadas;
            
            const medicoDaConsulta = await medico.findById(novaConsulta.medico);

            const consultaSimplificada = {
                medico: medicoDaConsulta?.name,
                dataEHora: novaConsulta.dataEHora
            }

            listaDeConsultas?.push(consultaSimplificada);

            await paciente.findByIdAndUpdate(novaConsulta.paciente, {consultasMarcadas: listaDeConsultas} )

            const consultaCompleta = {...novaConsulta, paciente: pacienteDaConsulta, medico: medicoDaConsulta};

            const consultaCriada = await consulta.create(consultaCompleta);

            res.status(201).json({ message: "Consulta cadastrada com sucesso", Consulta: consultaCriada });
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao cadastrar consulta` });
        }
    }

    static async editarConsultaPorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const consultaEncontrada = await consulta.findByIdAndUpdate(id, req.body);
            if (consultaEncontrada) {
                res.status(200).json({ message: `Consulta atualizada!` });
            } else {
                res.status(200).json({ message: "Consulta não encontrada na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar a consulta` });
        }
    }

    static async deletarConsultaPorId(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const consultaEncontrada = await consulta.findByIdAndDelete(id);
            if (consultaEncontrada) {
                res.status(200).json({ message: `Consulta Deletada!` });
            } else {
                res.status(200).json({ message: "Consulta não encontrada na base de dados" });
            }
        } catch (error) {
            res.status(500).json({ message: `${getErrorMessage(error)} - falha ao buscar a consulta` });
        }
    }

}