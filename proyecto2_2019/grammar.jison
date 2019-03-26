%lex
%options case-insensitive
er_entero                   [0-9]+
er_decimal					[0-9]+ [.] [""|0-9]+
er_cadena					[\"]([^\"])*[\"]
er_caracter					[\'] ([a-zA-Z]|"\0"|"\n"|"\t"|"\r"|"\f")[\']
er_id                       ([a-zA-Z]|"_")[a-zA-Z0-9_]*
clinea						"//" [^\n']+ [\n]?
cmulti						"/*" [^*]* "*/" 
%%
{cmulti}					/* ignore comment */
{clinea}                    /* ignore comment */
"abstract"						return 'abstracto';
"boolean"						return 'booleano';
"break"							return 'romper';
"case"							return 'caso';
"catch"							return 'atrapar';
"char"							return 'caracter';
"class"							return 'clase';
"continue"						return 'continuar';
"default"						return 'defecto';
"do"							return 'hacer';
"double"						return 'dooble';
"else"							return 'sino';
"extends"						return 'extiende';
"final"							return 'final_';
"for"							return 'para';
"graph_dot"						return 'graph';
"if"							return 'si';
"import"						return 'importar';
"instanceof"					return 'instancia';
"int"							return 'entero';
"message"						return 'mensaje';
"new"							return 'nuevo';
"Object"						return 'objecto';
"pow"							return 'pote';
"println"						return 'println';
"private"						return 'privado';
"protected"						return 'protegido';
"public"						return 'publico';
"return"						return 'returnar';
"read_console"					return 'leer_consola';
"read_file"						return 'leer_archivo';
"static"						return 'estatico';
"str"							return 'str';
"String"						return 'cadena';
"super"							return 'super';
"switch"						return 'selecciona';
"this"							return 'este';
"toChar"						return 'acar';
"toDouble"						return 'adec';
"toInt"							return 'aint';
"try"							return 'intentar';
"while"							return 'mientras';
"write_file"					return 'escribir_arch';
"null"							return 'nulo';
"true"							return 'verdadero';
"false"							return 'falso';
"+"								return 'mas';
"%"								return 'modu';
"!="							return 'dif';
"<="							return 'menori';
"&&"							return 'and_';
"-"								return 'menos';
"++"							return 'incr'; 
"=="							return 'igual';
"<"								return 'menor';
"||"							return 'or_';
"*"								return 'por';
"--"							return 'decr';
">="							return 'mayori';
"?"								return 'ques';
"^"								return 'xor_';
"/"								return 'divis';
"="								return 'is';
">"								return 'mayor';
":"								return 'dosptos';
"!"								return 'adm';
"("								return 'para';
";"								return 'ptocoma';
")"								return 'parc';
"{"								return 'llava';
"}"								return 'llavc';
"["								return 'cora';
"]"								return 'corc';
""								return '';
{er_decimal}					return 'er_decimal';
{er_entero}                    	return 'er_entero';
{er_cadena}						return 'er_cadena';
{er_caracter}					return 'er_cadena';
{er_id}                       	return 'er_id';
\s+                          /* skip whitespace */
\n+
\r+
\t+
\f+
"."                         ErrorLexico(yytext,yylineno,yylloc.first_column); 
<<EOF>>                     return 'ENDOFFILE';
%{


%}
%left mas menos
%left por divis
%right pote 
%left incr decr
%left uminus
//%left  PARA PARC
%left or_
%left and_
%left xor_
%right not_
%right er_id
%right nulo
%left menor igual menori mayor mayori dif


%start INICIO

%%
INICIO		:	S ENDOFFILE
            {

            }
            ;
MODIFICAS   : MODIFICAS MODIFICA
            {

            }
            |MODIFICA
            {

            }
            ;
MODIFICA    :publico   
            {

            } 
            |protegido
            {

            }
            |privado
            {

            }
            |abstracto
            {

            }
            |estatico
            {

            }
            |final_
            {

            }
            ;
CLASES_     :CLASES_ CLASE_
            {

            }
            CLASE_
            {

            }
            ;
CLASE_      : MODIFICAS  clase er_id llava LSENT llavc
            {

            }
            | MODIFICAS  clase er_id llava  llavc
            {

            }
            |clase er_id llava LSENT llavc
            {

            }
            |clase er_id llava  llavc
            {

            }  
            ;
CL_EXT      :MODIFICAS  clase er_id extiende er_id llava LSENT llavc
            {

            }
            | MODIFICAS  clase er_id extiende er_id llava  llavc
            {

            }
            |clase er_id extiende er_id llava LSENT llavc
            {

            }
            |clase er_id extiende er_id llava  llavc
            {

            }  
            ;
LSENT       :LSENT SENT
            {

            }
            |SENT
            {

            }
            ;
TIPOS       :entero
            {

            }
            |dooble
            {

            }
            |cadena
            {

            }
            |caracter
            {

            }
            |booleano
            {
                
            }
            ;