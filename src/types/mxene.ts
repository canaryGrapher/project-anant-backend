enum M {
    "Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W", ""
}

enum X {
    "C", "N", ""
}

enum T {
    "H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN", ""
}

interface searchById {
    id: string;
}

interface searchObjects {
    M1?: M & string;
    M2?: M & string;
    X?: X & string;
    T1?: T & string;
    T2?: T & string;
}

interface requestBodyForAddingMxene {
    M1: M & string;
    M2: M & string;
    X: X & string;
    T1: T & string;
    T2: T & string;
    bandGap: string;
    latticeConstant: string;
    magneticMoment: string;
}

interface requestBodyForEditingMxene extends requestBodyForAddingMxene {
    id: string;
}

interface requestBodyForDeletingMxene {
    id: string;
}

export { M, X, T, searchObjects, requestBodyForAddingMxene, requestBodyForEditingMxene, requestBodyForDeletingMxene, searchById };