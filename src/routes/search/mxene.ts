import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { fetchMxeneDetails, singleSearch } from "@queries/index"
import mxenePaths from '@queries/search/paths.mxene';

const mxeneSearchRouter = Router();

const valuesM: string[] = ["Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W", ""]
const valuesX: string[] = ["C", "N", ""]
const valuesT: string[] = ["H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN", ""]

mxeneSearchRouter.post('/',
    body('M1').isString().isIn(valuesM).withMessage('Valid M1 value is required'),
    body('M2').isString().isIn(valuesM).withMessage('Valid M2 value is required'),
    body('X').isString().isIn(valuesX).withMessage('Valid X value is required'),
    body('T1').isString().isIn(valuesT).withMessage('Valid T1 value is required'),
    body('T2').isString().isIn(valuesT).withMessage('Valid T2 value is required')
    , async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const searchResults = await fetchMxeneDetails(req.body);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(searchResults);
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })

mxeneSearchRouter.get('/searchbyid/:id',
    param('id').isString().withMessage('Valid id is required'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const searchResults = await singleSearch({ id: req.params.id });
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(searchResults);
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })

mxeneSearchRouter.get('/getmxenepaths',
    async (req: Request, res: Response) => {
    try {
        const searchResults = await mxenePaths();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(searchResults);
    } catch (error) {
        // microservice for logging. Use winston or other logging library
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        res.status(400).json(error);
    }
})


// export the router
export default mxeneSearchRouter;
