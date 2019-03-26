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
";"								return 'ptocoma';
"+"								return 'mas';
"-"								return 'menos';
"*"								return 'por';
"/"								return 'divis';
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
        const vari = require("../../var.js");

%}

%left mas menos
%left por divis

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
SENT            : E ptocoma
                {
                    $$=$1;
                }
                ;
E               : E mas E
                {
                    vari.hash++;
                    $$=new oa_suma($1,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | E menos E
                {
                    vari.hash++;
                    $$=new oa_resta($1,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | E por E
                {
                    vari.hash++;
                    $$=new oa_multi($1,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | E divis E
                {
                    vari.hash++;
                    $$=new oa_division($1,$3,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                | PRIM
                {
                    $$=$1;
                }
                ;
PRIM            : er_cadena
                {
                    vari.hash++;
                    $$=new o_valorPuntual(yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_caracter
                {
                    vari.hash++;
                    $$=new o_valorPuntual(yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_entero
                {
                    vari.hash++;
                    $$=new o_valorPuntual(yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);
                }
                |er_decimal
                {
                    vari.hash++;
                    $$=new o_valorPuntual(yytext,_$[1].first_line,_$[1].first_column,vari.archivo,vari.hash);

                }
                ;

