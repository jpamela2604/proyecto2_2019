const Hashtable=require("../hashtable.js");
class clase{
    constructor(nombre,padre,visibiidad,tipo)
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
        this.tipos=new Hashtable();
        this.TieneConstructor=false;
        this.tam=0;
    }
}

module.exports = clase;