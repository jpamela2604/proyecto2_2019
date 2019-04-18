
var nodoArbol =require("../nodoArbol.js");
class s_metodoOver{
    constructor(modificadores,tipo,id,parametros,noDimensiones,sentencias,
        linea,columna,archivo,hash) 
    {
        this.isAbstract=isAbstract;
        this.id=id;
        this.sentencias=sentencias;
        this.parametros=parametros;
        this.modificadores=modificadores;
        this.tipo=tipo;
        this.noDimensiones=noDimensiones;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
        this.iden=null;
        this.sim=null;
    }
    comprobacion_global(ts,er)
    {
        var visibilidad=0;
        var modificador=0;
        this.iden =new identificador(this.id,this.parametros);
         //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador)
         var simb=new simbolo(this.tipo,null,this.iden,tablaTipos.rol_metodo,-1,
            ts.getAmbito(true),this.noDimensiones,visibilidad,modificador
            );
        ts.AgregarSimbolo(simb,true,this.linea,this.columna,this.archivo);
        this.sim=simb;
    }
    traduccion_global(ts,traductor)
    {
        
    }
    getTree()
    {
        var raiz =new nodoArbol("FUNCION",this.hash);
        var type=this.tipo.nombre;
        for(var i=0;i<this.noDimensiones;i++)
        {
            type=type+"[]";
        }
        vari.hash++; 
        var tipo= new nodoArbol(type,vari.hash);
        raiz.agregarHijo(tipo);
        vari.hash++; 
        var name =new nodoArbol(this.id,vari.hash);
        raiz.agregarHijo(name);
        vari.hash++; 
        var mypar=new nodoArbol("PARAMETROS",vari.hash);
        for(var w=0;w<this.parametros.length;w++)
        {
            vari.hash++;
            var p=new nodoArbol("PARAMETRO",vari.hash);
            vari.hash++
            var myt=new nodoArbol(this.parametros[w].tipo.nombre,vari.hash);
            vari.hash++
            var myn=new nodoArbol(this.parametros[w].nombre,vari.hash);
            p.agregarHijo(myt);
            p.agregarHijo(myn);
            mypar.agregarHijo(p);
        }
        raiz.agregarHijo(mypar);
        vari.hash++;
        var sent =new nodoArbol("LSENT",vari.hash);
        for(var i=0;i<this.sentencias.length;i++)
        {
            var apo=this.sentencias[i].getTree();
            //console.log(apo);
            sent.agregarHijo(apo);
        }
        raiz.agregarHijo(sent);
        return raiz;
    }
    comprobacion(ts,er)
    {
        
        //guardar una pseudo etiqueta de salida
        var minodo=new nodoDisplay("c",this.tipo);
        //guardar en el display para encontrar el return etiqueta,tipo        
        ts.displayRetornos.push(minodo);
        //cambiar de ambito
        ts.cambiarAmbito(true);
        var visibilidad=0;
        var modificador=0;
        //declarar el return
        var identif=new identificador("return",null);
        var posicion=ts.getPosicion(false);
        var simb=new simbolo(this.tipo,null,identif,tablaTipos.rol_variable,posicion,
        ts.getAmbito(false),this.noDimensiones,visibilidad,modificador
                                );
        ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
        ts.AumentarPos(false);
        //declarar los parametros        
        for(var y=0;y<this.parametros.length;y++)
        {
            var mide=this.parametros[y];
            var posicion=ts.getPosicion(false);
            var iden=new identificador(mide.nombre,null);
            //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador
            var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),mide.noDimensiones,visibilidad,modificador
                                );
            ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
            ts.AumentarPos(false);
        }

        
        //ejecutar sentencias
        for(var j=0;j<this.sentencias.length;j++)
        {
            this.sentencias[j].comprobacion(ts,er);
        }
        //regresar de ambito
        ts.regresarAmbito(true);
        //sacar la etiqueta de salida        
        //comprobar que si necesitaba un retorno si venga
        if(!(ts.displayRetornos.pop().vino)&&this.tipo.indice!=tablaTipos.vacio)
        {
            er.addError("Falta return",this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }

    }
    traducir(ts,traductor)
    {
       
        if(!this.isAbstract)
        {
            traductor.imprimirHead("void "+this.sim.getNombre()+"(){");            
            //cambiar ambito
            ts.cambiarAmbito(true);
            //declarar el retorno
            var visibilidad=0;
            var modificador=0;
            var iden=new identificador("return",null);
            var posicion=ts.getPosicion(this.IsGlobal);
            var simb=new simbolo(this.tipo,null,iden,tablaTipos.rol_variable,posicion,
            ts.getAmbito(false),this.noDimensiones,visibilidad,modificador
                                );
            ts.AgregarSimbolo(simb,false,this.linea,this.columna,this.archivo);
            ts.AumentarPos(false);
            //declarar los parametros
            for(var y=0;y<this.parametros.length;y++)
            {
                var mide=this.parametros[y];
                var posicion=ts.getPosicion(false);
                var iden=new identificador(mide.nombre,null);
                //tipo,aux,id,rol,posicion,ambito,dimensiones,visibilidad,modificador
                var simb=new simbolo(mide.tipo,null,iden,tablaTipos.rol_variable,posicion,
                ts.getAmbito(false),mide.noDimensiones,visibilidad,modificador
                                    );
                ts.AgregarSimbolo(simb,false,mide.linea,mide.columna,mide.archivo);
                ts.AumentarPos(false);
            }
            //generar la etiqueta de salida
            var salida=valores.getEtiqueta();
            //guardarla en el display
            var minodo2=new nodoDisplay(salida);
            ts.displayRetornos.push(minodo2);
            //console.log(this.sentencias);
            for(var x=0;x<this.sentencias.length;x++)
            {
                this.sentencias[x].traducir(ts,traductor);
            }
            //regresar ambito
            ts.regresarAmbito(true);
            //escribir la etiqueta de salida
            traductor.imprimir_L(ts.displayRetornos.pop().etiqueta+":");
            traductor.imprimirHead("}");
        }
    }
}

module.exports = s_metodoOver;