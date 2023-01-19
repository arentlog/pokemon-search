export interface PokeAPIResponse {
	results: Pokemon[];
}

export interface Pokemon {
	id: number;
	name: string;
	height: number;
	weight: number;
	url: string;
	types: Type[];
	type1: string;
	type2: string;
	image: string;
}

export interface Type {
	slot: number;
	type: TypeName;
}

export interface TypeName {
	name: string;
	url: string;
}