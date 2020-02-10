import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './model/Pokemon'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokeApp';

  apiURL: string;
  public name: string = "";
  response: any
  listPokemon: any
  error: string

  constructor(public http: HttpClient) {
    this.apiURL = 'http://pokeapi.co/api/v2/pokemon/';
  }

  public getPokemon() {
    this.listPokemon = []
    if (this.name === "") {
      this.http.get(this.apiURL + this.name).subscribe(
        data => {
          this.response = data
          this.response.results.forEach(poke => {
            var nPoke = this.http.get(poke.url).subscribe(res => {
              this.listPokemon.push(res)
            })
          });
        },
        error => { this.error = error.error}
      );
    } else {
      this.http.get(this.apiURL + this.name).subscribe(
        data => {
          this.listPokemon.push(data)
        },
        error => { this.error = error.error}
      );
    }
  }
}
