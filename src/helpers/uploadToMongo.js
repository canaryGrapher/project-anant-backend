const fs = require('fs')

const MongoDB = require('mongodb').MongoClient;
require('dotenv').config()
const mongodb_uri = process.env.MONGODB_URI;

const anantData = require("./information.json")

const CreateCollections = async () => {
    MongoDB.connect(mongodb_uri, function (err, db) {
        if (err) throw err;
        var dbo = db.db("anant");
        dbo.createCollection("mxene", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
        });
    });
}

const InsertData = async (data) => {
    MongoDB.connect(mongodb_uri, async (err, db) => {
        if (err) throw err;
        const databaseObject = db.db("anant");
        for (let i = 0; i < data.length; i++) {
            // getting file locations
            const poscar_file = `poscars/relax_POSCAR_${data[i].mxene}`;
            const bands_dat = `band_dat/bands_${data[i].mxene}.dat`;
            const bands_png = `band_plots/bands_${data[i].mxene}.png`;
            const elementsInMxene = data[i].mxene.split("-");
            const dataMod = {
                "id": i,
                "mxene": data[i].mxene,
                "M1": elementsInMxene[0],
                "M2": elementsInMxene[1],
                "X": elementsInMxene[2],
                "T1": elementsInMxene[3],
                "T2": elementsInMxene[4],
                "bandGap": parseFloat(data[i].bandGap).toFixed(4),
                "latticeConstant": parseFloat(data[i].latticeParameter).toFixed(4),
                "magneticMoment": parseFloat(data[i].magneticMoment).toFixed(4),
                "isMetallic": data[i].isMetallic,
                "poscar_file": poscar_file,
                "bands_dat": bands_dat,
                "bands_png": bands_png
            }


            databaseObject.collection("mxene").insertOne(dataMod, function (err, res) {
                if (err) throw err;
                console.log(`${data[i].mxene} inserted`);
            })
            // uncomment the next three lines when doing a partial upload
            // if (i == 50) {
            //     break;
            // }
            // till here
        }
    })
}

const main = async () => {
    await CreateCollections();
    InsertData(anantData)
}

main()