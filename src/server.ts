import express, { Application, Request, Response } from "express";
import helmet from "helmet";

const server: Application = express();
// const router: Router = express.Router();
const port = process.env.PORT || 3002;

//importing routes
import mxeneSearchRouter from "@routes/search/mxene";

server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet({ contentSecurityPolicy: false }));

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("The application is healthy");
})

server.use("/searchmxene", mxeneSearchRouter)

server.get("/test", (req: Request, res: Response) => {
    res.send("Message")
})

server.get('*', (req: Request, res: Response) => {
    console.log("Not found")
    res.status(404).send("Not found")
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
