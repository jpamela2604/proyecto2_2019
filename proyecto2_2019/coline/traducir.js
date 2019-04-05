const fs = require('fs');
const valores = require("../coline/values_manager.js");
const tablaTipos= require("../coline/tablaTipos.js");
class traducir{
    constructor()
    {
        this.cadena="";
    }
    imprimir(cadena)
    {
        var c="       "+cadena+"\n";
        this.cadena=this.cadena+c;
        //console.log(c);
    }
    imprimir_L(cadena)
    {
        var c="   "+cadena+"\n";
        this.cadena=this.cadena+c;
        //console.log(c);
    }
    comentarioSimple(cadena)
    {
        var c="//"+cadena+"\n";
        this.cadena=this.cadena+c;
        //console.log(c);
    }
    comentario(cadena)
    {
        var c="/*########    "+cadena+"    ########*/"+"\n";
        this.cadena=this.cadena+c;
        //console.log(c);
    }  

    getImprimirCad()
    {
        var prin="void print_olcp2jjps()\n";
        prin=prin+"{\n";
        var t1=valores.getTemporal();
        prin=prin+"        "+t1+"=p+1;\n";
        var t2=valores.getTemporal();
        prin=prin+"        "+t2+"=stack["+t1+"];\n";
        var inicio=valores.getEtiqueta();
        prin=prin+"    "+inicio+":\n";
        var t3=valores.getTemporal();
        prin=prin+"        "+t3+"=heap["+t2+"];\n";
        var salida=valores.getEtiqueta();
        prin=prin+"        if("+t3+"=="+tablaTipos.fin_cadena+") goto "+salida+";\n";
        prin=prin+"        print(\"%c\","+t3+");\n";
        prin=prin+"        "+t2+"="+t2+"+1;\n";
        prin=prin+"        goto "+inicio+";\n";
        prin=prin+"    "+salida+":\n";
        prin=prin+"}\n";
        return prin;

    }

    getConcatenar()
    {
        var inicio=valores.getEtiqueta();
        var salida=valores.getEtiqueta();
        var t1=valores.getTemporal();
        var t2=valores.getTemporal();
        var t3=valores.getTemporal();
        var con="void copia_olcp2jjps(){\n";
        con=con+"        "+t1+"=p+1;\n";
        con=con+"        "+t2+"=stack["+t1+"];\n";
        con=con+"    "+inicio+":\n";
        con=con+"        "+t3+"=heap["+t2+"];\n";
        con=con+"        if("+t3+"=="+tablaTipos.fin_cadena+") goto "+salida+";\n";
        con=con+"        heap[h]="+t3+";\n";
        con=con+"        h=h+1;"+"\n";
        con=con+"        "+t2+"="+t2+"+1;\n";
        con=con+"        goto "+inicio+";\n";
        con=con+"    "+salida+":\n";
        con=con+"}\n"
        var t11=valores.getTemporal();
        var t12=valores.getTemporal();
        var t13=valores.getTemporal();
        var t14=valores.getTemporal();
        var t15=valores.getTemporal();
        var t16=valores.getTemporal();
        con=con+"void concat_olcp2jjps(){\n";
        con=con+"        stack[p]=h;\n";
        con=con+"        "+t11+"=p+3;\n";
        con=con+"        "+t12+"="+t11+"+1;\n";
        con=con+"        "+t13+"=p+1;\n";
        con=con+"        "+t14+"=stack["+t13+"];\n";
        con=con+"        stack["+t12+"]="+t14+";\n";
        con=con+"        p=p+3;\n";
        con=con+"        call copia_olcp2jjps();\n";
        con=con+"        p=p-3;\n";
        con=con+"        "+t15+"=p+2;\n";
        con=con+"        "+t16+"=stack["+t15+"];\n";
        con=con+"        stack["+t12+"]="+t16+";\n";
        con=con+"        p=p+3;\n";
        con=con+"        call copia_olcp2jjps();\n";
        con=con+"        p=p-3;\n";
        con=con+"        heap[h]="+tablaTipos.fin_cadena+";\n";
        con=con+"        h=h+1;\n";
        con=con+"}\n"
        return con;
    }

    getReverse()
    {
        var inicio=valores.getEtiqueta();var salida=valores.getEtiqueta();
        var t1=valores.getTemporal();var t2=valores.getTemporal();
        var t3=valores.getTemporal();var t4=valores.getTemporal();
        var t5=valores.getTemporal();var t6=valores.getTemporal();
        var t7=valores.getTemporal();var t8=valores.getTemporal();
        var rev="void reverse_olcp2jjps(){\n";
        rev=rev+"        "+t1+"=0;\n";
        rev=rev+"        "+t2+"=0;\n";
        rev=rev+"        "+t3+"=p+2;\n";
        rev=rev+"        "+t4+"=stack["+t3+"];\n";
        rev=rev+"        "+t5+"="+t4+"-1;\n";
        rev=rev+"    "+inicio+":\n";
        rev=rev+"        if("+t2+"<"+t5+") goto "+salida+";\n";
        rev=rev+"        "+t6+"=p+"+t2+";\n";
        rev=rev+"        "+t1+"=heap["+t6+"];\n";
        rev=rev+"        "+t7+"=p+"+t5+";\n";
        rev=rev+"        "+t8+"=heap["+t7+"];\n";
        rev=rev+"        heap["+t6+"]="+t8+";\n";
        rev=rev+"        heap["+t7+"]="+t1+";\n";
        rev=rev+"        "+t2+"="+t2+"+1;\n";
        rev=rev+"        "+t5+"="+t5+"-1;\n";
        rev=rev+"        goto "+inicio+";\n";
        rev=rev+"    "+salida+":\n";
        rev=rev+"}\n";
        return rev;
    }

    save()
    {
        this.cadena=this.getReverse()+this.getImprimirCad()+this.getConcatenar()+"var p=0;\nvar h=0;\n"+this.cadena;
        fs.writeFile("./codigo3d", this.cadena, function (err) {
            // la funcion es la que maneja lo que sucede despues de termine el evento
            if (err) {
                return console.log(err);
            }
            // las funciones de javascript en nodejs son asincronicas
            // por lo tanto lo que se quiera hacer debe hacerse dentro de la funcion que maneja el evento
            // si uno declara una variable arriba de la funcion, la manipula dentro y la quiere usar
            // despues afuera, se corre el riezgo de que nunca se realice la manipulacion.
            console.log("The file was saved!");
        });
    }
}

module.exports = traducir;