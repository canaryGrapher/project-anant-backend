
# import required module
import os
import sys
import ase.io
import ase.build


def formatFile(poscar_file_url, pdb_file_directory):
    poscar_file = open(poscar_file_url)
    poscar_content = poscar_file.read()
    poscar_content = str(poscar_content)[
        2:-3].replace('\\n', '\n').replace('\\t', '\t')
    structure = ase.io.read(poscar_file_url)
    supercell = ase.build.make_supercell(
        structure, [[4, 0, 0], [0, 4, 0], [0, 0, 1]])
    xyzFile = poscar_file_url.split("/")[-1] + ".xyz"
    filename = pdb_file_directory + "/" + \
        poscar_file_url.split("/")[-1] + ".pdb"
    ase.io.write(xyzFile, supercell, 'xyz')
    command = "obabel " + xyzFile + " -O " + filename
    os.system(command)
    os.remove(xyzFile)
    pdb_file = open(filename)
    pdb_content = pdb_file.read()
    pdb_file.close()
    # os.remove(filename)
    return pdb_content


def main(poscar_file, pdb_file_directory):
    f1 = os.path.join(poscar_file)
    f2 = os.path.join(pdb_file_directory)
    print(formatFile(f1, f2))
    sys.stdout.flush()
    return 0


main(sys.argv[1], sys.argv[2])
