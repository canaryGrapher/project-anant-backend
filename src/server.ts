import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';

const server: Application = express();
const port = process.env.PORT || 3002;

//importing routes
import mxeneSearchRouter from "@routes/search/mxene";
import mxeneDownloadRouter from "@routes/download/mxene";
import mutateMxeneRouter from "@routes/mutate/mxene";

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
server.use(cors(options));
server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet({ contentSecurityPolicy: false }));

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("The application is healthy");
})

server.use("/searchmxene", mxeneSearchRouter)
server.use("/downloadmxene", mxeneDownloadRouter)
server.use("/mutatemxene", mutateMxeneRouter)

server.get("/test", (req: Request, res: Response) => {
    res.send("Message")
})

server.get('*', (req: Request, res: Response) => {
    console.log("Something seems to be the issue")
    res.status(404).send("Not found as of now")
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
