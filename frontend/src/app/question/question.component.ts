import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  constructor(public route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.question.isValid = !isNaN(params.id);
      this.question.id = params.id;
    });
  }

  question = {
    isValid: true,
    id: '2613762186',
    question: 'Wie verschlüssel ich eine Nachricht mit Hilfe des RSA-Algorithmus',
    answer:
      'Der Klartext wird als Binärzahl m Element {0, ..., n-1} aufgefasst. Ist der Klartext zu lang, so wird er in mehrere Stücke zerlegt, die jeweils für sich verschlüsselt werden.' +
      '\nEs sind:' +
      '\n  n	 	öffentliche Zahl' +
      '\n  e	 	öffentlicher Schlüssel des Empfängers' +
      '\n  d	 	privater Schlüssel des Empfängers' +
      '\n  m < n  	 	Klartext' +
      '\n  c	 	Geheimtext' +
      '\nZur Verschlüsselung berechnet der Sender: c = me mod n' +
      '\nund erhält damit den Geheimtext c. 1)' +
      '\nDie Zahl n ist das Produkt von zwei verschiedenen Primzahlen p und q, diese sind geheim. Wie können p und q geheim sein, wenn doch n = p·q öffentlich bekannt ist? Dies beruht nur darauf, dass die Primfaktorzerlegung von n zu rechenaufwendig ist, da n sehr groß ist (z.B. 512 Bit lang).' +
      '\nFür die Zahl e muss gelten: ggt(e, φ(n)) = 1' +
      '\nHierbei ist φ(n) = (p-1)(q-1) die Anzahl der zu n teilerfremden Zahlen, die kleiner als n sind.'
  };

  comments = [
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    },
    {
      author: 'Timo Scheuermann',
      date: new Date(1570649695000),
      comment: 'Bei A. W. ist der Algo. in der Klausur gegeben.'
    }
  ];
}
