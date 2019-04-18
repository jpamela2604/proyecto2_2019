var contadorTemporal=0;
var contadorEtiqueta=0;
var lista=new Array();

function getTemporal()
{
    contadorTemporal=contadorTemporal+1;
    var temp="t"+contadorTemporal;
    lista.push(temp);
    return temp;
}

function getEtiqueta()
{
    contadorEtiqueta=contadorEtiqueta+1;
    return "L"+contadorEtiqueta;
}

function iniciarLista()
{
    lista=new Array();
}

function getLista()
{
    return lista;
}


module.exports.contadorTemporal = contadorTemporal;
module.exports.getTemporal = getTemporal;
module.exports.contadorEtiqueta =contadorEtiqueta;
module.exports.getEtiqueta=getEtiqueta;
module.exports.iniciarLista=iniciarLista;
module.exports.getLista=getLista;