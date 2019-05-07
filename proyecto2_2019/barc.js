const hashtable=require("./hashtable");

var mi=new hashtable();

mi.setItem(1,"a");
mi.setItem(2,"B");
mi.setItem(3,"c");

mi.each(function(indice,valor)
{
   console.log(indice+","+valor);
}

);