var contadorTemporal=0;
var contadorEtiqueta=0;


function getTemporal()
{
    contadorTemporal=contadorTemporal+1;
    return "t"+contadorTemporal;
}

function getEtiqueta()
{
    contadorEtiqueta=contadorEtiqueta+1;
    return "L"+contadorEtiqueta;
}



module.exports.contadorTemporal = contadorTemporal;
module.exports.getTemporal = getTemporal;
module.exports.contadorEtiqueta =contadorEtiqueta;
module.exports.getEtiqueta=getEtiqueta;