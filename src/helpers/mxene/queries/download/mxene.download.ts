import JSZip from 'jszip';
import { PrismaClient } from '@prisma/client'
import fs from 'fs';
import { stringify } from 'csv-stringify/sync';

const prisma = new PrismaClient();

const downloadMxeneDetails = async (queryParameters: string) => {
    const query = queryParameters.split(',').map(value => {
        let idObject = { id: value };
        return (
            idObject
        )
    })
    const downloadResults = await prisma.mxene.findMany({
        where: {
            OR: query
        },
        select: {
            mxene: true,
            latticeConstant: true,
            bandGap: true,
            isMetallic: true,
            magneticMoment: true,
            poscar_file: true,
            bands_png: true,
            bands_dat: true
        }
    });

    const zip = await createDownloadZip(downloadResults);
    return zip;
}

const createDownloadZip = async (downloadInformation: any) => {
    const zip = new JSZip();
    const infoFile = fs.readFileSync(process.env.MXENE_DOWNLOAD_RESOLVER + "/POTCAR.info")
    zip.file('POTCAR.info', infoFile);
    for (let searchResult = 0; searchResult < downloadInformation.length; searchResult++) {
        // reading file streams
        const filePOSCAR = fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${downloadInformation[searchResult].poscar_file}`);
        const fileImage = fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${downloadInformation[searchResult].bands_png}`);
        const datFile = fs.readFileSync(`${process.env.MXENE_DOWNLOAD_RESOLVER}/${downloadInformation[searchResult].bands_dat}`);

        // creating a ZIP folder
        const zipFile = zip.folder(`${downloadInformation[searchResult].mxene}`);

        //adding files to the ZIP folder
        zipFile.file(`${downloadInformation[searchResult].poscar_file}`, filePOSCAR);
        zipFile.file(`${downloadInformation[searchResult].bands_png}`, fileImage);
        zipFile.file(`${downloadInformation[searchResult].bands_dat}`, datFile);

        //creating the required CSV file
        const data = [
            {
                name: downloadInformation[searchResult].mxene,
                band_gap: downloadInformation[searchResult].bandGap,
                lattice_constant: downloadInformation[searchResult].latticeConstant,
                magnetic_moment: downloadInformation[searchResult].magneticMoment,
                isMetal: downloadInformation[searchResult].isMetallic ? "true" : "false"
            }
        ]
        const csv = stringify(data, { header: true });
        zipFile.file(`${downloadInformation[searchResult].mxene}.csv`, csv);
    }
    const zipFile = await zip.generateAsync({ type: 'nodebuffer' });
    return zipFile;
}


export default downloadMxeneDetails;


// download format:
// - name, band_gap, lattice_constant, magnetic_moment, isMetal in csv format
// - bands_image, band_dat and poscar file as it is
// - folder name mxene_name
// - multiple folders if it is required
// - ZIP all the folders
// - POTCAR.info in the root folder