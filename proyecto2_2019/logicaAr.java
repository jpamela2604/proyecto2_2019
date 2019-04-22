public static LinkedList<Integer> heap;
   public static int h;
   public static void llenardatos()
   {
       heap=new LinkedList();
       h=0;
       heap.add(3); h++;
       heap.add(4); h++;
       heap.add(7); h++;
       heap.add(10); h++;
       heap.add(2); h++;
       heap.add(13); h++;
       heap.add(18); h++;
       heap.add(2); h++;
       heap.add(21); h++;
       heap.add(25); h++;
       heap.add(2); h++;
       heap.add(30); h++;
       heap.add(32); h++;
       heap.add(4); h++;
       heap.add(10); h++;
       heap.add(20); h++;
       heap.add(30); h++;
       heap.add(40); h++;
       heap.add(2); h++;
       heap.add(50); h++;
       heap.add(60); h++;
       heap.add(3); h++;
       heap.add(90); h++;
       heap.add(100); h++;
       heap.add(110); h++;
       heap.add(4); h++;
       heap.add(130); h++;
       heap.add(140); h++;
       heap.add(150); h++;
       heap.add(160); h++;
       heap.add(1); h++;
       heap.add(170); h++;
       heap.add(5); h++;
       heap.add(210); h++;
       heap.add(220); h++;
       heap.add(230); h++;
       heap.add(240); h++;
       heap.add(250); h++;
       
   }
   public static int getSize(int apuntador,int dimension)
   {
       if(dimension==1)
       {
           return heap.get(apuntador);
       }else
       {
           int respuesta=0;
           int ff=heap.get(apuntador);
           
           for(int i=0;i<ff;i++)
           {
               int w=i+1+apuntador;
               respuesta=respuesta+getSize(heap.get(w),dimension-1);
           }
           return respuesta;
       }
   }
   public static void getForEach(int apuntador,int dimension)
   {
       if(dimension==1)
       {
           int f= heap.get(apuntador);
           for (int i=0;i<f;i++)
           {
               int p=apuntador+i+1;
               heap.add(heap.get(p)); h++;
           }
       }else
       {
           int ff=heap.get(apuntador);
           
           for(int i=0;i<ff;i++)
           {
               int w=i+1+apuntador;
               getForEach(heap.get(w),dimension-1);
           }
       }
   }
   
    public static void main(String[] args) {
         //new Ventana().setVisible(true);
         llenardatos();
         int ar[][][]={{{10,20,30,40},{50,60}},{{90,100,110},{130,140,150,160}},{{170},{210,220,230,240,250}}};	
         
        System.out.println(getSize(0,3));
        System.out.println(h);
        String pal="|";
        for(int v:heap)
        {
           pal=pal+v+"|";
        }       
        System.out.println(pal);
        getForEach(0,3);
        pal="|";
        for(int v:heap)
        {
           pal=pal+v+"|";
        }       
        System.out.println(pal);
        System.out.println(h);
    }
    }

//*******************************getsize()************** */
void getSize(){
		tx1=p+1;
		tx2=stack[tx1];//apuntador
		tx3=p+2;
		tx4=stack[tx3];//dimension
	if(tx4!=1) goto lx1;
		tx5=heap[tx2];
		stack[p]=tx5;
		goto lx0;//fin de metodo
	lx1://else
		tx6=0;//res
		tx7=heap[tx2];//ff
		tx8=0;//i
		lx2://inicio
			if(tx8>=tx7) goto lx3;//salida del for
			tx9=tx8+tx2;//i+apuntador
			tx10=1+tx9;//w
			tx11=heap[tx10];//para1
			tx12=tx4-1;//para2
			//guardar temporales
			ta=p+3;
			stack[ta]=tx1;
			ta=p+4;
			stack[ta]=tx2;
			ta=p+5;
			stack[ta]=tx3;
			ta=p+6;
			stack[ta]=tx4;
			ta=p+7;
			stack[ta]=tx5;
			ta=p+8;
			stack[ta]=tx6;
			ta=p+9;
			stack[ta]=tx7;
			ta=p+10;
			stack[ta]=tx8;
			ta=p+11;
			stack[ta]=tx9;
			ta=p+12;
			stack[ta]=tx10;
			ta=p+13;
			stack[ta]=tx11;
			ta=p+14;
			stack[ta]=tx12;
			//fin de guardar temporales
			tx13=p+15;//cambio de ambito simulado
			tx14=tx13+1;//pos para1
			stack[tx14]=tx11;
			tx15=tx13+2;//pos para2
			stack[tx15]=tx12;
			p=p+15;//cambio real
			call getSize();
			tx16=stack[p];//retorno
			p=p-15;//regreso real
			//sacar temporales
			ta=p+3;
			tx1=stack[ta];
			ta=p+4;
			tx2=stack[ta];	
			ta=p+5;
			tx3=stack[ta];
			ta=p+6;
			tx4=stack[ta];
			ta=p+7;
			tx5=stack[ta];
			ta=p+8;
			tx6=stack[ta];
			ta=p+9;
			tx7=stack[ta];
			ta=p+10;
			tx8=stack[ta];
			ta=p+11;
			tx9=stack[ta];
			ta=p+12;
			tx10=stack[ta];
			ta=p+13;
			tx11=stack[ta];
			ta=p+14;
			tx12=stack[ta];
			//terminar de sacar
			tx17=tx6+tx16;//res+retorno
			tx6=tx17;//respuesta=respuesa+retorno;
			tx8=tx8+1;
			goto lx2;
		lx3:
			stack[p]=tx6;
	lx0:
}
/*******************************getforeach***************************** */


	void getForEach()
	{
			tx1=p+1;
			tx2=stack[tx1];//apuntador
			tx3=p+2;
			tx4=stack[tx3];//dimension
			if(tx4==1) goto lx1;//else
				tx5=heap[tx2];//ff
				tx6=0;//i
				lx2://inicio for1
				if(tx6>=tx5) goto lx3; salida for
				tx7=tx6+tx2;//i+apuntador
				tx8=tx7+1;//w
				tx9=heap[tx8];//param1
				tx10=tx4-1;//param2
				//guardar temporales
				ta=p+3;
				stack[ta]=tx1;
				ta=p+4;
				stack[ta]=tx2;
				ta=p+5;
				stack[ta]=tx3;
				ta=p+6;
				stack[ta]=tx4;
				ta=p+7;
				stack[ta]=tx5;
				ta=p+8;
				stack[ta]=tx6;
				ta=p+9;
				stack[ta]=tx7;
				ta=p+10;
				stack[ta]=tx8;
				ta=p+11;
				stack[ta]=tx9;
				ta=p+12;
				stack[ta]=tx10;
				tx11=p+13;//cambio de ambito simulado
				tx12=tx11+1;//pos para1
				stack[tx12]=tx9;
				tx13=tx11+2;//pos para2
				stack[tx13]=tx10;
				p=p+13;//cambio real
				call getSize();
				p=p-13;//regreso
				//sacar temporales
				ta=p+3;
				tx1=stack[ta];
				ta=p+4;
				tx2=stack[ta];	
				ta=p+5;
				tx3=stack[ta];
				ta=p+6;
				tx4=stack[ta];
				ta=p+7;
				tx5=stack[ta];
				ta=p+8;
				tx6=stack[ta];
				ta=p+9;
				tx7=stack[ta];
				ta=p+10;
				tx8=stack[ta];
				ta=p+11;
				tx9=stack[ta];
				ta=p+12;
				tx10=stack[ta];
				tx6=tx6+1;
				goto lx2;
			lx3://salida del
				goto lx0;
			lx1://else
				tx14=heap[tx2];//f 
				tx15=0;//i
				lx4://inicio del for2
				if(tx15>=tx14) goto lx5;//salida del for2
				tx16=tx2+tx15;//apuntador+i
				tx17=tx16+1;//p
				tx18=heap[tx17];//heap[p];
				heap[h]=tx18;
				h=h+1;
				tx15=tx15+1;
				goto lx4;
				lx5:
			lx0:
	}







	/******************		inicializar arreglo	********* */

	public static int initArray(int aux,int arr,int dimension,int valorDefecto)
	{
		//System.out.println(dimension);
		int y=h;
		int t1=arr+aux;
		int tam=heap.get(t1);
		heap.add(tam);
		h++;
		if(dimension!=1)
		{
			int inicio=h;
			for(int i=0;i<tam;i++)
			{
				heap.add(0);
				h++;
			}
			for(int i=0;i<tam;i++)
			{
				heap.set(inicio+i, initArray(aux+1,arr,dimension-1,valorDefecto));
			}  
		}else
		{                     
			for(int i=0;i<tam;i++)
			{
				heap.add(valorDefecto);
				h++;
			} 
		}
		return y;
	}
		public static void main(String[] args) {
			//new Ventana().setVisible(true);
			heap=new LinkedList();
			h=0;
			int pun=h;
			heap.add(3);
			h++;
			heap.add(2);
			h++;
			heap.add(4);
			h++;
			int miar=initArray(0,pun,3,999);
			System.out.println(" posicion "+miar);
			String pal="|";
			int posic=0;
			for(int v:heap)
			{
			pal=pal+posic+","+v+"|";
			posic++;
			}       
			System.out.println(pal);




	void initArray(){
		stack[p]=h;
		tx1=p+1;
		tx2=stack[tx1];//aux
		tx1=p+2;
		tx3=stack[tx1];//arr
		tx1=p+3;
		tx4=stack[tx1];//dimension
		tx1=p+4;
		tx5=stack[tx1];//defecto
		tx6=tx3+tx2;//arr+aux
		tx7=heap[tx6];//tam
		heap[h]=tx7;
		h=h+1;
		if(tx4==1) goto Lx1;//al else
		tx8=h;//inicio
		tx9=0;//i
		Lx2://inicio for 1
		if(tx9>=tx7) goto Lx3;//salida for 1
		h=h+1;
		tx9=tx9+1;
		goto Lx2;
		Lx3:
		tx9=0;//i
		Lx4://inicio for2
		if(tx9>=tx7) goto Lx5;//salida for 2
		tx10=tx2+1;//param1
		tx11=tx4-1;//param3
		
		//guardar temporales
		ta=p+5;
		stack[ta]=tx1;
		ta=p+6;
		stack[ta]=tx2;
		ta=p+7;
		stack[ta]=tx3;
		ta=p+8;
		stack[ta]=tx4;
		ta=p+9;
		stack[ta]=tx5;
		ta=p+10;
		stack[ta]=tx6;
		ta=p+11;
		stack[ta]=tx7;
		ta=p+12;
		stack[ta]=tx8;
		ta=p+13;
		stack[ta]=tx9;
		ta=p+14;
		stack[ta]=tx10;
		ta=p+15;
		stack[ta]=tx11;
		
		//llamada
		tx12=p+16 ;//cambio simulado
		tx13=tx12+1;
		stack[tx13]=tx10;
		tx14=tx12+2;
		stack[tx14]=tx3;
		tx15=tx12+3;
		stack[tx15]=tx11;
		tx16=tx12+4;
		stack[tx16]=tx5;
		p=p+ 16;
		call initArray();
		tx17=stack[p];//valor
		p=p- 16;	
		// regresar temporales
		ta=p+5;
		tx1=stack[ta];
		ta=p+6;
		tx2=stack[ta];
		ta=p+7;
		tx3=stack[ta];
		ta=p+8;
		tx4=stack[ta];
		ta=p+9;
		tx5=stack[ta];
		ta=p+10;
		tx6=stack[ta];
		ta=p+11;
		tx7=stack[ta];
		ta=p+12;
		tx8=stack[ta];
		ta=p+13;
		tx9=stack[ta];
		ta=p+14;
		tx10=stack[ta];
		ta=p+15;
		tx11=stack[ta];	
		
		tx18=tx8+tx9;//inicio+i
		heap[tx18]=tx17;
		tx9=tx9+1;
		goto Lx4;
		Lx5:
		goto Lx0;
		Lx1://else
			tx19=0;//i
			Lx6://inicio for 3
			if(tx19>=tx7) goto Lx7;//salida del for3
			heap[h]=tx5;
			h=h+1;
			tx19=tx19+1;
			goto Lx6;
		Lx7:
		Lx0;	
		
	}