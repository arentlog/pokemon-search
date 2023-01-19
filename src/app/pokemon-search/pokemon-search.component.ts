import { Component, OnInit } from '@angular/core';
import { PokeAPIResponse, Pokemon } from '../pokemon/pokemon';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
	selector: 'app-pokemon-search',
	templateUrl: './pokemon-search.component.html',
	styleUrls: ['./pokemon-search.component.css']
})
export class PokemonSearchComponent implements OnInit {
	pokemonFilter: string = '';
	allPokemon: Pokemon[] = [];
	filteredPokemon: Pokemon[] = [];
	filteredPokemonDetails: Pokemon[] = [];

	constructor (private pokemonService: PokemonService) { }

	ngOnInit() {
		this.pokemonService.getAllPokemon()
			.subscribe((data: PokeAPIResponse) => {
				if (data != null) {
					this.allPokemon = data.results;
				}
			});
	}

	initializeData(data: Pokemon) {
		if (data.types.length > 0) {
			data.types.forEach((t, index) => {
				if (index == 0) {
					data.type1 = t.type?.name;
				}
				else if (index == 1) {
					data.type2 = t.type?.name;
				}
			});
		}

		data.image = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + data.id + '.png';
	}

	keyPress(event: any) {
		if (event.target.value != '') {
			this.filteredPokemon = this.allPokemon.filter((obj) => {
				return obj.name.startsWith(event.target.value);
			});
	
			this.filteredPokemon.forEach((p, index) => {
				this.pokemonService.getPokemonDetails(p.name)
				.subscribe((data: Pokemon) => {
					if (data != null) {
						this.initializeData(data);

						this.filteredPokemon[index] = data;
					}
				});
			});
		}
		else {
			this.filteredPokemon = [];
		}
	}
}