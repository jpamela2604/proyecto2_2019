const Hashtable=require("../hashtable.js");
const stack=require("../pila");
class clase{
    constructor(nombre,padre,visibiidad,tipo)
    {   
        this.nombre=nombre;
        this.padre=padre;
        this.hijos=new Array();
        this.globales=new Hashtable();
        this.super=new stack();
        this.IsStatic=false;
        this.visibiidad=visibiidad;//public,private,protected
        this.IsFinal=false;
        this.IsAbstract=false;
        this.tipo=tipo;//super,miembro,local
        this.tipos=new Hashtable();
        this.TieneConstructor=false;
        this.tam=0;
    }

    getPila()
    {
        
        var r=new stack();
        //agregar los super
        for(var x=0;x<this.super.size();x++)
        {
            r.push(this.super.get(x));
        }
        //agregar los globales
        r.push(this.globales);
        return r;
    }
}

module.exports = clase;