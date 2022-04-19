import { Router, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { downloadMxeneDetails } from "@queries/index"

const mxeneDownloadRouter = Router();

mxeneDownloadRouter.get('/',
    param('id').isEmpty().withMessage('ID value is required'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const { id } = req.query;
            const downloadResults = await downloadMxeneDetails(id.toString());
            res.writeHead(200, {
                'Content-Disposition': `attachment; filename="mxene.zip"`,
                'Content-Type': "application/zip",
            })
            res.end(downloadResults);
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })



// export the router    
export default mxeneDownloadRouter;