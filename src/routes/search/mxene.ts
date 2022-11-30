import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { fetchMxeneDetails, singleSearch, mxenePaths } from "@helpers/mxene/queries";
import { generate_pdb_file } from "@helpers/functions"
import fs from 'fs';

const mxeneSearchRouter = Router();

// @route   POST /searchmxene
// @desc    Route to find all mxene in the database that match the search query
// @access  Public
mxeneSearchRouter.post('/',
    body('M1').isString().withMessage('Valid M1 value is required'),
    body('M2').isString().withMessage('Valid M2 value is required'),
    body('X').isString().withMessage('Valid X value is required'),
    body('T1').isString().withMessage('Valid T1 value is required'),
    body('T2').isString().withMessage('Valid T2 value is required'),
    body('bandGap').isNumeric().optional().withMessage('Band gap value is required'),
    body('currentPage').isNumeric().withMessage('Current Page value is required')
    , async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).json({ errors: errors.array() });
            }
            const searchParameters = req.body;
            if (searchParameters.bandGap) {
                searchParameters.bandGap = (parseFloat(searchParameters.bandGap).toFixed(4)).toString()
                const searchResults = await fetchMxeneDetails(searchParameters);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(searchResults);
            } else {
                const searchResults = await fetchMxeneDetails(searchParameters);
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(searchResults);
            }

        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })

// @route   GET /searchmxene/searchbyid/:id
// @desc    Route find a single mxene in the database
// @access  Public
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
            const poscar_data = fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${searchResults[0].poscar_file}`, 'utf8');
            const pdb_file_content = await generate_pdb_file(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${searchResults[0].poscar_file}`, process.env.PDB_FILE_RESOLVER);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                mxene: searchResults[0].mxene,
                bandGap: searchResults[0].bandGap,
                bandImage: "/static/image/" + searchResults[0].bands_png.split('/')[1],
                latticeConstant: searchResults[0].latticeConstant,
                magneticMoment: searchResults[0].magneticMoment,
                poscar_data: poscar_data,
                // pdb_file: '/static/pdb/' + searchResults[0].poscar_file.split('/')[1] + ".pdb",
                pdb_file_content: pdb_file_content
            });
        } catch (error) {
            // microservice for logging. Use winston or other logging library
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            res.status(400).json(error);
        }
    })


// @route   POST /searchmxene/getmxenepaths
// @desc    Route to find all mxene names in the database for static site generation purposes
// @access  Public
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

export default mxeneSearchRouter;
