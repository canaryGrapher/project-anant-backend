import { Router, Request, Response } from 'express';
// import { searchObjects, requestBodyForAddingMxene, requestBodyForEditingMxene, requestBodyForDeletingMxene } from '@typeDeclarations/mxene';
// import { body, param, validationResult } from 'express-validator';
// import { fetchMxeneDetails } from "@queries/index"
// import { addMxeneDetails, updateMxeneDetails, deleteMxeneDetails } from "@mutations/index"
import { fetchAllFAQs } from "@helpers/extras"

// authentication middlewares
import checkJwt from '@middleware/auth'
import checkScopes from '@middleware/admin'

const faqRouter = Router();

faqRouter.get('/',
    async (req: Request, res: Response) => {
        try {
            const faqResults = await fetchAllFAQs();
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(faqResults);
        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

faqRouter.post('/add-faq',
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

faqRouter.delete('/delete-faq',
    checkJwt, checkScopes,
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default faqRouter;
