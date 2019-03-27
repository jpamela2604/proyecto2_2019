var dibujar =require("./coline/dibujar.js");
var nodoArbol =require("./coline/nodoArbol.js");


var raiz=new nodoArbol("E",1);
var hijo=new nodoArbol("5",2);
hijo.agregarHijo(new nodoArbol("hola",5));
hijo.agregarHijo(new nodoArbol("adi9s",6));
raiz.agregarHijo(hijo);
raiz.agregarHijo(new nodoArbol("+",3));
raiz.agregarHijo(new nodoArbol("9",4));


dibujar.GenerarArbol(raiz);