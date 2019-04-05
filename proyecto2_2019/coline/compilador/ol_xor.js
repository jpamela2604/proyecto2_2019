const valores = require("../values_manager.js");
var nodoArbol =require("../nodoArbol.js");
const tablaTipos= require("../tablaTipos.js");
var simbolo = require("../../mng_ts/simbolo.js");
const etiqueta= require("../etiqueta.js");
class ol_or{
    constructor(op1,op2,linea,columna,archivo,hash) 
    {
        this.op1=op1;
        this.op2=op2;
        this.linea=linea; 
        this.columna=columna;
        this.archivo=archivo;
        this.hash=hash;
    }
    getTree()
    {
        var raiz =new nodoArbol("XOR",this.hash);
        raiz.agregarHijo(this.op1.getTree());
        raiz.agregarHijo(this.op2.getTree());
        return raiz;
    }
    comprobacion(ts,er)
    {
        var respuesta=new simbolo(tablaTipos.tipo_error);   
        var o1=this.op1.comprobacion(ts,er);
        var o2=this.op2.comprobacion(ts,er);
        if(o1.tipo.indice==tablaTipos.booleano&&o2.tipo.indice==tablaTipos.booleano)
        {
            respuesta = new simbolo(tablaTipos.tipo_booleano);
        }else 
        {
            er.addError("Tipos incompatibles: "+o1.tipo.nombre+" XOR "+o2.tipo.nombre,this.linea,this.columna,this.archivo,
            "SEMANTICO");
        }
        return respuesta;
    }
    traducir(ts,traductor)
    {
        var tx=valores.getTemporal();
        traductor.imprimir(tx+"=-1;");
        var o1=this.op1.traducir(ts,traductor);
        if(!(o1.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+o1.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            o1= new simbolo(tablaTipos.tipo_booleano,temporal);
        }
        for(var i=0;i<o1.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(o1.aux.verdadero[i]+":");
        }
        traductor.imprimir(tx+"=1;");
        for(var i=0;i<o1.aux.falso.length;i++)
        {
            traductor.imprimir_L(o1.aux.falso[i]+":");
        }
        
        var o2=this.op2.traducir(ts,traductor);
        if(!(o2.aux instanceof etiqueta))
        {
            var temporal=new etiqueta();
            temporal.verdadero.push(valores.getEtiqueta());
            temporal.falso.push(valores.getEtiqueta());
            traductor.imprimir("if ("+o2.aux+"==1)  goto "+temporal.verdadero[0]+";");
            traductor.imprimir("goto "+temporal.falso[0]+";");
            o2= new simbolo(tablaTipos.tipo_booleano,temporal);
        }

        for(var i=0;i<o2.aux.verdadero.length;i++)
        {
            traductor.imprimir_L(o2.aux.verdadero[i]+":");
        }
        traductor.imprimir(tx+"="+tx+"+2;");
        for(var i=0;i<o2.aux.falso.length;i++)
        {
            traductor.imprimir_L(o2.aux.falso[i]+":");
        }
        traductor.imprimir(tx+"="+tx+"-1;");
        var miaux=new etiqueta();
        miaux.verdadero.push(valores.getEtiqueta());
        miaux.falso.push(valores.getEtiqueta());
        traductor.imprimir("if ("+tx+"==0) goto "+miaux.verdadero[0]+";");
        traductor.imprimir("goto "+miaux.falso[0]+";");
        return  new simbolo(tablaTipos.tipo_booleano,miaux);   
    }
}

module.exports = ol_or;

/*
**********CODIGO STANDARD*************
    TX=-1
	if a>b goto L1
	goto L2
	L1:
		TX=1
	L2:
	if c<d goto L3
	goto L4
	L3: 
		TX=TX+2
	L4:
		TX=TX-1
	if(tx==0)goto LV
	goto LF
 */