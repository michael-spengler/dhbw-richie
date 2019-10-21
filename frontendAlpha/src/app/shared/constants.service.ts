import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  public readonly twitterURL = 'TWITTERURL';
  public readonly instagramURL = 'INSTAGRAMURL';
  public readonly telegramURL = 'TELEGRAMURL';
  public readonly facebookURL = 'FACEBOOKURL';
  public readonly youtubeURL = 'YOUTUBEURL';
  public readonly botURL = 'BOTURL';
}
