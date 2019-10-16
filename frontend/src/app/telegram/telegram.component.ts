import { Component, OnInit } from "@angular/core";
import { Globals } from "../globals";

@Component({
  selector: "app-telegram",
  templateUrl: "./telegram.component.html",
  styleUrls: ["./telegram.component.css"]
})
export class TelegramComponent implements OnInit {
  constructor(public globals: Globals) {}

  openURL(url: string) {
    window.open(url, "_self");
  }

  ngOnInit() {}

  telegramChannels = [
    {
      img: "../../assets/tmp/telegram_demo.jpg",
      title: "WWI 18 SEC #1 Year",
      description:
        "Nur noch die coolen Verbliebenen, die es ins 3. Semester geschafft haben. Wer das Ureich nicht ehrt, kann sich direkt Exmatrikulieren",
      member: 27,
      url: "tg://resolve?domain=dhbw_richie_bot"
    },
    {
      img: "../../assets/tmp/telegram_demo2.jpg",
      title: "Webentwicklung WWISEC18",
      description:
        "https://dhbw-richie.de/ | Repo: https://github.com/michael-spengler/dhbw-richie",
      member: 27,
      url: "tg://resolve?domain=dhbw_richie_bot"
    },
    {
      img: "../../assets/tmp/telegram_demo3.jpg",
      title: "Advanced DB (Cassandra)",
      description: "http://cassandra.apache.org/",
      member: 4,
      url: "tg://resolve?domain=dhbw_richie_bot"
    },
    {
      img: "../../assets/tmp/telegram_demo4.jpg",
      title: "Moritz mehlige Malstube",
      description: "",
      member: 4,
      url: "tg://resolve?domain=dhbw_richie_bot"
    }
  ];
}
