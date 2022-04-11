import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
const mxeneSearchRouter = Router();

const valuesM: string[] = ["Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W"]
const valuesX: string[] = ["C", "N"]
const valuesT: string[] = ["H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN"]

mxeneSearchRouter.post('/',
    body('M1').notEmpty().isIn(valuesM).withMessage('Valid M1 value is required'),
    body('M2').notEmpty().isIn(valuesM).withMessage('Valid M2 value is required'),
    body('X').notEmpty().isIn(valuesX).withMessage('Valid X value is required'),
    body('T1').notEmpty().isIn(valuesT).withMessage('Valid T1 value is required'),
    body('T2').notEmpty().isIn(valuesT).withMessage('Valid T2 value is required')
    , async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json({ errors: errors.array() });
        }
        try {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(req.body);
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })



// export the router    
export default mxeneSearchRouter;