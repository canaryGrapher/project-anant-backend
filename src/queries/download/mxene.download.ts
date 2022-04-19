import JSZip from 'jszip';
import { PrismaClient } from '@prisma/client'
import fs from 'fs';
const prisma = new PrismaClient();

const downloadMxeneDetails = async (queryParameters: string) => {
    const query = queryParameters.split(',').map(value => {
        let idObject = { id: Number(value) };
        return (
            idObject
        )
    })
    const downloadResults = await prisma.mxn_search_mxene.findMany({
        where: {
            OR: query
        },
        select: {
            M1: true,
            M2: true,
            X: true,
            T1: true,
            T2: true,
            name: true,
            Lc: true,
            Bg: true,
            Mm: true,
            poscar_file: true,
            bands_image: true,
            id: true,
        }
    });

    const zip = await createDownloadZip(downloadResults);
    return zip;
}

const createDownloadZip = async (downloadInformation: any) => {
    const zip = new JSZip();
    for (let searchResult = 0; searchResult < downloadInformation.length; searchResult++) {
        const filePOSCAR = await fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${downloadInformation[searchResult].poscar_file}`);
        const fileImage = await fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${downloadInformation[searchResult].bands_image}`);
        const zipFile = zip.folder(`${downloadInformation[searchResult].name}`);
        zipFile.file(`${downloadInformation[searchResult].poscar_file}`, filePOSCAR);
        zipFile.file(`${downloadInformation[searchResult].bands_image}`, fileImage);
    }
    const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
    return zipFile;
}


export default downloadMxeneDetails;


// download format:
// - name, Bg, Lc, Mm in csv format
// - bands_image and poscar file as it is
// - folder name mxene_name
// - multiple folders if it is required
// - ZIP all the folders