import { Router, Request, Response } from 'express';
import { searchObjects, requestBodyForAddingMxene, requestBodyForEditingMxene, requestBodyForDeletingMxene } from '@typeDeclarations/mxene';
import { body, param, validationResult } from 'express-validator';
import { fetchMxeneDetails } from "@helpers/mxene/queries"
import { addMxeneDetails, updateMxeneDetails, deleteMxeneDetails } from "helpers/mxene/mutations/index"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const mutateMxeneRouter = Router();

mutateMxeneRouter.post('/add',
    body('M1').isString().isLength({ min: 1, max: 4 }).withMessage("M1 format is invalid"),
    body('M2').isString().isLength({ min: 1, max: 4 }).withMessage("M2 format is invalid"),
    body('X').isString().isLength({ min: 1, max: 4 }).withMessage("X format is invalid"),
    body('T1').isString().isLength({ min: 1, max: 4 }).withMessage("T1 format is invalid"),
    body('T1').isString().isLength({ min: 1, max: 4 }).withMessage("T1 format is invalid"),
    body('bandGap').isNumeric().withMessage('Band gap value is required'),
    body('latticeConstant').isNumeric().withMessage('Lattice constant is required'),
    body('magneticMoment').isNumeric().withMessage('Magnetic moment is required'),
    verifySession(),
    async (req: Request<{}, {}, requestBodyForAddingMxene>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const searchParameters: searchObjects = { M1: req.body.M1, M2: req.body.M2, X: req.body.X, T1: req.body.T1, T2: req.body.T2 }
            const searchResults = await fetchMxeneDetails(searchParameters);
            if (searchResults.length > 0) {
                res.status(400).json({ errors: [{ msg: 'Mxene already exists' }] });
            } else {
                const addNewMxene = await addMxeneDetails(req.body);
                console.log(addNewMxene)
                res.status(200).json({ msg: "Uploaded to database" })
            }

        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error)
            res.status(400).json(error);
        }
    })

mutateMxeneRouter.put('/edit',
    body('id').isString().isLength({ min: 24, max: 24 }).withMessage("id format is invalid"),
    body('M1').isString().isLength({ min: 1, max: 4 }).withMessage("M1 format is invalid"),
    body('M2').isString().isLength({ min: 1, max: 4 }).withMessage("M2 format is invalid"),
    body('X').isString().isLength({ min: 1, max: 4 }).withMessage("X format is invalid"),
    body('T1').isString().isLength({ min: 1, max: 4 }).withMessage("T1 format is invalid"),
    body('T1').isString().isLength({ min: 1, max: 4 }).withMessage("T1 format is invalid"),
    body('bandGap').isNumeric().withMessage('Band gap value is required'),
    body('latticeConstant').isNumeric().withMessage('Lattice constant is required'),
    body('magneticMoment').isNumeric().withMessage('Magnetic moment is required'),
    verifySession(),
    async (req: Request<{}, {}, requestBodyForEditingMxene>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const editedMxene = await updateMxeneDetails(req.body);
            console.log(editedMxene)
            res.status(200).json({ msg: "Updated in database" })
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error)
            res.status(400).json(error);
        }
    })

mutateMxeneRouter.delete('/delete/:id', param('id').isString().withMessage("id format is invalid"),
    verifySession(),
    async (req: Request<requestBodyForDeletingMxene, {}, {}>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
        }
        try {
            const editedMxene = await deleteMxeneDetails(req.params);
            console.log(editedMxene)
            res.status(200).json({ msg: "Deleted from database" })
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default mutateMxeneRouter;
