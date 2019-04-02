class traducir{
    constructor()
    {

    }
    imprimir(cadena)
    {
        console.log("       "+cadena);
    }
    imprimir_L(cadena)
    {
        console.log("   "+cadena);
    }
    comentarioSimple(cadena)
    {
        console.log("//"+cadena);
    }
    comentario(cadena)
    {
        console.log("/********"+cadena+"********/");
    }  
}

module.exports = traducir;