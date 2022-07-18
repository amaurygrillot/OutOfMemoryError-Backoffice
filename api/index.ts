import { Express } from "express";
import { pythonRouter } from "../python-executer/python-executer.route";
//import { nodeRouter} from "../node-executer/node-executer.route";
import {javaRouter} from "../java-executer/java-executer.route";
import {cRouter} from "../c-executer/c-executer.route";
import {executeCommand} from "./code-executer";

export function buildRoutes(app: Express) {
    app.get("/", async function(req, res) {
        res.send("OutOfMemoryError API");
    });

    app.use("/python", pythonRouter);

   // app.use("/node", nodeRouter);

    app.use("/c", cRouter);

    app.use("/java", javaRouter);

}

export function startSSH()
{
    const command = 'sudo';
    const options = ['-S','service','ssh','start']
    executeCommand(command, options, () => {})
}
