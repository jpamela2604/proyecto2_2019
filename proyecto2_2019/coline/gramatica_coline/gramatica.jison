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
.                         {ErrorLexico(yytext,yylineno,yylloc.first_column); }
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
        const s_asignacion=require("../compilador/s_asignacion.js");
        const s_accesos=require("../compilador/s_accesos.js");
        const s_acVariable=require("../compilador/s_acVariable.js");
        const caso=require("../compilador/caso.js");
        const parametro=require("../../mng_ts/parametro.js");
        const s_metodo=require("../compilador/s_metodo.js");
        const s_llamada=require("../compilador/s_llamada.js");
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
	
INICIO		    :	S ENDOFFILE
				{
					//typeof console !== 'undefined' ? console.log($1) : print($1);
					//console.log("aceptada");
					return $1;
				}
				;

S               : LISENT
                {
                    $$=$1;
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
OPCG            :DECLAMETO
                {
                    $$=$1;
                }
                |DECLARACION ptocoma
                {
                    $$=$1;
                    $$.IsGlobal=true;
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
                |DECLARACION ptocoma
                {
                    $$=$1;
                }
                |ASIGNACION ptocoma
                {
                    $$=$1;
                }
                |LAC ptocoma
                {
                    vari.hash++;
                    $$=new s_accesos($1,vari.hash);
                }
                |UNAR ptocoma
                {
                    $$=$1;
                }
                |error ptocoma
				{
					 ErrorSintactico("falta un punto y coma ",yylineno,0);
                     $$=null;									
				}
                ;
UNAR            :PREFIJO
                {
                    $$=$1;
                }
                |POSTFIJO
                {
                    $$=$1;
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
POSTFIJO        : LAC incr
                {
                    vari.hash++;
                    var aco=new s_accesos($1,vari.hash);
                    vari.hash++;
                    $$=new o_postInc(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                | LAC decr
                {
                    vari.hash++;
                    var aco=new s_accesos($1,vari.hash);
                    vari.hash++;
                    $$=new o_postDecr(aco,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                ;

DECLAMETO       :CABEZAMET llava  L llavc
                {
                    $$=$1;
                    $$.isAbstract=false;
                    $$.sentencias=$3;
                }
                |CABEZAMET llava  llavc
                {
                    $$=$1;
                    $$.isAbstract=false;
                    $$.sentencias=new Array();
                }
                |CABEZAMET ptocoma
                {
                    $$=$1;
                    $$.isAbstract=true;
                    $$.sentencias=null;
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
PARAM           :TIPO ARRID
				{
                    vari.hash++;
                    //(tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash)
                    $$=new parametro($1,$2.id,null,false,$2.noDimensiones,$2.linea,$2.columna,
                    $2.archivo,vari.hash);
				}
				|ffinal_ TIPO ARRID
				{
                    vari.hash++;
                    //(tipo,nombre,valor,isFinal,noDimensiones,linea,columna,archivo,hash)
                    $$=new parametro($2,$3.id,null,true,$3.noDimensiones,$3.linea,$3.columna,
                    $3.archivo,vari.hash);
				}
                ;
CABEZAMET       :MODSCAMPO TIPO DEM
				{
                    $3.tipo=$2;
                    $3.modificadores=$1;
                    $$=$3;  
				}
				|TIPO DEM
				{
                    $2.tipo=$1;
                    $$=$2;                    
				}
				;
DEM				:DEM cora corc
				{
                    $$=$1;
                    $$.noDimensiones++;
				}
				|er_id para PARAMS parc
				{
                    vari.hash++;
                    //isAbstract,id,sentencias,parametros,modificadores,tipo,noDimensiones,linea,columna,archivo,hash) 
                    $$=new s_metodo(null,$1,null,$3,new Array(),null,0,@1.first_line,@1.first_column,
                    vari.archivo,vari.hash);
				}
                |er_id para  parc
				{
                    vari.hash++;
                    //isAbstract,id,sentencias,parametros,modificadores,tipo,noDimensiones,linea,columna,archivo,hash) 
                    $$=new s_metodo(null,$1,null,new Array(),new Array(),null,0,@1.first_line,@1.first_column,
                    vari.archivo,vari.hash);
				}
				;
ASIGNACION      :LAC is INICIALIZA  
                {
                    vari.hash++;
                    var ace=new s_accesos($1,vari.hash);
                    vari.hash++;
                    $$=new s_asignacion(ace,$3,@2.first_line,@2.first_column,vari.archivo,vari.hash);
                }
                ;

DECLARACION     : MODSCAMPO TIPO LDEC
                {
                    vari.hash++;
                    $$=new s_declaracion($1,$2,$3,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |TIPO LDEC 
                {
                    vari.hash++;
                    $$=new s_declaracion(new Array(),$1,$2,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                ;
LDEC            :LDEC coma DEC
                {
                    $$=$1;
                    $$.push($2);
                }   
                |DEC
                {
                    $$=new Array();
                    $$.push($1); 
                } 
                ;

DEC             :ARRID is INICIALIZA
                {
                    $$=$1;
                    $$.valor=$3;
                }
                |ARRID
                {
                    $$=$1;
                }
                ;
INICIALIZA      :COND
                {
                    $$=$1;
                }
                ;
ARRID           :ARRID cora corc
                {
                    $$=$1;
                    $$.noDimensiones=$$.noDimensiones+1;

                }
                |er_id 
                {
                    vari.hash++;
                    $$=new s_decla($1,0,null,@1.first_line,@1.first_column,vari.archivo,vari.hash);
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
                /*|er_id
                {
                    $$=tablaTipos.getTipoObjeto(yytext);
                }*/
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
LCASOS          : LCASOS CASO
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
S_RETORNO       : return_ COND
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
                ;
FINICIO         :DECLARACION
                {
                    $$=$1;
                }
                |ASIGNACION
                {
                    $$=$1;
                }
                ;
FACTUAL         :ASIGNACION
                {
                    $$=$1;
                }
                |UNAR
                {
                    $$=$1;
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
SI              : if_  para COND parc llava llavc
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
IMPRIMIR        : print_ para COND parc
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
COND            : COND and_ COND
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
                |LAC
                {
                    vari.hash++;
                    var ace=new s_accesos($1,vari.hash);
                    vari.hash++;
                    $$=new o_valorPuntual(null,ace,@1.first_line,@1.first_column,vari.archivo,vari.hash);

                }
                |para TIPO parc E
                {
                    vari.hash++;
                    $$=new oa_casteo($2,$4,@1.first_line,@1.first_column,vari.archivo,vari.hash);
                }
                |UNAR
                {
                    $$=$1;
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
                    $$=new o_valorPuntual(tablaTipos.tipo_nulo,null,@1.first_line,@1.first_column,vari.archivo,vari.hash);
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
                ;