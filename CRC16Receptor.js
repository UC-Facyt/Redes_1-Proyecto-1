var Trama;
var TramaCodificada;
var TramaCodificadaConBanderas;
var TramaCodificadaConBanderasConBit="0111110101111101010101111101100111010000111000011111010";//Trama  codificada de ejemplo //

console.log(TramaCodificadaConBanderasConBit);
TramaCodificadaConBanderas=QuitarBitDeRelleno(TramaCodificadaConBanderasConBit);
console.log(TramaCodificadaConBanderas.join(""));
TramaCodificada=QuitarBanderas(TramaCodificadaConBanderas);
console.log(TramaCodificada.join(""));
Trama=QuitarCRC16(TramaCodificada);
console.log(Trama);



function QuitarBitDeRelleno(TramaCodificadaConBanderasConBit)//recibe como parametro un Array//
{
	var i=0;
	var j=0;
	TramaCodificadaConBanderasConBit=TramaCodificadaConBanderasConBit.split("");
	while(i<TramaCodificadaConBanderasConBit.length)
	{
			if(TramaCodificadaConBanderasConBit[i] == 1)
			{
				j++;
			}
			if(TramaCodificadaConBanderasConBit[i] == 0)
			{
				j=0;
			}

			if(j==5)
			{
				
				TramaCodificadaConBanderasConBit.splice(i+1,1);
				i--;
				j=0;
			}	

		i++;
	}
		return(TramaCodificadaConBanderasConBit);

}//retorna un Array//

function verificarBandera(Array, i)
{
	j=0;
	
	if(Array[i] == 0 && Array[i+1] == 1 && Array[i+2]==1 && Array[i+3]==1 && Array[i+4]==1 && Array[i+5]==1 && Array[i+6]==1 && Array[i+7]==0)
	{
			j=1;
	}
		return(j);
}



function QuitarBanderas(TramaCodificadaConBanderas)//recibe como parametro un Array//
{
	var i=0;
	var j;
	var k;
	while(i<= TramaCodificadaConBanderas.length-8)
	{

		
		if(verificarBandera(TramaCodificadaConBanderas, i) ==1)
		{
			k=0;
			
			while(k < 8)
			{

				var eliminado=TramaCodificadaConBanderas.splice(i,1);
				k++;
			}
			i--;
			
		}

	i++;
	}

	return(TramaCodificadaConBanderas)
}//retorna un Array//

function QuitarCRC16(TramaCodificada)//recibe como parametro un Array//
{
	var eliminar;
	var i=0;
	while(i < 16)
	{

		eliminar=TramaCodificada.pop();

		i++;
	}


	return(TramaCodificada.join(""));
}//recibe como parametro una cadena//
