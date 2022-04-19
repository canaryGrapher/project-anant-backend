enum M {
    "Sc", "Ti", "V", "Cr", "Y", "Zr", "Nb", "Mo", "Hf", "Ta", "W", ""
}

enum X {
    "C", "N", ""
}

enum T {
    "H", "O", "F", "Cl", "Br", "OH", "NP", "CN", "RO", "OBr", "OCl", "SCN", "NCS", "OCN", ""
}

interface searchObjects {
    M1?: M & string;
    M2?: M & string;
    X?: X & string;
    T1?: T & string;
    T2?: T & string;
}

export { M, X, T, searchObjects };