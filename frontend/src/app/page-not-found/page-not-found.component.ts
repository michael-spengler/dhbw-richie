import { HttpClient } from "@angular/common/http";
import { AfterViewInit, Component, NgZone } from "@angular/core";

@Component({
  selector: "app-page-not-found",
  templateUrl: "./page-not-found.component.html",
  styleUrls: ["./page-not-found.component.css"]
})
export class PageNotFoundComponent implements AfterViewInit {
  constructor(private httpClient: HttpClient, private ngZone: NgZone) {}

  backgroundImage = {};

  ngAfterViewInit(): void {
    this.httpClient
      .get(
        "https://api.giphy.com/v1/gifs/random?api_key=0UTRbFtkMxAplrohufYco5IY74U8hOes&tag=wolf%20of%20wall%20street&rating=R"
      )
      .subscribe(data => {
        this.ngZone.run(() => {
          this.backgroundImage = {
            "background-image": `url('${data["data"].image_original_url}')`
          };
        });
      });
  }
}
