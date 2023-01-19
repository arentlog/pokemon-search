import { Injectable } from '@angular/core';
import { PokeAPIResponse, Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	constructor(private http: HttpClient) { }

	getAllPokemon() {
		return this.http.get<PokeAPIResponse>('https://pokeapi.co/api/v2/pokemon/?limit=1008');
	}

	getPokemonDetails(pokemon: string) {
		return this.http.get<Pokemon>('https://pokeapi.co/api/v2/pokemon/' + pokemon);
	}
}
