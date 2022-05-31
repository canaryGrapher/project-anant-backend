import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';

const server: Application = express();
const port = process.env.PORT || 3002;

//importing routes
import mxeneSearchRouter from "@routes/search/mxene";
import mxeneDownloadRouter from "@routes/download/mxene";
import mutateMxeneRouter from "@routes/mutate/mxene";

import publicationsRouter from "@routes/extras/publications";
import updatesRouter from "@routes/extras/updates";
import faqRouter from "@routes/extras/faqs";

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
server.use(cors(options));
server.use(mongoSanitize());
server.use(express.json({ limit: "10kb", strict: true, type: "application/json" }));
server.use(helmet({ contentSecurityPolicy: false }));

const pdb_file_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/pdb";
const band_images_locations = process.env.MXENE_DOWNLOAD_RESOLVER + "/band_plots";
server.use('/static/pdb', express.static(pdb_file_locations));
server.use('/static/image', express.static(band_images_locations));

server.get("/", (req: Request, res: Response) => {
    res.status(200).send("The application is healthy");
})
server.get("/test", (req: Request, res: Response) => {
    res.send("Message")
})


server.use("/searchmxene", mxeneSearchRouter)
server.use("/downloadmxene", mxeneDownloadRouter)
server.use("/mutatemxene", mutateMxeneRouter)

server.use("/publications", publicationsRouter)
server.use("/updates", updatesRouter)
server.use("/faqs", faqRouter)

server.get('*', (req: Request, res: Response) => {
    console.log("Something seems to be the issue")
    res.status(404).send("Not found as of now")
})

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})
