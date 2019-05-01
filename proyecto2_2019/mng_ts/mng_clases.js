class mng_clases{
    constructor(nombre,hash)
    {   
        this.nombre=nombre;
        this.padre=padre;
        this.hijos=new Array();
        this.globales=new Hashtable();
        this.IsStatic=false;
        this.visibiidad=visibiidad;//public,private,protected
        this.IsFinal=false;
        this.IsAbstract=false;
        this.tipo=tipo;//super,miembro,local
    }
}

module.exports = mng_clases;