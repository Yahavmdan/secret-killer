import { Injectable } from '@angular/core';
import Pusher from "pusher-js";

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  connection = new Pusher('2adb81657a664e4db099', {cluster: 'eu'}).subscribe('secret-killer');

  constructor() {
    Pusher.logToConsole = false;
  }
}
