import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTime: any;
  order: boolean = false;

  constructor(public navCtrl: NavController) {
    this.animales = ANIMALES.slice(0);
  }

  play(animal: Animal) {

    this.pauseAudio(animal);

    if (animal.reproduciendo) { animal.reproduciendo = false; return; }

    this.audio = new Audio();

    this.audio.src = animal.audio;

    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTime = setTimeout( () => animal.reproduciendo = false, animal.duracion * 1000 );
  }

  delete( i: number) {
    this.animales = this.animales.filter((animal, index) => index !== i);
  }

  doRefresh(e: Refresher) {

    setTimeout(() =>  {
      console.log('terminó el refresh');
      this.animales = ANIMALES.slice(0);
      e.complete();
    }, 1000 )
  }

  private pauseAudio(animal: Animal) {
    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime = 0;

    for (let animal of this.animales) {
      if (animal.nombre !== animal.nombre) { animal.reproduciendo = false; }
    }
  }

  reorderAnimal(index: any) {
    this.animales = reorderArray(this.animales, index);
  }

}
