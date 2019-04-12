%lex
%options case-insensitive
er_entero                   [0-9]+
er_decimal					{er_entero} [.] {er_entero}?
/*er_temp                     "t" [0-9]+
er_etiqueta                 "L" [0-9]+*/
er_id                       [a-zA-Z_][a-zA-Z0-9_]*
clinea						"//" [^\n']+ [\n]?
cmulti						"/*" [^*]* "*/" 
%%
{cmulti}					/* ignore comment */
{clinea}                    /* ignore comment */
"var"                           return 'var_';
"goto"                          return 'goto_';
"stack"                         return 'stack_';
/*
"begin"                         return 'begin_';
"end"                           return 'end_';
"then"                          return 'then_';
"proc"                          return 'proc_';
*/
"if"                            return 'if_';
"heap"                          return 'heap_';
"call"                          return 'call_';
"print"                         return 'print_';
"ifFalse"                       return 'ifFalse_';
"void"                          return 'void_';
"=="                            return 'igual';
"+"                             return 'mas';
"-"                             return 'menos';
"*"                             return 'por';
"/"                             return 'divis';
"%"                             return 'modu';
";"                             return 'ptocoma';
","                             return 'coma';
"="                             return 'is';
"!="                            return 'dif';
">="                            return 'mayori';
">"                             return 'mayor';
"<="                            return 'menori';
"<"                             return 'menor';
"["                             return 'cora';
"]"                             return 'corc';
"("                             return 'para';
")"                             return 'parc';
":"                             return 'dosptos';
"{"                             return 'llava';
"}"                             return 'llavc';
"\"%c\""                        return 'pc_';
"\"%e\""                        return 'pe_';
"\"%d\""                        return 'pd_';
"$$_clean_scope"                return 'limpiar';
//""                              return '';
{er_decimal}					return 'er_decimal';
{er_entero}                    	return 'er_entero';
/*{er_temp}                       return 'er_temp';
{er_etiqueta}                   return 'er_etiqueta';*/
{er_id}                       	return 'er_id';
\s+                          {/* skip whitespace */}
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
        var correlativo=-1;
        const metodo = require("../codigo/metodo.js");
        const s_asignacion = require("../codigo/s_asignacion.js");
        const s_asignaHeap = require("../codigo/s_asignaHeap.js");
        const s_asignaStack = require("../codigo/s_asignaStack.js");
        const s_clean = require("../codigo/s_clean.js");
        const s_declaracion = require("../codigo/s_declaracion.js");
        const s_etiqueta = require("../codigo/s_etiqueta.js");
        const s_if = require("../codigo/s_if.js");
        const s_iffalse = require("../codigo/s_iffalse.js");
        const s_llamada = require("../codigo/s_llamada.js");
        const s_print = require("../codigo/s_print.js");
        const s_salto = require("../codigo/s_salto.js");
        const s_salida=require("../codigo/s_salida.js");
        const v_accesoHeap = require("../codigo/v_accesoHeap.js");
        const v_accesoStack = require("../codigo/v_accesoStack.js");
        const v_division = require("../codigo/v_division.js");
        const v_id= require("../codigo/v_id.js");
        const v_modular = require("../codigo/v_modular.js");
        const v_multiplicacion = require("../codigo/v_multiplicacion.js");
        const v_negativo = require("../codigo/v_negativo.js");
        const v_numerico = require("../codigo/v_numerico.js");
        const v_resta = require("../codigo/v_resta.js");
        const v_suma = require("../codigo/v_suma.js"); 
        const raiz=  require("../codigo/raiz.js");     
        
%}


%start INICIO

%%
	
INICIO :        S ENDOFFILE
				{
					//typeof console !== 'undefined' ? console.log($1) : print($1);
					console.log("aceptada");
					return $1;
				}
				;
S               : L
                {
                    $$=new raiz($1);
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
SENT            : DECLARACION ptocoma
                {
                    $$=$1;
                }
                | ASIGNACION ptocoma
                {
                    $$=$1;
                }
                | ETI 
                {
                    $$=$1;
                }
                | SALTO ptocoma
                {
                    $$=$1;
                }
                | IF ptocoma
                {
                    $$=$1;
                }
                | LLAMADA ptocoma
                {
                    $$=$1;
                }
                | IMPRIMIR ptocoma
                {
                    $$=$1;
                }
                | CLEAN ptocoma
                {
                    $$=$1;
                }
                | llavc
                {
                     correlativo++;
                     $$=new s_salida(_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                |void_ er_id para parc llava
                {
                    correlativo++;
                    $$=new metodo($2,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                |error ptocoma
				{
					 ErrorSintactico("falta un punto y coma ",yylineno,0);
                     $$=null;									
				}
                ;
CLEAN           :limpiar para OPC coma OPC parc
                {
                    correlativo++;
                    $$=new s_clean($3,$5,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
IMPRIMIR        : print_ para OI coma OPC parc
                {
                    correlativo++;
                    $$=new s_print($3,$5,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
OI              :pc_
                {
                    $$="c";
                }
                |pd_
                {
                    $$="d";
                }
                |pe_
                {
                    $$="e";
                }
                ;
LLAMADA         :call_ er_id para parc 
                {
                    correlativo++;
                    $$=new s_llamada($2,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
IF              :if_ para OPC OPREL OPC parc goto_ er_id
                {
                    correlativo++;
                    $$=new s_if($4,$3,$5,$8,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                |ifFalse_ para OPC OPREL OPC parc goto_ er_id
                {
                    correlativo++;
                    $$=new s_iffalse($4,$3,$5,$8,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;

OPREL           :menor
                {
                    $$="<";
                }
                |mayor
                {
                    $$=">";
                }
                |menori
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
                ;
SALTO           :goto_ er_id 
                {
                    correlativo++;
                    $$=new s_salto($2,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
ETI             : er_id dosptos
                {
                    correlativo++;
                    $$=new s_etiqueta($1,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
ASIGNACION      : er_id is VALUE
                {
                    correlativo++;
                    $$=new s_asignacion($1,$3,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                | stack_ cora OPC corc is VALOR
                {
                    correlativo++;
                    $$=new s_asignaStack($3,$6,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                | heap_ cora OPC corc is VALOR
                {
                    correlativo++;
                    $$=new s_asignaHeap($3,$6,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
DECLARACION     : var_ er_id is VALUE
                {
                    correlativo++;
                    $$=new s_declaracion($2,$4,_$[1].first_line,_$[1].first_column,vari.archivo,correlativo);
                }
                ;
VALUE           :VALOR
                {
                    $$=$1;
                }
                | heap_ cora OPC corc
                {
                    $$=new v_accesoHeap($3,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                |stack_ cora OPC corc
                {
                    $$=new v_accesoStack($3,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                ;
VALOR           : OPC mas OPC
                {
                    $$=new v_suma($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo);
                }
                |OPC menos OPC
                {
                    $$=new v_resta($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo);
                }
                |OPC por OPC
                {
                    $$=new v_multiplicacion($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo);
                }
                |OPC divis OPC
                {
                    $$=new v_division($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo);
                }
                |OPC modu OPC
                {
                    $$=new v_modular($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo);
                }
                | menos OPC
                {
                    $$=new v_negativo($2,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                |OPC
                {
                    $$=$1;
                }
                ;
OPC             : er_id
                {
                    $$=new v_id($1,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                | er_entero
                {
                    $$=new v_numerico($1,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                | er_decimal
                {
                    $$=new v_numerico($1,_$[1].first_line,_$[1].first_column,vari.archivo);
                }
                ;