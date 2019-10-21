import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationType } from 'src/app/models/notificationTyp.enum';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  constructor(
    public route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
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

  comments = [];

  testString = 'Hallo Welt';
  cancel() {
    this.testString = '';
    this.notificationService.sendNotification('Cancel', NotificationType.ERROR);
  }
  submit() {
    this.notificationService.sendNotification(
      'Submit: ' + this.testString,
      NotificationType.SUCCESS
    );
  }
}
