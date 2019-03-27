class nodoArbol{
    constructor(nombre,hash)
    {
        this.nombre=nombre;
        this.hash=hash;
        this.hijos=new Array();
    }
    agregarHijo(hijo)
    {
        this.hijos.push(hijo);
    }
    
}

module.exports = nodoArbol;