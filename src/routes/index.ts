import express from "express";
import { Request, Response } from "express";
import pacientes from "./pacientesRoutes";
import consultas from "./consultasRoutes";

export default function routes (app: any) {
    app.route('/').get((req: Request, res: Response) => res.status(200).send("Curso de node.js"));

    app.use(express.json(), pacientes, consultas);
}