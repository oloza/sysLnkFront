export interface Link {
	_id?: number;
  nombre?: string;
  url?: string;
  ambiente?: Ambiente;
  fecha_alta?: Date;
  fecha_modificacion?: Date;
  fecha_baja?: Date;
}

export interface AllLink {
  flagError: string,
	mensaje: string,
	data: [Link]
}


export interface SaveLink{
  nombre?: string;
  url?: string;
  ambiente?: string;
}

export interface Ambiente{
  tipo:string;
  descripcion:string;  
}