//var nodoArbol =  require("./nodoArbol.js");

function Generar(nodoArbol,cadena)
{
    if(nodoArbol==undefined) return cadena;
    var p = nodoArbol.nombre.replace("\"","");
    var s = nodoArbol.hash;
    cadena = cadena +"nodo"+s+"[label=\""+ nodoArbol.nombre+" \", fillcolor=\"orange\", style =\"filled\", shape=\"circle\"]; \n";
    if(nodoArbol.hijos.length>0){
		var cont=0;
		for(cont=0;cont<nodoArbol.hijos.length;cont++){
			cadena=cadena+Generar(nodoArbol.hijos[cont],"");
			//console.log("ash "+s);
			cadena = cadena + "\"nodo" + s + "\"-> \"nodo" +nodoArbol.hijos[cont].hash + "\" \n";
		}
    }
    return cadena;
}

function GenerarArbol(raiz)
{
    var fs = require('fs');
    var g ="";     
    g="digraph lista{ rankdir=TB;node [shape = box, style=rounded]; ";
	//nodoArbol.Generar(raiz,cadena);
	g=g+Generar(raiz,"");
	g=g+"}";
    fs.writeFile("a.txt", g, function(err) {
    if(err) {
        return console.log(err);
    }
});
}

module.exports.GenerarArbol=GenerarArbol;