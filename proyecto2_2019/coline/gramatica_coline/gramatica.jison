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
"+"								return 'mas';
"-"								return 'menos';
"*"								return 'por';
"/"								return 'divis';
"%"                             return 'modu';
"("                             return 'para';
")"                             return 'parc';
","                             return 'coma';
"pow"                           return 'potencia';
"^"                             return 'xor_';
"&&"                            return 'and_';
"||"                            return 'or_';
"!"                             return 'not_';
"true"                          return 'verdadero';
"false"                         return 'falso';
"print"                         return 'print_';
"println"                       return 'println_';
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
                |S_IF
                {
                    $$=$1;
                }
                ;
S_IF            :BS_IF else llava L llavc
                {

                }
                |BS_IF else llava  llavc
                {

                }
                |BS_IF
                {

                }
                ;
BS_IF           :BS_IF SINO
                {

                }
                |SI
                {

                }
                ;
SI              : if_  para COND parc llava llavc
                {

                }
                |if_  para COND parc llava L llavc
                {

                }
                ;
SINO            : else_ if_ para COND parc llava llavc
                {

                }
                | else_ if_ para COND parc llava L llavc
                {

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
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_cadena,yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_caracter
                {
                    vari.hash++;
                    $$=new o_valorPuntual(tablaTipos.tipo_caracter,yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
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

