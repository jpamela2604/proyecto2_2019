class identificador{
    constructor(nombre,parametros)
    {
        this.nombre=nombre;
        this.parametros=parametros;
    }
    getNombre()
    {
        return this.nombre;
    }
}

module.exports = identificador;