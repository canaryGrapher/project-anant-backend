import { Router, Request, Response } from 'express';
import { param, validationResult } from 'express-validator';
import { downloadMxeneDetails } from "@helpers/mxene/queries"
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const mxeneDownloadRouter = Router();

// @route   GET /downloadmxene/:id
// @desc    route to download mxene zip files
// @access  Protected
mxeneDownloadRouter.get('/',
    param('id').isEmpty().withMessage('ID value is required'),
    verifySession(),
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



export default mxeneDownloadRouter;
