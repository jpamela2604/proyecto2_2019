%lex
%options case-insensitive
er_entero                   [0-9]+
er_decimal					{er_entero} [.] {er_entero}
er_cadena					[\"]([^\"])*[\"]
er_caracter					[\'] ([a-zA-Z]|"\0"|"\n"|"\t"|"\r"|"\f")[\']
er_id                       [a-zA-Z][a-zA-Z0-9_]*
clinea						"//" [^\n']+ [\n]?
cmulti						"/*" [^*]* "*/" 
%%
{cmulti}					/* ignore comment */
{clinea}                    /* ignore comment */
">"								return 'mayor';
">="							return 'mayori';
"<"								return 'menor';
"<="							return 'menori';
"=="							return 'igual';
"!="							return 'dif';
";"								return 'ptocoma';
":"                             return 'dosptos';
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
"="                             return 'is';
//""                            return '';
"public"                        return 'publico_';
"protected"                     return 'protegido_';
"private"                       return 'privado_';
"static"                        return 'estatico_';
"final"                         return 'ffinal_';
{er_decimal}					return 'er_decimal';
{er_entero}                    	return 'er_entero';
{er_cadena}						return 'er_cadena';
{er_caracter}					return 'er_caracter';
{er_id}                       	return 'er_id';
\s+                          /* skip whitespace */
\n+
\r+
\t+
\f+
"."                         console.log("error lexico");
<<EOF>>                     return 'ENDOFFILE';
/lex
%{
        const oa_suma = require("../compilador/oa_suma.js");
        const oa_multi = require("../compilador/oa_multi.js");
        const oa_resta = require("../compilador/oa_resta.js");
        const oa_division = require("../compilador/oa_division.js");
        const o_valorPuntual= require("../compilador/o_valorPuntual.js");
        const oa_modular = require("../compilador/oa_modular.js");
        const oa_potencia = require("../compilador/oa_potencia.js");
        const oa_negativo = require("../compilador/oa_negativo.js");
        const or_relacional = require("../compilador/or_relacional.js");
        const ol_and=require("../compilador/ol_and.js");
        const ol_not=require("../compilador/ol_not.js");
        const ol_or=require("../compilador/ol_or.js");
        const ol_xor=require("../compilador/ol_xor.js");
        const s_print=require("../compilador/s_print.js");
        const s_println=require("../compilador/s_println.js");
        const s_if=require("../compilador/s_if.js");
        const s_bloque=require("../compilador/s_bloque.js");
        const s_while=require("../compilador/s_while.js");
        const s_do_while=require("../compilador/s_do_while.js");
        const s_retorno=require("../compilador/s_retorno.js");
        const s_retornoEmpty=require("../compilador/s_retornoEmpty.js");
        const s_break=require("../compilador/s_break.js");
        const s_continue=require("../compilador/s_continue.js");
        const s_switch=require("../compilador/s_switch.js");
        const s_decla=require("../compilador/s_decla.js");
        const s_declaracion=require("../compilador/s_declaracion.js");
        const caso=require("../compilador/caso.js");
        const vari = require("../../var.js");
        const tablaTipos = require("../tablaTipos.js");
%}

%left mas menos
%left por divis modu
%left potenciacion 
%left uminus
%left menor menori mayor mayori igual dif
%left or_
%left and_
%left xor_
%right not_
%start INICIO

%%
	
INICIO		    :	S ENDOFFILE
				{
					//typeof console !== 'undefined' ? console.log($1) : print($1);
					console.log("aceptada");
					return $1;
				}
				;

S               : L
                {
                    $$=$1;
                }
                ;
L               : L SENT
                {
                    $$=$1;
                    $$.push($2);
                }
                |SENT
                {
                    $$=new Array();
                    $$.push($1);
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
                ;
DECLARACION     : MODSCAMPO TIPO LDEC
                {
                    vari.hash++;
                    $$=new s_declaracion($1,$2,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |TIPO LDEC
                {
                    vari.hash++;
                    $$=new s_declaracion(new Array(),$1,$2,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
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

DEC             :er_id is INICIALIZA 
                {
                    vari.hash++;
                    $$=new s_decla($1,0,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_id 
                {
                    vari.hash++;
                    $$=new s_decla($1,0,null,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |ARRID is INICIALIZA
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
                |er_id cora corc
                {
                    vari.hash++;
                    $$=new s_decla($1,1,null,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
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
                ;
S_SW            :switch_ para COND parc llava LCASOS llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,$6,null,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |switch_ para COND parc llava LCASOS DEFECTO llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,$6,$7,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |switch_ para COND parc llava DEFECTO llavc
                {
                    vari.hash++;
                    $$=new s_switch($3,new Array(),$6,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ; 
DEFECTO         : default_ dosptos
                {
                    vari.hash++;
                    $$=new caso(null,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |default_ dosptos llava L llavc
                {
                    vari.hash++;
                    $$=new caso(null,$4,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |default_ dosptos llava  llavc
                {
                    vari.hash++;
                    $$=new caso(null,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
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
                    $$=new caso($2,$5,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | case_ COND dosptos llava   llavc
                {
                    vari.hash++;
                    $$=new caso($2,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |case_ COND dosptos
                {
                    vari.hash++;
                    $$=new caso($2,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;

S_BREAK         : break_
                {
                    vari.hash++;
                    $$=new s_break(_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
S_CON           : continue_
                {
                    vari.hash++;
                    $$=new s_continue(_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
S_RETORNO       : return_ COND
                {
                    vari.hash++;
                    $$=new s_retorno($2,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |return_
                {
                    vari.hash++;
                    $$=new s_retornoEmpty(_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
S_DO            :dow llava L llavc while_ para COND parc
                {
                    vari.hash++;
                    $$=new s_do_while($7,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |dow llava  llavc while_ para COND parc
                {
                    vari.hash++;
                    $$=new s_do_while($6,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
S_WHILE         : while_ para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_while($3,$6,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |while_ para COND parc llava  llavc
                {
                    vari.hash++;
                    $$=new s_while($3,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
S_IF            :BS_IF else_ llava L llavc
                {
                    vari.hash++;
                    var bloque=new s_bloque(null,$4,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                    $1.push(bloque);
                    vari.hash++;
                    $$=new s_if($1,vari.hash);
                }
                |BS_IF else_ llava  llavc
                {
                    vari.hash++;
                    var bloque=new s_bloque(null,new Array(),_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
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
                    $$=new s_bloque($3,$7,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |if_  para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_bloque($3,$6,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
SINO            : else_ if_ para COND parc llava llavc
                {
                    vari.hash++;
                    $$=new s_bloque($4,new Array(),_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | else_ if_ para COND parc llava L llavc
                {
                    vari.hash++;
                    $$=new s_bloque($4,$7,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
IMPRIMIR        : print_ para COND parc
                {
                    vari.hash++;
                    $$=new s_print($3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | println_ para COND parc
                {
                    vari.hash++;
                    $$=new s_println($3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;
COND            : COND and_ COND
                {
                    vari.hash++;
                    $$=new ol_and($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | COND or_ COND
                {
                    vari.hash++;
                    $$=new ol_or($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | COND xor_ COND
                {
                    vari.hash++;
                    $$=new ol_xor($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                |not_ COND
                {
                    vari.hash++;
                    $$=new ol_not($2,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |REL
                {
                    $$=$1;
                }
                ;
REL             : E OPREL E
                {
                    vari.hash++;
                    $$=new or_relacional($2,$1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | E 
                {
                    $$=$1;
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
E               : E mas E
                {
                    vari.hash++;
                    $$=new oa_suma($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | E menos E
                {
                    vari.hash++;
                    $$=new oa_resta($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | E por E
                {
                    vari.hash++;
                    $$=new oa_multi($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | E divis E
                {
                    vari.hash++;
                    $$=new oa_division($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | E modu E 
                {
                    vari.hash++;
                    $$=new oa_modular($1,$3,_$[2].first_line,_$[2].first_column,vari.archivo,vari.hash);
                }
                | potencia para E coma E parc %prec potenciacion
                {
                    vari.hash++;
                    $$=new oa_modular($3,$5,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |menos E %prec uminus
                {
                    vari.hash++;
                    $$=new oa_negativo($2,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | para COND parc
                {
                    $$=$2;
                }
                | PRIM
                {
                    $$=$1;
                }
                ;
PRIM            : er_cadena
                {
                    var a=yytext+"";
                    a=a.substring(1,a.length-1);
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_cadena,a,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
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
                    $$=new o_valorPuntual(tablaTipos.tipo_caracter,a,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_entero
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_entero,yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_decimal
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_doble,yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |verdadero
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_booleano,1,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |falso
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_booleano,0,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                ;

