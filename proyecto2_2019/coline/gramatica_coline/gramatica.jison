%lex
er_entero                   [0-9]+
er_decimal					{er_entero} [.] {er_entero}?
er_cadena					[\"]([^\"])*[\"]
er_caracter					[\'] ([a-zA-Z]|"\0"|"\n"|"\t"|"\r"|"\f")[\']
er_id                       [a-zA-Z_][a-zA-Z0-9_]*
clinea						"//" [^\n]+ [\n]?
cmulti						"/*" [^*]* "*/" 
%%
{cmulti}					/* ignore comment */
{clinea}                    /* ignore comment */
">="							return 'mayori';
"<="							return 'menori';
">"								return 'mayor';
"<"								return 'menor';
"=="							return 'igual';
"="                             return 'is';
"!="							return 'dif';
";"								return 'ptocoma';
":"                             return 'dosptos';
"?"                             return 'ques';
"++"                            return 'incr';
"--"                            return 'decr';
"+"								return 'mas';
"-"								return 'menos';
"*"								return 'por';
"/"								return 'divis';
"%"                             return 'modu';
"("                             return 'para';
")"                             return 'parc';
"{"                             return 'llava';
"}"                             return 'llavc';
"["                             return 'cora';
"]"                             return 'corc';
","                             return 'coma';
"."                             return 'punto';
"pow"                           return 'potencia';
"^"                             return 'xor_';
"&&"                            return 'and_';
"||"                            return 'or_';
"!"                             return 'not_';
"true"                          return 'verdadero';
"if"                            return 'if_';
"else"                          return "else_";
"false"                         return 'falso';
"print"                         return 'print_';
"println"                       return 'println_';
"while"                         return 'while_';
"break"                         return 'break_';
"continue"                      return 'continue_';
"return"                        return 'return_';
"switch"                        return 'switch_';
"case"                          return 'case_';
"default"                       return 'default_';
"do"                            return 'dow';
"int"                           return 't_int';
"double"                        return 't_double';
"char"                          return 't_char';
"boolean"                       return 't_boolean';
"String"                        return 't_string';
"void"                          return 'vacio';
"null"                          return 'nulo';
"for"                           return 'for_';
"class"                         return 'class_';
"extends"                       return 'extends_';
"@Override"                     return 'sobre_';
"new"                           return 'new_';
"LinkedList"                    return 'll';
"import"                        return 'import_';
"throw"                         return 'throw_';
"try"                           return 'try_';
"catch"                         return 'catch_';
"this"                          return 'this_';
"super"                         return 'super_';
"read_file"                     return 'read_file_';
"write_file"                    return 'write_file_';
"graph"                         return 'graph_';
//""                            return '';
"public"                        return 'publico_';
"protected"                     return 'protegido_';
"private"                       return 'privado_';
"static"                        return 'estatico_';
"final"                         return 'ffinal_';
"abstract"                      return 'abstracto_';
{er_decimal}					return 'er_decimal';
{er_entero}                    	return 'er_entero';
{er_cadena}						return 'er_cadena';
{er_caracter}					return 'er_caracter';
{er_id}                       	return 'er_id';
\s+                         { /* skip whitespace */}
\n+                         {}
\r+                         {}
\t+                         {}
\f+                         {}
<<EOF>>                     return 'ENDOFFILE';
.                         {}
/lex
%{
        const error_manager=require("../../mng_error/error_manager.js");
        const vari = require("../../var.js");
        vari.auxError=new error_manager();
        function ErrorSintactico(a,lin,col){
		    //console.log( "Error Sintactico = " + a+"|"+lin+","+col );
            vari.auxError.addError(a,lin,col,vari.archivo,
            "SINTACTICO");
        }

        function ErrorLexico(a,lin,col){
            
            //console.log( "Error Lexico = " + a +"|"+lin+","+col );
            vari.auxError.addError("caracter inesperado: "+a ,lin,col,vari.archivo,
            "LEXICO");
        }
        const o_postInc = require("../compilador/o_postInc.js");
        const o_preInc = require("../compilador/o_preInc.js");
        const o_postDecr = require("../compilador/o_postDecr.js");
        const o_preDecr = require("../compilador/o_preDecr.js");
         
        const oa_suma = require("../compilador/oa_suma.js");
        const oa_multi = require("../compilador/oa_multi.js");
        const oa_resta = require("../compilador/oa_resta.js");
        const oa_division = require("../compilador/oa_division.js");
        const o_valorPuntual= require("../compilador/o_valorPuntual.js");
        const oa_modular = require("../compilador/oa_modular.js");
        const oa_potencia = require("../compilador/oa_potencia.js");
        const oa_negativo = require("../compilador/oa_negativo.js");
        const oa_casteo= require("../compilador/oa_casteo.js");
        const or_relacional = require("../compilador/or_relacional.js");
        const ol_and=require("../compilador/ol_and.js");
        const ol_not=require("../compilador/ol_not.js");
        const ol_or=require("../compilador/ol_or.js");
        const ol_xor=require("../compilador/ol_xor.js");
        const o_ternario=require("../compilador/o_ternario.js");
        const s_print=require("../compilador/s_print.js");
        const s_println=require("../compilador/s_println.js");
        const s_if=require("../compilador/s_if.js");
        const s_bloque=require("../compilador/s_bloque.js");
        const s_while=require("../compilador/s_while.js");
        const s_do_while=require("../compilador/s_do_while.js");
        const s_for=require("../compilador/s_for.js");
        const s_retorno=require("../compilador/s_retorno.js");
        const s_retornoEmpty=require("../compilador/s_retornoEmpty.js");
        const s_break=require("../compilador/s_break.js");
        const s_continue=require("../compilador/s_continue.js");
        const s_switch=require("../compilador/s_switch.js");
        const s_decla=require("../compilador/s_decla.js");
        const s_declaracion=require("../compilador/s_declaracion.js");
        const s_declaracionG=require("../compilador/s_declaracionG.js");
        const s_declaracionL=require("../compilador/s_declaracionL.js");
        const s_asignacion=require("../compilador/s_asignacion.js");
        const s_accesos=require("../compilador/s_accesos.js");
        const s_acVariable=require("../compilador/s_acVariable.js");
        const caso=require("../compilador/caso.js");
        const parametro=require("../../mng_ts/parametro.js");
        const nodoTipo=require("../../mng_ts/nodoTipo.js");
        const s_metodo=require("../compilador/s_metodo.js");
        const s_llamada=require("../compilador/s_llamada.js");
        const s_llamadaSuper=require("../compilador/s_llamadaSuper.js");
        const s_llamadaThis=require("../compilador/s_llamadaThis.js");
        const s_acArray=require("../compilador/s_acArray.js");
        
        const s_arreglo_lvals=require("../compilador/s_arreglo_lvals.js");
        const s_arreglo_hojas=require("../compilador/s_arreglo_hojas.js");
        const s_arreglo_valores=require("../compilador/s_arreglo_valores.js");
        const s_arregloV=require("../compilador/s_arregloV.js");

        const s_acSuper=require("../compilador/s_acSuper.js");
        const s_acThis=require("../compilador/s_acThis.js");
        const archivo=require("../compilador/archivo.js");
        const myclass=require("../compilador/myclass.js");
        const nuevaInstancia=require("../compilador/nuevaInstancia.js");
        const nuevoArreglo=require("../compilador/nuevoArreglo.js");
        const nuevoLinkedList=require("../compilador/nuevoLinkedList.js");
        const s_declararArr=require("../compilador/s_declararArr.js");
        const s_declararLinkedList=require("../compilador/s_declararLinkedList.js");
        const s_foreach=require("../compilador/s_foreach.js");
        const s_graph=require("../compilador/s_graph.js");
        const s_importar=require("../compilador/s_importar.js");
        const s_metodoConstructor=require("../compilador/s_metodoConstructor.js");
        const s_metodoOver=require("../compilador/s_metodoOver.js");
        const s_readFile=require("../compilador/s_readFile.js");
        const s_throw=require("../compilador/s_throw.js");
        const s_TryCatch=require("../compilador/s_TryCatch.js");
        const s_write_file=require("../compilador/s_write_file.js");
        
        //const s_salida=require("../compilador/s_salida.js");
        const tablaTipos = require("../tablaTipos.js");

%}

//%right is

%left or_
%left and_
%left xor_
%left ques
%right not_
%left igual dif
%left menor menori mayor mayori 
%left mas menos
%left por divis modu
%left potencia 
%left uminus
%right decr incr
%left para parc
%left punto
%left cora corc
/*
%left and_
%left xor_
%right not_
%left mas menos
%left por divis modu
%left potencia 
%left para parc
%left uminus
%left or_
%left is
%left menor menori mayor mayori igual dif
*/

%start INICIO

%%
	
INICIO		    :	ARCHIVO ENDOFFILE
				{
					console.log("aceptada");
                    return $1;
				}
				;
ARCHIVO         :IMPORTACIONES CLASES
                {
                    vari.hash++;
                    $$=new archivo($1,$2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |CLASES
                {
                    vari.hash++;
                    $$=new archivo(new Array(),$1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |IMPORTACIONES
                {
                    vari.hash++;
                    $$=new archivo($1,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
IMPORTACIONES   : IMPORTACIONES IMPORTACION ptocoma
                {
                    $$=$1;
                    $$.push($2);
                }
                |IMPORTACION ptocoma
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;
IMPORTACION     :import_ COND
                {
                    vari.hash++;
                    $$=new archivo($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
CLASES          :CLASES CLASE
                {
                    $$=$1;
                    $$.push($2);
                }
                |CLASE
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;
CLASE           :MODSCAMPO class_ er_id llava llavc
                {
                    vari.hash++;
                    $$=new myclass($1,$3,null,new Array(),@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |class_ er_id llava llavc
                {
                    vari.hash++;
                    $$=new myclass(new Array(),$2,null,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |MODSCAMPO class_ er_id llava LISENT llavc
                {
                    vari.hash++;
                    $$=new myclass($1,$3,null,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |class_ er_id llava LISENT llavc
                {
                    vari.hash++;
                    $$=new myclass(new Array(),$2,null,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |MODSCAMPO class_ er_id extends_ er_id llava llavc
                {
                    vari.hash++;
                    $$=new myclass($1,$3,$5,new Array(),@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |class_ er_id extends_ er_id llava llavc
                {
                    vari.hash++;
                    $$=new myclass(new Array(),$2,$4,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |MODSCAMPO class_ er_id extends_ er_id llava LISENT llavc
                {
                    vari.hash++;
                    $$=new myclass($1,$3,$5,$7,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |class_ er_id extends_ er_id llava LISENT llavc
                {
                    vari.hash++;
                    $$=new myclass(new Array(),$2,$4,$6,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
LISENT          :LISENT OPCG
                {
                    $$=$1;
                    $$.push($2);
                }
                |OPCG   
                {
                    $$=new Array();
                    $$.push($1);
                }             
                ;
OPCG            :DECLAGLOBAL
                {
                    $$=$1;
                }            
                ;
                //METODOS
DECLAGLOBAL     : TIPO er_id para parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,new Array(),0,$6,false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,new Array(),0,new Array(),false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para parc ptocoma
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,new Array(),0,null,true
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,$4,0,$7,false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,$4,0,new Array(),false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc ptocoma
                {
                    vari.hash++;
                    $$=new s_metodo(new Array(),$1,$2,$4,0,null,true
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$5;
                    $$=new s_metodo(new Array(),nuevo,$2,new Array(),$5,$7,false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$5;
                    $$=new s_metodo(new Array(),nuevo,$2,new Array(),$5,new Array(),false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para parc MYDIM ptocoma
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$5;
                    $$=new s_metodo(new Array(),nuevo,$2,new Array(),$5,null,true
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$6;
                    $$=new s_metodo(new Array(),nuevo,$2,$4,$6,$8,false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$6;
                    $$=new s_metodo(new Array(),nuevo,$2,$4,$6,new Array(),false
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id para PARAMS parc MYDIM ptocoma      
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$6;
                    $$=new s_metodo(new Array(),nuevo,$2,$4,$6,null,true
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }           
                | MODSCAMPO TIPO er_id para parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,new Array(),0,$7,false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,new Array(),0,new Array(),false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para parc ptocoma
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,new Array(),0,null,true
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,$5,0,$8,false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,$5,0,new Array(),false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc ptocoma
                {
                    vari.hash++;
                    $$=new s_metodo($1,$2,$3,$5,0,null,true
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$6;
                    $$=new s_metodo($1,nuevo,$3,new Array(),$6,$8,false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$6;
                    $$=new s_metodo($1,nuevo,$3,new Array(),$6,new Array(),false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para parc MYDIM ptocoma
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$6;
                    $$=new s_metodo($1,nuevo,$3,new Array(),$6,null,true
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$7;
                    $$=new s_metodo($1,nuevo,$3,$5,$7,$9,false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$7;
                    $$=new s_metodo($1,nuevo,$3,$5,$7,new Array(),false
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id para PARAMS parc MYDIM ptocoma //fin de metodos
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$7;
                    $$=new s_metodo($1,nuevo,$3,$5,$7,null,true
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                } 
                //SOBRE ESCRITURA
                | sobre_ TIPO er_id para parc llava L llavc
                {//modificadores,tipo,id,parametros,noDimensiones,sentencias
                    vari.hash++;
                    $$=new s_metodoOver(new Array(),$2,$3,new Array(),0,$7
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver(new Array(),$2,$3,new Array(),0,new Array()
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver(new Array(),$2,$3,$5,0,$8
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver(new Array(),$2,$3,$5,0,new Array()
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$6;
                    $$=new s_metodoOver(new Array(),nuevo,$3,new Array(),$6,$8
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$6;
                    $$=new s_metodoOver(new Array(),nuevo,$3,new Array(),$6,new Array()
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para PARAMS parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$7;
                    $$=new s_metodoOver(new Array(),nuevo,$3,$5,$7,$9
                    ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | sobre_ TIPO er_id para PARAMS parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$7;
                    $$=new s_metodoOver(new Array(),nuevo,$3,$5,$7,new Array()
                   ,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                }              
                | sobre_ MODSCAMPO TIPO er_id para parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver($2,$3,$4,new Array(),0,$8
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver($2,$3,$4,new Array(),0,new Array()
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver($2,$3,$4,$6,0,$9
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoOver($2,$3,$4,$6,0,new Array()
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$3);
                    nuevo.dimen=$7;
                    $$=new s_metodoOver($2,nuevo,$4,new Array(),$7,$9
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para parc MYDIM llava llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$3);
                    nuevo.dimen=$7;
                    $$=new s_metodoOver($2,nuevo,$4,new Array(),$7,new Array()
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para PARAMS parc MYDIM llava L llavc
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$3);
                    nuevo.dimen=$8;
                    $$=new s_metodoOver($2,nuevo,$4,$6,$8,$10
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | sobre_ MODSCAMPO TIPO er_id para PARAMS parc MYDIM llava llavc //fin de metodos
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$3);
                    nuevo.dimen=$8;
                    $$=new s_metodoOver($2,nuevo,$4,$6,$8,new Array()
                    ,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                } 
                //CONSTRUCTORES
                | MODSCAMPO er_id para parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor($1,$2,new Array(),$6
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor($1,$2,new Array(),new Array()
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor($1,$2,$4,$7
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor($1,$2,$4,new Array()
                    ,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id para parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor(new Array(),$1,new Array(),$5
                    ,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | er_id para parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor(new Array(),$1,new Array(),new Array()
                    ,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | er_id para PARAMS parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor(new Array(),$1,$3,$6
                    ,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | er_id para PARAMS parc llava llavc
                {
                    vari.hash++;
                    $$=new s_metodoConstructor(new Array(),$1,$3,new Array()
                    ,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //DECLARACION DE CAMPOS
                | TIPO er_id is INICIALIZA ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id  ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id MYDIM is INICIALIZA  ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id MYDIM ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id is INICIALIZA coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$4.length;x++)
                    {
                        lista.push($4[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id MYDIM is INICIALIZA coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$7.length;x++)
                    {
                        lista.push($7[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO er_id MYDIM coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$5.length;x++)
                    {
                        lista.push($5[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG(new Array(),$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id is INICIALIZA  ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,$5,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);                    
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id  ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);                    
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id MYDIM is INICIALIZA  ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,$6,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);                    
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id MYDIM ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);                    
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id is INICIALIZA coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,$5,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$7.length;x++)
                    {
                        lista.push($7[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$5.length;x++)
                    {
                        lista.push($5[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id MYDIM is INICIALIZA coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,$6,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | MODSCAMPO TIPO er_id MYDIM coma LDEC ptocoma
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    //modificadores,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionG($1,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                //LinkedList
                | ll menor TIPO mayor er_id ptocoma
                {
                    vari.hash++;
                    $$=new s_declararLinkedList(true,$3,$5,null,
                    @1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | ll menor TIPO mayor er_id is INICIALIZA ptocoma
                {
                    vari.hash++;
                    $$=new s_declararLinkedList(true,$3,$5,$7,
                    @1.first_line,@1.first_column,vari.archivo,vari.hash);;
                }
                //clase
                |CLASE
                {
                    $$=$1;
                }
                ;


L               : L SENT
                {
                    $$=$1;
                    if($2!=null)
                    {$$.push($2);}
                }
                |SENT
                {
                    $$=new Array();
                    if($1!=null)
                    {$$.push($1);}
                }
                ;
SENT            : IMPRIMIR ptocoma
                {
                    $$=$1;
                }
                |S_BREAK ptocoma
                {
                    $$=$1;
                }
                |S_CON  ptocoma
                {
                    $$=$1;
                }
                |S_RETORNO ptocoma
                {
                    $$=$1;
                }
                |S_IF
                {
                    $$=$1;
                }
                |S_WHILE
                {
                    $$=$1;
                }
                |S_FOR
                {
                    $$=$1;
                }
                |S_DO ptocoma
                {
                    $$=$1;
                }
                |S_SW
                {
                    $$=$1;
                }
                |ALLI ptocoma  
                {
                    $$=$1;
                }
                |throw_ COND ptocoma
                {
                    vari.hash++;
                    $$=new s_throw($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |try_ llava llavc catch para PARAM parc llava llavc  
                {//sentv,param,senf,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_TryCatch(new Array(),$6,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |try_ llava llavc catch para PARAM parc llava L llavc 
                {//sentv,param,senf,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_TryCatch(new Array(),$6,$9,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |try_ llava L llavc catch para PARAM parc llava llavc 
                {//sentv,param,senf,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_TryCatch($3,$7,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |try_ llava L llavc catch para PARAM parc llava L llavc 
                {//sentv,param,senf,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_TryCatch($3,$7,$10,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
                //lac
ALLI            :LLAMADA
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                |ACCESOARREGLO
                {
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                |read_file_ para COND parc
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                |write_file_ para COND coma COND parc
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                |graph_ para COND coma COND parc
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | er_id punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | LLAMADA punto LAC
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                |ACCESOARREGLO  punto LAC
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | this_ punto LAC
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | super_ punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | read_file_ para COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                }
                //DECLARACION
                | er_id er_id is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id MYDIM is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id MYDIM
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id is INICIALIZA coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$4.length;x++)
                    {
                        lista.push($4[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id MYDIM is INICIALIZA coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$7.length;x++)
                    {
                        lista.push($7[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | er_id er_id MYDIM coma LDEC  
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$5.length;x++)
                    {
                        lista.push($5[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    var miType=tablaTipos.getTipoObjeto($1);
                    vari.hash++;
                    $$=new s_declaracionL(false,miType,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id MYDIM is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id MYDIM
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id is INICIALIZA coma LDEC
                 {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$4.length;x++)
                    {
                        lista.push($4[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id MYDIM is INICIALIZA coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$7.length;x++)
                    {
                        lista.push($7[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | TIPO2 er_id MYDIM coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,null,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$5.length;x++)
                    {
                        lista.push($5[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,$5,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id MYDIM is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,$6,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id MYDIM
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id is INICIALIZA coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,$5,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$7.length;x++)
                    {
                        lista.push($7[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,0,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$5.length;x++)
                    {
                        lista.push($5[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id MYDIM is INICIALIZA coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,$6,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                | ffinal_ TIPO er_id MYDIM coma LDEC
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($3,$4,null,@3.first_line,@3.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(true,$2,lista,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                //LinkedList
                | ll menor TIPO mayor er_id
                {
                    vari.hash++;
                    $$=new s_declararLinkedList(false,$3,$5,null,
                    @1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | ll menor TIPO mayor er_id is INICIALIZA
                {
                    vari.hash++;
                    $$=new s_declararLinkedList(false,$3,$5,$7,
                    @1.first_line,@1.first_column,vari.archivo,vari.hash);;
                }
                //ASIGNACION
                | er_id is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |ACCESOARREGLO is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$6,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                |  this_ punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);                    
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);

                }
                //UNAR
                |PREFIJO
                {
                    $$=$1;
                }
                | er_id incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |ACCESOARREGLO incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |  this_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | er_id decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                   $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC decr 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO  punto LAC decr 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC decr  
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }              
                ;

PREFIJO         : incr  LAC  
                {
                    vari.hash++;
                    var aco=new s_accesos($2,vari.hash);
                    vari.hash++;
                    $$=new  o_preInc(aco,@1.first_line,@1.first_column,vari.archivo,vari.hash);  
                }
                | decr LAC
                {
                    vari.hash++;
                    var aco=new s_accesos($2,vari.hash);
                    vari.hash++;
                    $$=new o_preDecr(aco,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;           

PARAMS          :PARAMS coma PARAM
                {
                    $$=$1;
                    $$.push($3);
                }
                |PARAM
                {
                    $$=new Array();
                    $$.push($1); 
                }
                ;

PARAM           :TIPO er_id MYDIM
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$1);
                    nuevo.dimen=$3;
                    //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
                    $$=new parametro(nuevo,$2,null,false,$3,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |TIPO er_id
                {
                    vari.hash++;
                    //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
                    $$=new parametro($1,$2,null,false,0,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |ffinal_ TIPO er_id MYDIM
                {
                    vari.hash++;
                    var nuevo=new nodoTipo(tablaTipos.arreglo,"",$2);
                    nuevo.dimen=$4;
                    //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
                    $$=new parametro(nuevo,$3,null,true,$4,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                |ffinal_ TIPO er_id
                {
                    vari.hash++;
                    //tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash
                    $$=new parametro($2,$3,null,true,0,
                    @3.first_line,@3.first_column,vari.archivo,vari.hash);
                }
                ;
LDEC            :LDEC coma DEC
                {
                    $$=$1;
                    $$.push($3);
                } 
                |DEC
                {
                    $$=new Array();
                    $$.push($1); 
                } 
                ;
DEC             :er_id is INICIALIZA
                {
                    vari.hash++;
                    $$=new s_decla($1,0,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |er_id    
                {
                    vari.hash++;
                    $$=new s_decla($1,0,null,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }            
                |er_id MYDIM is INICIALIZA
                {
                    vari.hash++;
                    $$=new s_decla($1,$2,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }  
                |er_id MYDIM
                {
                    vari.hash++;
                    $$=new s_decla($1,$2,null,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                } 
                ;
MYDIM           :MYDIM cora corc
                {
                    $$=$1+1;
                }
                |cora corc
                {
                    $$=1;
                }
                ;

INICIALIZA      :COND
                {
                    $$=$1;
                }
                //INICIALIZA ARREGLO
                |new_ TIPO TAMDIM
                {//tipo,dimensiones,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevoArreglo($2,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //new LinkedList
                |new_ ll menor mayor para parc
                {
                    vari.hash++;
                    $$=new nuevoLinkedList(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //NUEVO ELEMENTO
                |new_ er_id para parc
                {//id,parametros,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevaInstancia($2,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |new_ er_id para LCOND parc
                {//id,parametros,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevaInstancia($2,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |VALORES
                {
                    $$=new s_arregloV($1);
                }
                ;
VALORES         : llava OVAL llavc
                {
                    vari.hash++;
                    $$=new s_arreglo_valores($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
OVAL            :LC2
                {
                    vari.hash++;
                    $$=new s_arreglo_hojas($1,vari.hash);
                }
                |LVAL
                {
                    vari.hash++;
                    $$=new s_arreglo_lvals($1,vari.hash);
                }
                ;
LVAL            :LVAL coma VALORES
                {
                    $$=$1;
                    $$.push($3);
                }
                |VALORES
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;

LC2             :LC2 coma OC2
                {
                    $$=$1;
                    $$.push($3);
                }   
                |OC2
                {
                    $$=new Array();
                    $$.push($1);
                } 
                ;
OC2             :COND
                {
                    $$=$1;
                }
                //INICIALIZA ARREGLO
                |new_ TIPO TAMDIM
                {//tipo,dimensiones,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevoArreglo($2,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //new LinkedList
                |new_ ll menor mayor para parc
                {
                    vari.hash++;
                    $$=new nuevoLinkedList(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //NUEVO ELEMENTO
                |new_ er_id para parc
                {//id,parametros,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevaInstancia($2,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |new_ er_id para LCOND parc
                {//id,parametros,linea,columna,archivo,hash) 
                    vari.hash++;
                    $$=new nuevaInstancia($2,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
TAMDIM          :TAMDIM  cora COND corc
                {
                    $$=$1;
                    $$.push($3);
                }
                | cora COND corc
                {
                    $$=new Array();
                    $$.push($2);
                }
                ;
                
TIPO            :t_int
                {
                    $$=tablaTipos.tipo_entero;
                }   
                |t_char
                {
                    $$=tablaTipos.tipo_caracter;
                }  
                |t_double
                {
                    $$=tablaTipos.tipo_doble;
                }
                |t_boolean
                {
                    $$=tablaTipos.tipo_booleano;
                }
                |t_string
                {
                    $$=tablaTipos.tipo_cadena;
                }
                |vacio
                {
                    $$=tablaTipos.tipo_vacio;
                }
                |er_id
                {
                    $$=tablaTipos.getTipoObjeto(yytext);
                }

                ;
TIPO2            :t_int
                {
                    $$=tablaTipos.tipo_entero;
                }   
                |t_char
                {
                    $$=tablaTipos.tipo_caracter;
                }  
                |t_double
                {
                    $$=tablaTipos.tipo_doble;
                }
                |t_boolean
                {
                    $$=tablaTipos.tipo_booleano;
                }
                |t_string
                {
                    $$=tablaTipos.tipo_cadena;
                }
                |vacio
                {
                    $$=tablaTipos.tipo_vacio;
                }
                ;
                
MODSCAMPO       :MODSCAMPO MOC
                {
                    $$=$1;
                    $$.push($2);
                }
                |MOC
                {
                    $$=new Array();
                    $$.push($1);   
                }
                ;

MOC             : protegido_
                {
                    $$=tablaTipos.protegido;
                }
                | publico_
                {
                    $$=tablaTipos.publico;
                }
                |privado_
                {
                    $$=tablaTipos.privado;
                }
                |estatico_
                {
                    $$=tablaTipos.estatico;
                }
                |ffinal_
                {
                    $$=tablaTipos.ffinal;
                }
                |abstracto_
                {
                    $$=tablaTipos.abstracto;
                }
                ;
S_SW            :switch_ para COND parc llava LCASOS llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,$6,null,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |switch_ para COND parc llava LCASOS DEFECTO llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,$6,$7,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |switch_ para COND parc llava DEFECTO llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,new Array(),$6,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ; 
DEFECTO         : default_ dosptos
                {
                    vari.hash++;
                    $$=new caso(null,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |default_ dosptos llava L llavc
                {
                    vari.hash++;
                    $$=new caso(null,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |default_ dosptos llava  llavc
                {
                    vari.hash++;
                    $$=new caso(null,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
LCASOS          :  LCASOS CASO
                {
                    $$=$1;
                    $$.push($2);
                }
                |CASO
                {
                    $$=new Array();
                    $$.push($1);
                }                
                ;
CASO            : case_ COND dosptos llava  L llavc
                {
                    vari.hash++;
                    $$=new caso($2,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | case_ COND dosptos llava   llavc
                {
                    vari.hash++;
                    $$=new caso($2,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |case_ COND dosptos
                {
                    vari.hash++;
                    $$=new caso($2,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;

S_BREAK         : break_
                {
                    vari.hash++;
                    $$=new s_break(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
S_CON           : continue_
                {
                    vari.hash++;
                    $$=new s_continue(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
S_RETORNO       : return_ INICIALIZA
                {
                    vari.hash++;
                    $$=new s_retorno($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |return_
                {
                    vari.hash++;
                    $$=new s_retornoEmpty(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
S_DO            :dow llava L llavc while_ para COND parc
                {
                    vari.hash++;
                    $$=new s_do_while($7,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |dow llava  llavc while_ para COND parc
                {
                    vari.hash++;
                    $$=new s_do_while($6,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ; 
S_FOR           :for_ para FINICIO ptocoma COND ptocoma FACTUAL parc llava llavc
                {
                    vari.hash++;
                    $$=new s_for($3,$5,$7,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |for_ para FINICIO ptocoma COND ptocoma FACTUAL parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_for($3,$5,$7,$10,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |for_ para PARAM dosptos COND parc llava llavc
                {
                    vari.hash++;
                    $$=new s_foreach($3,$5,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |for_ para PARAM dosptos COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_foreach($3,$5,$8,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
                //DECLARACION
FINICIO         :TIPO er_id is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,0,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                //| TIPO er_id 
                | TIPO er_id MYDIM is INICIALIZA 
                {
                    //id,noDimensiones,valor,linea,columna,archivo,hash
                    vari.hash++;
                    var myde=new s_decla($2,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(myde);
                    //(IsFinal,tipo,declas,linea,columna,archivo,hash
                    vari.hash++;
                    $$=new s_declaracionL(false,$1,lista,
                    @2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                //| TIPO er_id MYDIM
                //ASIGNACION
                | er_id is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$6,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);

                }
                ;
                //ASIGNACION
FACTUAL         :er_id is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO is INICIALIZA 
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$6,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC is INICIALIZA 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$5,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC is INICIALIZA 
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$8,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC is INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC is  INICIALIZA
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(aco,$10,@9.first_line,@9.first_column,vari.archivo,vari.hash);

                }
                //INC DEC
                | PREFIJO
                {
                    $$=$1;
                }
                | er_id incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                |ACCESOARREGLO  punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
				| super_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
				| read_file_ para COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
				| write_file_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
				| graph_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | er_id decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO  decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
				| super_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
				| read_file_ para COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
				| write_file_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
				| graph_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                   $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC decr   
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC decr   
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                ;

S_WHILE         : while_ para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_while($3,$6,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |while_ para COND parc llava  llavc
                {
                    vari.hash++;
                    $$=new s_while($3,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
S_IF            :BS_IF else_ llava L llavc
                {
                    vari.hash++;
                    var bloque=new s_bloque(null,$4,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    $1.push(bloque);
                    vari.hash++;
                    $$=new s_if($1,vari.hash);
                }
                |BS_IF else_ llava  llavc
                {
                    vari.hash++;
                    var bloque=new s_bloque(null,new Array(),@2.first_line,@2.first_column,vari.archivo,vari.hash);
                    $1.push(bloque);
                    vari.hash++;
                    $$=new s_if($1,vari.hash);
                }
                |BS_IF
                {
                    vari.hash++;
                    $$=new s_if($1,vari.hash);
                }
                ;

BS_IF           :BS_IF SINO
                {
                    $$=$1;
                    $$.push($2);
                }
                |SI
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;
SI               : if_  para COND parc llava llavc
                {
                    vari.hash++;
                    $$=new s_bloque($3,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |if_  para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_bloque($3,$6,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;

SINO            : else_ if_ para COND parc llava llavc
                {
                    vari.hash++;
                    $$=new s_bloque($4,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | else_ if_ para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_bloque($4,$7,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
IMPRIMIR         : print_ para COND parc
                {
                    vari.hash++;
                    $$=new s_print($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | println_ para COND parc
                {
                    vari.hash++;
                    $$=new s_println($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;

COND            :  COND and_ COND
                {
                    vari.hash++;
                    $$=new ol_and($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | COND or_ COND
                {
                    vari.hash++;
                    $$=new ol_or($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | COND xor_ COND
                {
                    vari.hash++;
                    $$=new ol_xor($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |not_ COND
                {
                    vari.hash++;
                    $$=new ol_not($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |REL
                {
                    $$=$1;
                }
                |COND ques COND dosptos COND
                {
                    vari.hash++;
                    $$=new o_ternario($1,$3,$5,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                ;

REL             : E OPREL E
                {
                    vari.hash++;
                    $$=new or_relacional($2,$1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | E 
                {
                    $$=$1;
                }
                ;
OPREL           :menori
                {
                    $$="<=";
                }
                |mayori
                {
                    $$=">=";
                }
                |igual
                {
                    $$="==";
                }
                |dif
                {
                    $$="!=";
                }
                |menor
                {
                    $$="<";
                }
                |mayor
                {
                    $$=">";
                }
                
                ;

E               : E mas E
                {
                    vari.hash++;
                    $$=new oa_suma($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | E menos E
                {
                    vari.hash++;
                    $$=new oa_resta($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | E por E
                {
                    vari.hash++;
                    $$=new oa_multi($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | E divis E
                {
                    vari.hash++;
                    $$=new oa_division($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | E modu E 
                {
                    vari.hash++;
                    $$=new oa_modular($1,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | potencia para E coma E parc %prec potenciacion
                {
                    vari.hash++;
                    $$=new oa_potencia($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |menos E %prec uminus
                {
                    vari.hash++;
                    $$=new oa_negativo($2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | para COND parc
                {
                    $$=$2;
                }
                | PRIM
                {
                    $$=$1;
                }               
                |para TIPO2 parc E
                {
                    vari.hash++;
                    $$=new oa_casteo($2,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                //UNAR
                | PREFIJO
                {
                    $$=$1;
                }
                | er_id incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO incr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                |  this_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ incr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO punto LAC incr
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC incr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | er_id decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO  decr
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | this_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | super_ decr
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@5.first_line,@5.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc decr
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                   $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC decr 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                |ACCESOARREGLO  punto LAC decr 
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@4.first_line,@4.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@7.first_line,@7.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC decr
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC decr  
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    var aco=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@9.first_line,@9.first_column,vari.archivo,vari.hash);
                }
                //|LAC
                |LLAMADA//here
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);

                }
                |ACCESOARREGLO
                {                    
                    var lista=new Array();
                    lista.push($1);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);

                }
                | er_id
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | er_id punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_acVariable($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | LLAMADA punto LAC
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |ACCESOARREGLO punto LAC
                {                   
                    var lista=new Array();
                    lista.push($1);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | this_ 
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | super_
                {
                    vari.hash++;
                    var nuevo=new  s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | this_ punto LAC
                {
                    vari.hash++;
                    var nuevo=new  s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | super_ punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$3.length;x++)
                    {
                        lista.push($3[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$6.length;x++)
                    {
                        lista.push($6[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc punto LAC
                {
                    vari.hash++;
                    var nuevo=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    var lista=new Array();
                    lista.push(nuevo);
                    for(var x=0;x<$8.length;x++)
                    {
                        lista.push($8[x]);
                    }
                    vari.hash++;
                    $$=new s_accesos(lista,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,$$,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
PRIM            : er_cadena
                {
                    var a=yytext+"";
                    a=a.substring(1,a.length-1);
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_cadena,a,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |er_caracter
                {
                    var a=yytext+"";
                    a=a.substring(1,a.length-1);
                    //console.log("|"+a+"|");
                    if(a=="\\n")
                    {
                        //console.log("entro");
                        a=10;
                    }else
                    {
                        a=a.charCodeAt();
                    }
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_caracter,a,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |er_entero
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_entero,yytext,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |er_decimal
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_doble,yytext,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |verdadero
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_booleano,1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |falso
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_booleano,0,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |nulo
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_nulo,tablaTipos.valor_nulo,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
LAC             :LAC punto AC
                {
                    $$=$1;
                    $$.push($3);
                }
                |AC
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;
AC              :LLAMADA
                {
                    $$=$1;
                }
                |er_id
                {
                    vari.hash++;
                    $$=new s_acVariable(yytext,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |this_
                {
                    vari.hash++;
                    $$=new s_acThis(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | read_file_ para COND parc
                {
                    vari.hash++;
                    $$=new s_readFile($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | write_file_ para COND coma COND parc
                {
                    vari.hash++;
                    $$=new s_write_file($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | graph_ para COND coma COND parc
                {
                    vari.hash++;
                    $$=new s_graph($3,$5,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | super_
                {
                    vari.hash++;
                    $$=new s_acSuper(@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | ACCESOARREGLO
                {
                    $$=$1;
                }
                ;
ACCESOARREGLO   :ACCESOARREGLO cora INICIALIZA corc
                {
                    $$=$1;
                    $$.dimensiones.push($3);
                }
                |er_id cora INICIALIZA corc
                {
                    //(id,linea,columna,archivo,hash)
                    vari.hash++;
                    $$=new s_acArray($1,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                    $$.dimensiones.push($3); 
                }
                ;
LCOND           :LCOND coma INICIALIZA
                {
                    $$=$1;
                    $$.push($3);

                }
                |INICIALIZA
                {
                    $$=new Array();
                    $$.push($1);
                }
                ;
LLAMADA         :er_id para parc
                {
                    vari.hash++;
                    $$=new s_llamada($1,new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |er_id para LCOND parc
                {
                    vari.hash++;
                    $$=new s_llamada($1,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |this_ para LCOND parc
                {
                    vari.hash++;
                    $$=new s_llamadaThis($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |this_ para parc
                {
                    vari.hash++;
                    $$=new s_llamadaThis(new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | super_ para LCOND parc
                {
                    vari.hash++;
                    $$=new s_llamadaSuper($3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                | super_ para parc 
                {
                    vari.hash++;
                    $$=new s_llamadaSuper(new Array(),@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
