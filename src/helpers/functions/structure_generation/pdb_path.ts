import fs from 'fs'
import { spawnSync } from "child_process";

// description: function will generate a pdb file from a poscar file.
//              It is not generated if the file already exists
const generate_pdb_file = async (fileLocation: string, pdb_resolver: string) => {
    const path = process.env.PDB_FILE_RESOLVER + "/" + fileLocation.split('/')[3] + ".pdb";
    if (fs.existsSync(path)) {
        // pdb file was already generated
        return 0
    } else {
        const data = spawnSync('python', ['./src/helpers/convert.py', fileLocation, pdb_resolver]);
        return data.stdout.toString();
    }
}


export default generate_pdb_file