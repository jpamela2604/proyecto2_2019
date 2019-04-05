
class simbolo{
    constructor(tipo,aux,id,rol,posicion,ambito,size,dimensiones,visibilidad)
    {        
        this.tipo=tipo;
        this.aux=aux;
        this.id=id;
        this.rol=rol;
        this.posicion=posicion;
        this.ambito=ambito;
        this.size=size;
        this.dimensiones=dimensiones;        
        this.visibilidad=visibilidad;
    }

    getNombre()
    {
        return this.id;
    }
    getRol()
    {

    }
    
}

module.exports = simbolo;