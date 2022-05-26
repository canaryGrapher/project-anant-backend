
# import required module
import os
import sys
import ase.io
import ase.build
# assign directory
directory = '..\\..\\anant\\poscars'


def formatFile(file):
    poscar_file = open(file)
    poscar_content = poscar_file.read()
    poscar_content = str(poscar_content)[
        2:-3].replace('\\n', '\n').replace('\\t', '\t')

    structure = ase.io.read(file)
    supercell = ase.build.make_supercell(
        structure, [[4, 0, 0], [0, 4, 0], [0, 0, 1]])
    xyzFile = file.split("/")[-1] + ".xyz"
    filename = file.split("/")[-1] + ".pdb"
    ase.io.write(xyzFile, supercell, 'xyz')
    command = "obabel " + xyzFile + " -O " + filename
    os.system(command)
    os.remove(xyzFile)
    pdb_file = open(filename)
    pdb_content = pdb_file.read()
    pdb_file.close()
    os.remove(filename)
    return pdb_content


def run_loop():
    for filename in os.listdir(directory):
        i = 1
        f = os.path.join(directory, filename)
        # checking if it is a file
        if os.path.isfile(f) and i < 2:
            formatFile(f)
            i += 1


def main(file):
    f = os.path.join(file)
    print(formatFile(f))
    sys.stdout.flush()


main(sys.argv[1])
