//variables
var Trama;//cadena con los datos a enciar  que se quiere enviar//
var TramaCodificada;
var TramaCodificadaConRellenoDeBitConBanderas;
var TramaCodificadaConRellenoDeBit;

//----main()------//

//trama de ejemplo //
Trama="1111110101011111110"; // se tabaja la trama como cadena

console.log(Trama);
TramaCodificada=CRC16(Trama);//CRC16  recibe un cadena  
console.log(TramaCodificada.join(""));
TramaCodificadaConRellenoDeBit=RellenoDeBit(TramaCodificada)
console.log(TramaCodificadaConRellenoDeBit.join(""));
TramaCodificadaConRellenoDeBitConBanderas =  ColocarBanderas(TramaCodificadaConRellenoDeBit);
console.log(TramaCodificadaConRellenoDeBitConBanderas);






//Declaracion de la funciones //

function RellenoDeBit(TramaCodificadaConBanderas)//recibe como parametro un Array//
{
	var i=0;
	var j=0;

	while(i<TramaCodificadaConBanderas.length)
	{
			if(TramaCodificadaConBanderas[i] == 1)
			{
				j++;
			}
			if(TramaCodificadaConBanderas[i] == 0)
			{
				j=0;
			}

			if(j==5)
			{
				
				TramaCodificadaConBanderas.splice(i+1, 0,0);
				i++;
				j=0;
			}	

		i++;
	}
		return(TramaCodificadaConBanderas);
}//retorna una cadena//

//recibe como parametro un Array//
function ColocarBanderas(Trama) {
	Trama.unshift(0);
	Trama.unshift(1);
	Trama.unshift(1);
	Trama.unshift(1);
	Trama.unshift(1);
	Trama.unshift(1);
	Trama.unshift(1);
	Trama.unshift(0);
	Trama.push(0);
	Trama.push(1);
	Trama.push(1);
	Trama.push(1);
	Trama.push(1);
	Trama.push(1);
	Trama.push(1);
	Trama.push(0);
	return(Trama.join(""));
}

function SumaDeVerificacion(Trama)//recibe como parametro un Array//
{
	var divisor=[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1];
	var tamcadena=Trama.length;
	var resto = new Array();
	var Trama;
	var tamDivisos=divisor.length-1;
	var i=divisor.length;
	
	for(j=0;j<tamDivisos;j++)
	{
		Trama .push(0);
	}
	
	for(j=0;j<=tamDivisos;j++)
	{
		resto .push(verificar( Trama[j], divisor[j]));
	}

	while( i< Trama.length  )
	{
			
		if(resto [0] == 0)
		{
				var primero = resto .shift();
		}

		if (Trama.length != i-1)
		{
				resto .push(Trama[i])
		}
			
		var n=Contar(resto);
		
		j=0;

		while(j <= 16 && n == 17)
		{
					resto [j]=verificar( resto [j], divisor[j]);
					j++;
		}	
				i++;
	}
	return(resto);
}//retorna un Array//

function CRC16(Trama)//recibe como parametro una cadena //
{
	var divisor=[1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1];// polinomio de grado 16
	var tamcadena=Trama.length;
	var resto = new Array()
	var Trama=Trama.split("");
	var tamDivisos=divisor.length-1;
	var i=divisor.length;
	
	for(j=0;j<tamDivisos;j++)
	{
		Trama .push(0);
	}

	for(j=0;j<=tamDivisos;j++)
	{
		resto .push(verificar( Trama[j], divisor[j]));
	}

	while( i< Trama.length  )
	{	
		if(resto [0] == 0)
		{
				var primero = resto .shift();
		}

	
		if (Trama.length != i-1)
		{
				resto .push(Trama[i])
		}
			
		var n=Contar(resto);
		
		j=0;

		while(j <= 16 && n == 17)
		{
					resto [j]=verificar( resto [j], divisor[j]);
					j++;
		}
				i++;
	}

	var k=0; 

	if(resto [0]== 0 && 16<resto.length )
	{
		k++;
	}
	
	for(j=k;j<=tamDivisos;j++)
	{
		Trama[tamcadena]=resto [j];
		tamcadena++;
	}
		return (Trama);
}//retorna un Array//


function verificar( bit_1, bit_2 ) {

	if(bit_1=='1' && bit_2=='1' )
	{

			return(0);

	}

	if(bit_1 == '0' && bit_2== '1' )
	{

			return(1);

	}if(bit_1=='1' && bit_2=='0' )
	{

			return(1);

	}if(bit_1=='0' && bit_2=='0' )
	{

			return(0);

	}

}


function Contar(cadena)//recibe como parametro un Array//
{
	var bandera=0;
	var i=0;
	var j=0;
	while(i <= cadena.length  )
	{
			if(cadena[i] == '1'  )
			{
				bandera=1;
			}

			if(bandera == 1)
			{
				j++;
			}
			i++;		
	}

		return j-1;
}



/**/

