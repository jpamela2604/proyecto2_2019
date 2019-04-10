const fs = require('fs');
const valores = require("../coline/values_manager.js");
const tablaTipos= require("../coline/tablaTipos.js");
class traducir{
    constructor()
    {
        this.init();
        this.getImprimirCad();
        this.getConcatenar();
        this.getReverse();
        this.getftoa();
        this.getintToStr();
        this.getent();
        this.getbooltoStr();
        this.save("var p=0;\nvar h=0;\n")
    }
    imprimirHead(cadena)
    {
        this.save(cadena+"\n");
    }
    imprimir(cadena)
    {
        var c="       "+cadena+"\n";
        this.save(c);
        //console.log(c);
    }
    imprimir_L(cadena)
    {
        var c="   "+cadena+"\n";
        this.save(c);
        //console.log(c);
    }
    comentarioSimple(cadena)
    {
        var c="//"+cadena+"\n";
        this.save(c);
        //console.log(c);
    }
    comentario(cadena)
    {
        var c="/*########    "+cadena+"    ########*/"+"\n";
        this.save(c);
        //console.log(c);
    }  
    getbooltoStr()
    {
        var ta=valores.getTemporal();var tval=valores.getTemporal();
        var lf=valores.getEtiqueta();var lsalida=valores.getEtiqueta();
        this.save("void booltostr()\n");
        this.save("{\n");
        this.save("        "+ta+"=p+1;\n");
        this.save("        "+tval+"=stack["+ta+"];\n");
        this.save("        stack[p]=h;\n");
        this.save("        if("+tval+"==0)goto "+lf+";\n");
        this.save("        heap[h]=116;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=114;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=117;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=101;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]="+tablaTipos.fin_cadena+";\n");
        this.save("        h=h+1;\n");
        this.save("        goto "+lsalida+";\n");
        this.save("    "+lf+":\n");
        this.save("        heap[h]=102;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=97;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=108;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=115;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]=101;\n");
        this.save("        h=h+1;\n");
        this.save("        heap[h]="+tablaTipos.fin_cadena+";\n");
        this.save("        h=h+1;\n");
        this.save("    "+lsalida+":\n");
        this.save("}\n");
    }
    getImprimirCad()
    {
        this.save("void print_olcp2jjps()\n");
        this.save("{\n");
        var t1=valores.getTemporal();
        this.save("        "+t1+"=p+1;\n");
        var t2=valores.getTemporal();
        this.save("        "+t2+"=stack["+t1+"];\n");
        var inicio=valores.getEtiqueta();
        this.save("    "+inicio+":\n");
        var t3=valores.getTemporal();
        this.save("        "+t3+"=heap["+t2+"];\n");
        var salida=valores.getEtiqueta();
        this.save("        if("+t3+"=="+tablaTipos.fin_cadena+") goto "+salida+";\n");
        this.save("        print(\"%c\","+t3+");\n");
        this.save("        "+t2+"="+t2+"+1;\n");
        this.save("        goto "+inicio+";\n");
        this.save("    "+salida+":\n");
        this.save("}\n");

    }

    getConcatenar()
    {
        var inicio=valores.getEtiqueta();
        var salida=valores.getEtiqueta();
        var t1=valores.getTemporal();
        var t2=valores.getTemporal();
        var t3=valores.getTemporal();
        this.save("void copia_olcp2jjps(){\n");
        this.save("        "+t1+"=p+1;\n");
        this.save("        "+t2+"=stack["+t1+"];\n");
        this.save("    "+inicio+":\n");
        this.save("        "+t3+"=heap["+t2+"];\n");
        this.save("        if("+t3+"=="+tablaTipos.fin_cadena+") goto "+salida+";\n");
        this.save("        heap[h]="+t3+";\n");
        this.save("        h=h+1;"+"\n");
        this.save("        "+t2+"="+t2+"+1;\n");
        this.save("        goto "+inicio+";\n");
        this.save("    "+salida+":\n");
        this.save("}\n");
        var t11=valores.getTemporal();
        var t12=valores.getTemporal();
        var t13=valores.getTemporal();
        var t14=valores.getTemporal();
        var t15=valores.getTemporal();
        var t16=valores.getTemporal();
        this.save("void concat_olcp2jjps(){\n");
        this.save("        stack[p]=h;\n");
        this.save("        "+t11+"=p+3;\n");
        this.save("        "+t12+"="+t11+"+1;\n");
        this.save("        "+t13+"=p+1;\n");
        this.save("        "+t14+"=stack["+t13+"];\n");
        this.save("        stack["+t12+"]="+t14+";\n");
        this.save("        p=p+3;\n");
        this.save("        call copia_olcp2jjps();\n");
        this.save("        p=p-3;\n");
        this.save("        "+t15+"=p+2;\n");
        this.save("        "+t16+"=stack["+t15+"];\n");
        this.save("        stack["+t12+"]="+t16+";\n");
        this.save("        p=p+3;\n");
        this.save("        call copia_olcp2jjps();\n");
        this.save("        p=p-3;\n");
        this.save("        heap[h]="+tablaTipos.fin_cadena+";\n");
        this.save("        h=h+1;\n");
        this.save("}\n");
    }

    getReverse()
    {
        var l3=valores.getEtiqueta();var lt=valores.getEtiqueta();
        var l4=valores.getEtiqueta();
        var tex=valores.getTemporal();var tpu=valores.getTemporal();
        var t1=valores.getTemporal();var t2=valores.getTemporal();
        var t3=valores.getTemporal();var t4=valores.getTemporal();
        var t5=valores.getTemporal();var t6=valores.getTemporal();
        var t7=valores.getTemporal();var t8=valores.getTemporal();
        this.save("void reverse(){\n");
        this.save("        "+tex+"=p+1;\n");
        this.save("        "+tpu+"=stack["+tex+"];\n");
        this.save("        "+t1+"=0;\n");
        this.save("        "+t2+"=0;\n");
        this.save("        "+t3+"=p+2;\n");
        this.save("        "+t4+"=stack["+t3+"];\n");
        this.save("        "+t5+"="+t4+"-1;\n");
        this.save("    "+l3+":\n");
        this.save("        if("+t2+"<"+t5+") goto "+lt+";\n");
        this.save("        goto "+l4+";\n");
        this.save("    "+lt+":\n");
        this.save("        "+t6+"="+tpu+"+"+t2+";\n");
        this.save("        "+t1+"=heap["+t6+"];\n");
        this.save("        "+t7+"="+tpu+"+"+t5+";\n");
        this.save("        "+t8+"=heap["+t7+"];\n");
        this.save("        heap["+t6+"]="+t8+";\n");
        this.save("        heap["+t7+"]="+t1+";\n");
        this.save("        "+t2+"="+t2+"+1;\n");
        this.save("        "+t5+"="+t5+"-1;\n");
        this.save("        goto "+l3+";\n");
        this.save("    "+l4+":\n");
        this.save("}\n");
    }
    getent()
    {
        var t1=valores.getTemporal();var t2=valores.getTemporal();
        var t3=valores.getTemporal();var t4=valores.getTemporal();
        var t5=valores.getTemporal();var t6=valores.getTemporal();
        var t7=valores.getTemporal();var t8=valores.getTemporal();
        var t9=valores.getTemporal();var t10=valores.getTemporal();
        var t11=valores.getTemporal();var t12=valores.getTemporal();
        var t13=valores.getTemporal();var t14=valores.getTemporal();
        var t15=valores.getTemporal();var t16=valores.getTemporal();
        var t17=valores.getTemporal();var t18=valores.getTemporal();
        var t19=valores.getTemporal();var t20=valores.getTemporal();
        var t21=valores.getTemporal();var t22=valores.getTemporal();
        var t23=valores.getTemporal();var t24=valores.getTemporal();
        var t25=valores.getTemporal();var t26=valores.getTemporal();
        var t27=valores.getTemporal();var t28=valores.getTemporal();
        var t29=valores.getTemporal();var t30=valores.getTemporal();
        var t31=valores.getTemporal();var t32=valores.getTemporal();
        var t33=valores.getTemporal();var t34=valores.getTemporal();
        var t35=valores.getTemporal();var t36=valores.getTemporal();
        var t37=valores.getTemporal();var t38=valores.getTemporal();
        var t39=valores.getTemporal();var t40=valores.getTemporal();
        var t41=valores.getTemporal();var t42=valores.getTemporal();
        var t43=valores.getTemporal();var t44=valores.getTemporal();
        /*var l1=valores.getEtiqueta();*/var l2=valores.getEtiqueta();
        var l3=valores.getEtiqueta();var l4=valores.getEtiqueta();
        var l5=valores.getEtiqueta();var l6=valores.getEtiqueta();
        var l7=valores.getEtiqueta();var l8=valores.getEtiqueta();
        var l9=valores.getEtiqueta();var l10=valores.getEtiqueta();
        var l11=valores.getEtiqueta();var l12=valores.getEtiqueta();
        this.save("void getent(){\n");
        this.save("        "+t1+"=p+2;\n");
        this.save("        stack["+t1+"]=0;\n");
        this.save("        "+t2+"=p+1;\n");
        this.save("        "+t3+"=stack["+t2+"];\n");
        this.save("        if("+t3+"<0) goto "+l3+" ;\n");
        this.save("        goto "+l4+";\n");
        this.save("    "+l3+":\n");
        this.save("        "+t4+"=p+1;\n");
        this.save("        "+t5+"=p+1;\n");
        this.save("        "+t6+"=stack["+t5+"];\n");
        this.save("        "+t7+"="+t6+"-0.00000000001;\n");
        this.save("        stack["+t4+"]="+ t7+";\n");
        this.save("        "+t8+"=p+3;\n");
        this.save("        "+t9+"=p+1;\n");
        this.save("        "+t10+"=stack["+t9+"];\n");
        this.save("        "+t11+"=0-1;\n");
        this.save("        "+t12+"="+t10+"*"+t11+";\n");
        this.save("        stack["+t8+"]="+t12+";\n");
        this.save("    "+l5+":\n");
        this.save("        "+t13+"=p+3;\n");
        this.save("        "+t14+"=stack["+t13+"];\n");
        this.save("        if("+t14+"<=1) goto "+l6+";\n");
        this.save("        goto "+l7+";\n");
        this.save("    "+l7+":\n");
        this.save("        "+t15+"=p+3;\n");
        this.save("        "+t16+"=p+3;\n");
        this.save("        "+t17+"=stack["+t16+"];\n");
        this.save("        "+t18+"="+t17+"-1;\n");
        this.save("        stack["+t15+"]="+t18+";\n");
        this.save("        "+t19+"=p+2;\n");
        this.save("        "+t20+"=p+2;\n");
        this.save("        "+t21+"=stack["+t20+"];\n");
        this.save("        "+t22+"="+t21+"+1;\n");
        this.save("        stack["+t19+"]="+t22+";\n");
        this.save("        goto "+l5+";\n");
        this.save("    "+l6+":\n");
        this.save("        goto "+l2+";\n");
        this.save("    "+l4+":\n");
        this.save("        "+t23+"=p+1;\n");
        this.save("        "+t24+"=stack["+t23+"];\n");
        this.save("        if ("+t24+">0) goto "+l8+";\n");
        this.save("        goto "+l9+";\n");
        this.save("    "+l8+":\n");
        this.save("        "+t25+"=p+1;\n");
        this.save("        "+t26+"=p+1;\n");
        this.save("        "+t27+"=stack["+t26+"];\n");
        this.save("        "+t28+"="+t27+"+0.00000000001;\n");
        this.save("        stack["+t25+"]="+t28+";\n");
        this.save("        "+t29+"=p+4;\n");
        this.save("        "+t30+"=p+1;\n");
        this.save("        "+t31+"=stack["+t30+"];\n");
        this.save("        stack["+t29+"]="+t31+";\n");
        this.save("    "+l10+":\n");
        this.save("        "+t32+"=p+4;\n");
        this.save("        "+t33+"=stack["+t32+"];\n");
        this.save("        if("+t33+"<=1) goto "+l11+";\n");
        this.save("        goto "+l12+";\n");
        this.save("    "+l12+":\n");
        this.save("        "+t34+"=p+4;\n");
        this.save("        "+t35+"=p+4;\n");
        this.save("        "+t36+"=stack["+t35+"];\n");
        this.save("        "+t37+"="+t36+"-1;\n");
        this.save("        stack["+t34+"]="+t37+";\n");
        this.save("        "+t38+"=p+2;\n");
        this.save("        "+t39+"=p+2;\n");
        this.save("        "+t40+"=stack["+t39+"];\n");
        this.save("        "+t41+"="+t40+"+1;\n");
        this.save("        stack["+t38+"]="+t41+";\n");
        this.save("        goto "+l10+";\n");
        this.save("    "+l11+":\n");
        this.save("        goto "+l2+";\n");
        this.save("    "+l9+":\n");
        this.save("    "+l2+":\n");
        this.save("        "+t42+"=p+0;\n");
        this.save("        "+t43+"=p+2;\n");
        this.save("        "+t44+"=stack["+t43+"];\n");
        this.save("        stack["+t42+"]="+t44+";\n");
        this.save("}\n");
    }
    getintToStr()
    {
        /*
        var t1=valores.getTemporal();var t7=valores.getTemporal();var t10=valores.getTemporal();
        var t16=valores.getTemporal();var t31=valores.getTemporal();var t41=valores.getTemporal();
        var t42=valores.getTemporal();
        var l1=valores.getEtiqueta();var l2=valores.getEtiqueta();
        var l9=valores.getEtiqueta();var l10=valores.getEtiqueta();
        var l11=valores.getEtiqueta();var l12=valores.getEtiqueta();
        var l13=valores.getEtiqueta();var l14=valores.getEtiqueta();
        var l15=valores.getEtiqueta();var l16=valores.getEtiqueta();
        var l17=valores.getEtiqueta();var l18=valores.getEtiqueta();
        */
        var t2=valores.getTemporal();var t3=valores.getTemporal();var t4=valores.getTemporal();
        var t5=valores.getTemporal();var t6=valores.getTemporal();var t8=valores.getTemporal();
        var t9=valores.getTemporal();var t11=valores.getTemporal();var t12=valores.getTemporal();
        var t13=valores.getTemporal();var t14=valores.getTemporal();var t15=valores.getTemporal();
        var t17=valores.getTemporal();var t18=valores.getTemporal();var t19=valores.getTemporal();
        var t20=valores.getTemporal();var t21=valores.getTemporal();var t22=valores.getTemporal();
        var t23=valores.getTemporal();var t24=valores.getTemporal();var t25=valores.getTemporal();
        var t26=valores.getTemporal();var t27=valores.getTemporal();var t28=valores.getTemporal();
        var t29=valores.getTemporal();var t30=valores.getTemporal();var t32=valores.getTemporal();
        var t33=valores.getTemporal();var t34=valores.getTemporal();var t35=valores.getTemporal();
        var t36=valores.getTemporal();var t37=valores.getTemporal();var t38=valores.getTemporal();
        var t39=valores.getTemporal();var t40=valores.getTemporal();var t43=valores.getTemporal();
        var t44=valores.getTemporal();var t45=valores.getTemporal();        
        var l3=valores.getEtiqueta();var l4=valores.getEtiqueta();var l5=valores.getEtiqueta();var l6=valores.getEtiqueta();
        var l7=valores.getEtiqueta();var l8=valores.getEtiqueta();
        
        this.save("void inttostr(){\n");
        this.save("        "+t2+"=p+3;\n");
        this.save("        stack["+t2+"]=h"+";\n");
        this.save("        "+t3+"=p+4;\n");
        this.save("        stack["+t3+"]=0;\n");
        this.save("    "+l3+":\n");
        this.save("        "+t4+"=p+1;\n");
        this.save("        "+t5+"=stack["+t4+"];\n");
        this.save("        if ("+t5+"!=0) goto "+l4+";\n");
        this.save("        goto "+l5+";\n");
        this.save("    "+l4+":\n");
        this.save("        "+t6+"=p+4;\n");
        this.save("        "+t8+"=stack["+t6+"];\n");
        this.save("        "+t9+"="+t8+"+1;\n");
        this.save("        stack["+t6+"]="+t9+";\n");
        this.save("        "+t11+"=p+1;\n");
        this.save("        "+t12+"=stack["+t11+"];\n");
        this.save("        "+t13+"="+t12+"%10;\n");
        this.save("        "+t14+"="+t13+"+48;\n");
        this.save("        heap[h]="+t14+";\n");
        this.save("        h=h+1;\n");
        this.save("        "+t15+"=p+1;\n");
        this.save("        "+t17+"=stack["+t15+"];\n");
        this.save("        "+t18+"="+t17+"/10;\n");
        this.save("        stack["+t15+"]="+t18+";\n");
        this.save("        "+t19+"=p+1;\n");
        this.save("        "+t20+"=p+5;\n");
        this.save("        "+t21+"="+t20+"+1;\n");
        this.save("        "+t22+"=p+1;\n");
        this.save("        "+t23+"=stack["+t22+"];\n");
        this.save("        stack["+t21+"]="+t23+";\n");
        this.save("        p=p+5;\n");
        this.save("        call getent();\n");
        this.save("        "+t24+"=p+0;\n");
        this.save("        "+t25+"=stack["+t24+"];\n");
        this.save("        p=p-5;\n");
        this.save("        $$_clean_scope("+t20+",5);\n");
        this.save("        stack["+t19+"]="+t25+";\n");
        this.save("        goto "+l3+";\n");
        this.save("    "+l5+":\n");
        this.save("    "+l6+":\n");
        this.save("        "+t26+"=p+4;\n");
        this.save("        "+t27+"=stack["+t26+"];\n");
        this.save("        "+t28+"=p+2;\n");
        this.save("        "+t29+"=stack["+t28+"];\n");
        this.save("        if("+t27+"<"+t29+") goto "+l7+";\n");
        this.save("        goto "+l8+";\n");
        this.save("    "+l7+":\n");
        this.save("        heap[h]=48;\n");
        this.save("        h=h+1;\n");
        this.save("        "+t30+"=p+4;\n");
        this.save("        "+t32+"=stack["+t30+"];\n");
        this.save("        "+t33+"="+t32+"+1;\n");
        this.save("        stack["+t30+"]="+t33+";\n");
        this.save("        goto "+l6+";\n");
        this.save("    "+l8+":\n");
        this.save("        "+t34+"=p+5;\n");
        this.save("        "+t35+"="+t34+"+1;\n");
        this.save("        "+t36+"=p+3;\n");
        this.save("        "+t37+"=stack["+t36+"];\n");
        this.save("        stack["+t35+"]="+t37+";\n");
        this.save("        "+t38+"="+t34+"+2;\n");
        this.save("        "+t39+"=p+4;\n");
        this.save("        "+t40+"=stack["+t39+"];\n");
        this.save("        stack["+t38+"]="+t40+";\n");
        this.save("        p=p+5;\n");
        this.save("        call reverse();\n");
        this.save("        p=p-5;\n");
        this.save("        $$_clean_scope("+t34+", 5);\n");
        this.save("        "+t43+"=p+0;\n");
        this.save("        "+t44+"=p+4;\n");
        this.save("        "+t45+"=stack["+t44+"];\n");
        this.save("        stack["+t43+"]="+t45+";\n");
        this.save("}\n");
    }

    getftoa()
    {
        //var t1=valores.getTemporal();var t2=valores.getTemporal();


        var t3=valores.getTemporal();var t4=valores.getTemporal();var t5=valores.getTemporal();
        var t6=valores.getTemporal();var t7=valores.getTemporal();var t8=valores.getTemporal();
        var t9=valores.getTemporal();var t10=valores.getTemporal();var t11=valores.getTemporal();
        var t12=valores.getTemporal();var t13=valores.getTemporal();var t14=valores.getTemporal();
        var t15=valores.getTemporal();var t16=valores.getTemporal();var t17=valores.getTemporal();
        var t18=valores.getTemporal();var t19=valores.getTemporal();var t20=valores.getTemporal();
        var t21=valores.getTemporal();var t22=valores.getTemporal();var t23=valores.getTemporal();
        var t24=valores.getTemporal();var t25=valores.getTemporal();var t26=valores.getTemporal();
        var t27=valores.getTemporal();var t28=valores.getTemporal();var t29=valores.getTemporal();
        var t30=valores.getTemporal();var t31=valores.getTemporal();var t32=valores.getTemporal();
        var t33=valores.getTemporal();var t34=valores.getTemporal();var t35=valores.getTemporal();
        var t36=valores.getTemporal();var t37=valores.getTemporal();var t38=valores.getTemporal();
        var t39=valores.getTemporal();var t40=valores.getTemporal();var t41=valores.getTemporal();
        var t42=valores.getTemporal();var t43=valores.getTemporal();var t44=valores.getTemporal();
        var t45=valores.getTemporal();var t46=valores.getTemporal();var t47=valores.getTemporal();
        var t48=valores.getTemporal();var t49=valores.getTemporal();var t50=valores.getTemporal();
        var t51=valores.getTemporal();var t52=valores.getTemporal();
        var t53=valores.getTemporal();var t54=valores.getTemporal();
        var t55=valores.getTemporal();var t56=valores.getTemporal();
        var t57=valores.getTemporal();var t58=valores.getTemporal();
        var t59=valores.getTemporal();var t60=valores.getTemporal();
        var t61=valores.getTemporal();var t62=valores.getTemporal();
        var t63=valores.getTemporal();var t64=valores.getTemporal();
        var t65=valores.getTemporal();var t66=valores.getTemporal();
        var t67=valores.getTemporal();var t68=valores.getTemporal();
        var t69=valores.getTemporal();var t70=valores.getTemporal();
        var t71=valores.getTemporal();
        /*var l1=valores.getEtiqueta();var l2=valores.getEtiqueta();
        var l3=valores.getEtiqueta();var l4=valores.getEtiqueta();*/
        var l5=valores.getEtiqueta();var l6=valores.getEtiqueta();
        var l7=valores.getEtiqueta();var l8=valores.getEtiqueta();
        var l9=valores.getEtiqueta();var l10=valores.getEtiqueta();
        var l11=valores.getEtiqueta();var l12=valores.getEtiqueta();
        var l13=valores.getEtiqueta();var l14=valores.getEtiqueta();
        var l15=valores.getEtiqueta();var l16=valores.getEtiqueta();
        this.save("void ftoa(){\n");
        this.save("        "+t3+"=p+3;\n");
        this.save("        stack["+t3+"]=h;\n");
        this.save("        "+t4+"=p+1;\n");
        this.save("        "+t5+"=stack["+t4+"];\n");
        this.save("        if("+t5+"<0) goto "+l6+";\n");
        this.save("        goto "+l7+";\n");
        this.save("    "+l6+":\n");
        this.save("        heap[h]=45;\n");
        this.save("        h=h+1;\n");
        this.save("        "+t6+"=p+1;\n");
        this.save("        "+t7+"=p+1;\n");
        this.save("        "+t8+"=stack["+t7+"];\n");
        this.save("        "+t9+"=-1;\n");
        this.save("        "+t10+"="+t8+"*"+t9+";\n");
        this.save("        stack["+t6+"]="+t10+";\n");
        this.save("        goto "+l5+";\n");
        this.save("    "+l7+":\n");
        this.save("    "+l5+":\n");
        this.save("        "+t11+"=p+4;\n");
        this.save("        "+t12+"=p+4;\n");
        this.save("        "+t13+"="+t12+"+1;\n");
        this.save("        "+t14+"=p+1;\n");
        this.save("        "+t15+"=stack["+t14+"];\n");
        this.save("        stack["+t13+"]="+t15+";\n");
        this.save("        p=p+4;\n");
        this.save("        call getent();\n");
        this.save("        "+t16+"=p+0;\n");
        this.save("        "+t17+"=stack["+t16+"];\n");
        this.save("        p=p-4;\n");
        this.save("        $$_clean_scope("+t12+", 4);\n");
        this.save("        stack["+t11+"]="+t17+";\n");
        this.save("        "+t18+"=p+5;\n");
        this.save("        "+t19+"=p+1;\n");
        this.save("        "+t20+"=stack["+t19+"];\n");
        this.save("        "+t21+"=p+4;\n");
        this.save("        "+t22+"=stack["+t21+"];\n");
        this.save("        "+t23+"="+t20+"-"+t22+";\n");
        this.save("        stack["+t18+"]="+t23+";\n");
        this.save("        "+t24+"=p+4;\n");
        this.save("        "+t25+"=stack["+t24+"];\n");
        this.save("        if("+t25+"==0) goto "+l9+";\n");
        this.save("        goto "+l10+";\n");
        this.save("    "+l9+":\n");
        this.save("        heap[h]=48;\n");
        this.save("        h=h+1;\n");
        this.save("        goto "+l8+";\n");
        this.save("    "+l10+":\n");
        this.save("    "+l8+":\n");
        this.save("        "+t26+"=p+6;\n");
        this.save("        "+t27+"=p+6;\n");
        this.save("        "+t28+"="+t27+"+1;\n");
        this.save("        "+t29+"=p+4;\n");
        this.save("        "+t30+"=stack["+t29+"];\n");
        this.save("        stack["+t28+"]="+t30+";\n");
        this.save("        "+t31+"="+t27+"+2;\n");
        this.save("        stack["+t31+"]=0;\n");
        this.save("        p=p+6;\n");
        this.save("        call inttostr();\n");
        this.save("        "+t32+"=p+0;\n");
        this.save("        "+t33+"=stack["+t32+"];\n");
        this.save("        p=p-6;\n");
        this.save("        $$_clean_scope("+t27+", 6);\n");
        this.save("        stack["+t26+"]="+t33+";\n");
        this.save("        "+t34+"=p+2;\n");
        this.save("        "+t35+"=stack["+t34+"];\n");
        this.save("        if ("+t35+"!=0) goto "+l12+";\n");
        this.save("        goto "+l13+";\n");
        this.save("    "+l12+":\n");
        this.save("        heap[h]=46;\n");
        this.save("        h=h+1;\n");
        this.save("        "+t36+"=p+7;\n");
        this.save("        stack["+t36+"]=0;\n");
        this.save("        "+t37+"=p+8;\n");
        this.save("        stack["+t37+"]=1;\n");
        this.save("    "+l14+":\n");
        this.save("        "+t38+"=p+7;\n");
        this.save("        "+t39+"=stack["+t38+"];\n");
        this.save("        "+t40+"=p+2;\n");
        this.save("        "+t41+"=stack["+t40+"];\n");
        this.save("        if("+t39+"<"+t41+") goto "+l15+";\n");
        this.save("        goto "+l16+";\n");
        this.save("    "+l15+":\n");
        this.save("        "+t42+"=p+8;\n");
        this.save("        "+t43+"=p+8;\n");
        this.save("        "+t44+"=stack["+t43+"];\n");
        this.save("        "+t45+"="+t44+"*10;\n");
        this.save("        stack["+t42+"]="+t45+";\n");
        this.save("        "+t46+"=p+7;\n");
        this.save("        "+t47+"=p+7;\n");
        this.save("        "+t48+"=stack["+t47+"];\n");
        this.save("        "+t49+"="+t48+"+1;\n");
        this.save("        stack["+t46+"]="+t49+";\n");
        this.save("        goto "+l14+";\n");
        this.save("    "+l16+":\n");
        this.save("        "+t50+"=p+5;\n");
        this.save("        "+t51+"=p+5;\n");
        this.save("        "+t52+"=stack["+t51+"];\n");
        this.save("        "+t53+"=p+8;\n");
        this.save("        "+t54+"=stack["+t53+"];\n");
        this.save("        "+t55+"="+t52+"*"+t54+";\n");
        this.save("        stack["+t50+"]="+t55+";\n");
        this.save("        "+t56+"=p+10;\n");
        this.save("        "+t57+"="+t56+"+1;\n");
        this.save("        "+t58+"=p+10;\n");
        this.save("        "+t59+"="+t58+"+1;\n");
        this.save("        "+t60+"=p+5;\n");
        this.save("        "+t61+"=stack["+t60+"];\n");
        this.save("        stack["+t59+"]="+t61+";\n");
        this.save("        p=p+10;\n");
        this.save("        call getent();\n");
        this.save("        "+t62+"=p+0;\n");
        this.save("        "+t63+"=stack["+t62+"];\n");
        this.save("        p=p-10;\n");
        this.save("        $$_clean_scope("+t58+",10);\n");
        this.save("        stack["+t57+"]="+t63+";\n");
        this.save("        "+t64+"="+t56+"+2;\n");
        this.save("        "+t65+"=p+2;\n");
        this.save("        "+t66+"=stack["+t65+"];\n");
        this.save("        stack["+t64+"]="+t66+";\n");
        this.save("        p=p+10;\n");
        this.save("        call inttostr();\n");
        this.save("        "+t67+"=p+0;\n");    
        this.save("        "+t68+"=stack["+t67+"];\n");
        this.save("        p=p-10;\n");
        this.save("        goto "+l11+";\n");
        this.save("    "+l13+":\n");
        this.save("    "+l11+":\n");
        this.save("        heap[h]="+tablaTipos.fin_cadena+";\n");
        this.save("        h=h+1;\n");
        this.save("        "+t69+"=p+0;\n");
        this.save("        "+t70+"=p+3;\n");
        this.save("        "+t71+"=stack["+t70+"];\n");
        this.save("        stack["+t69+"]="+t71+";\n");
        this.save("}\n");
    }
    init()
    {
        //this.cadena=this.getReverse()+this.getImprimirCad()+this.getConcatenar()+"var p=0;\nvar h=0;\n"+this.cadena;
        fs.writeFileSync("./codigo3d", "");
    }

    save(cad)
    {
        fs.appendFileSync("./codigo3d",cad);
    }
}

module.exports = traducir;