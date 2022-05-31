import { Router, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import { fetchMxeneDetails, singleSearch, mxenePaths } from "@helpers/mxene/queries";
import { spawnSync } from "child_process";
import fs from 'fs';
// import path from 'path';

const mxeneSearchRouter = Router();

const valuesM: string[] = ["Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W", ""]
const valuesX: string[] = ["C", "N", ""]
const valuesT: string[] = ["H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN", ""]

mxeneSearchRouter.post('/',
    body('M1').isString().isIn(valuesM).withMessage('Valid M1 value is required'),
    body('M2').isString().isIn(valuesM).withMessage('Valid M2 value is required'),
    body('X').isString().isIn(valuesX).withMessage('Valid X value is required'),
    body('T1').isString().isIn(valuesT).withMessage('Valid T1 value is required'),
    body('T2').isString().isIn(valuesT).withMessage('Valid T2 value is required'),
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
            await fetch_pdb_file_data(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${searchResults[0].poscar_file}`, process.env.PDB_FILE_RESOLVER);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                mxene: searchResults[0].mxene,
                bandGap: searchResults[0].bandGap,
                bandImage: "/static/image/" + searchResults[0].bands_png.split('/')[1],
                latticeConstant: searchResults[0].latticeConstant,
                magneticMoment: searchResults[0].magneticMoment,
                poscar_data: poscar_data,
                pdb_file: '/static/pdb/' + searchResults[0].poscar_file.split('/')[1] + ".pdb",
            });
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


const fetch_pdb_file_data = async (fileLocation: string, pdb_resolver: string) => {
    const path = process.env.PDB_FILE_RESOLVER + "/" + fileLocation.split('/')[3] + ".pdb";
    if (fs.existsSync(path)) {
        console.log("Path already exists")
        return 0
    } else {
        const data = spawnSync('python', ['./src/helpers/convert.py', fileLocation, pdb_resolver]);
        return data.stdout.toString();
    }
}

// export the router
export default mxeneSearchRouter;
