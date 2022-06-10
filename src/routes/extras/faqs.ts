import { Router, Request, Response } from 'express';
import { fetchAllFAQs } from "@helpers/extras"
import { param } from 'express-validator';
// authentication middlewares
import { verifySession } from "supertokens-node/recipe/session/framework/express";

const faqRouter = Router();

// @route   GET /faqs
// @desc    Route to get all FAQs on the database
// @access  Public
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


// @route   POST /faqs/add-faq
// @desc    Route to add a new FAQ
// @access  Protected
faqRouter.post('/add-faq',
    verifySession(),
    async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.log(error)
            res.status(400).json(error);
        }
    })


// INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE INCOMPLETE
// @route   DELETE /faqs/:id
// @desc    Route to delete a FAQ
// @access  Protected
faqRouter.delete('/delete-faq/:id',
    param('id').isEmpty().withMessage('ID value is required'),
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
