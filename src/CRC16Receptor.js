var Trama;
var TramaCodificada;
var TramaCodificadaConRellenoDebit;
var TramaCodificadaConBanderasConBit="01111110111110101010111110110011101000011100001111110";//Trama  codificada de ejemplo //

console.log(TramaCodificadaConBanderasConBit);
TramaCodificadaConRellenoDebit=QuitarBanderas(TramaCodificadaConBanderasConBit);
console.log(TramaCodificadaConRellenoDebit.join(""));
TramaCodificada=QuitarBitDeRelleno(TramaCodificadaConRellenoDebit);
console.log(TramaCodificada.join(""));
Trama=QuitarCRC16(TramaCodificada);
console.log(Trama);

/*
function QuitarBitDeRelleno(TramaCodificadaConRellenoDebit)//recibe como parametro un Array//
{
	var i=0;
	var j=0;
	
	while(i<TramaCodificadaConRellenoDebit.length)
	{
			if(TramaCodificadaConRellenoDebit[i] == 1)
			{
				j++;
			}
			if(TramaCodificadaConRellenoDebit[i] == 0)
			{
				j=0;
			}

			if(j==5)
			{
				
				TramaCodificadaConRellenoDebit.splice(i+1,1);
				i--;
				j=0;
			}	

		i++;
	}
		return(TramaCodificadaConRellenoDebit);

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



function QuitarBanderas(TramaCodificadaConBanderasConBit)//recibe como parametro una cadena//
{
	var i=0;
	var j;
	var k;
	TramaCodificadaConBanderasConBit=TramaCodificadaConBanderasConBit.split("");
	while(i<= TramaCodificadaConBanderasConBit.length-8)
	{

		
		if(verificarBandera(TramaCodificadaConBanderasConBit, i) ==1)
		{
			k=0;
			
			while(k < 8)
			{

				var eliminado=TramaCodificadaConBanderasConBit.splice(i,1);
				k++;
			}
			i--;
			
		}

	i++;
	}

	return(TramaCodificadaConBanderasConBit)
}//retorna un Array//
*/
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
}

