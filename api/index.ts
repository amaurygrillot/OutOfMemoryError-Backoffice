import { Express } from "express";
import { pythonRouter } from "../python-executer/python-executer.route";
//import { nodeRouter} from "../node-executer/node-executer.route";
import {javaRouter} from "../java-executer/java-executer.route";
import {cRouter} from "../c-executer/c-executer.route";
import {spawn} from "child_process";

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
    //RUN chmod -R 755 /app
    const {spawn} = require('child_process');
    const startSSH = spawn('echo', [`${process.env.SU_PASSWORD}`,'|','sudo','-S','service','ssh','start']);

    startSSH.stdout.on('data', function (data) {
        console.log('Pipe data from ssh script ...');
        console.log(data.toString());
    });
    startSSH.stderr.on('data', function (err) {
        console.log(err.toString());});
    startSSH.on('error', function (err) {
        console.log(err.toString());});
// in close event we are sure that stream from child process is closed
    startSSH.on('close', (code) => {
        console.log("SSH ended with code : " + code.toString());

    });
}
