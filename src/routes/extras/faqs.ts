import { Router, Request, Response } from 'express';
import { fetchAllFAQs } from "@helpers/extras"

// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

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


// @ implement only for admins
faqRouter.post('/add-faq',
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// @ implement only for admins
faqRouter.delete('/delete-faq',
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })

// export the router
export default faqRouter;
