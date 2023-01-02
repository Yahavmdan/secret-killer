import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import Pusher from "pusher-js";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: any;
  messages = [];
  chatForm: FormGroup;
  messageCounter = 30;
  messageCountLimit = 0;
  messageLimit = 30;

  constructor(private fb: FormBuilder,
              private chatService: ChatService) {
  }

  ngOnInit():void {
    this.initForm();
    this.user = JSON.parse(sessionStorage.getItem('user')!);

    Pusher.logToConsole = true;

    const pusher = new Pusher('2adb81657a664e4db099', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('secret-killer');
    channel.bind('message', (data: never) => {
     this.messages.push(data)
    });
  }

  initForm(): void {
    this.chatForm = this.fb.group({
      'message' : [null, [Validators.maxLength(30), Validators.required]],
    })
  }

  submit(): void {
    if (this.chatForm.invalid) {
      return;
    }
    this.messageCountLimit++

    if (this.messageCountLimit === 6) {
      this.limitMessage();
      return;
    }

    this.chatService.sendChat({userName: this.user['user_name'], message: this.chatForm.get('message')?.value })
      .subscribe(res => res)
    this.chatForm.get('message')?.reset()
  }

  limitMessage() : void {
    this.chatForm.get('message')?.reset();
    this.chatForm.get('message')?.disable();
    setTimeout(() => {
      this.messageCountLimit = 0;
      this.messageCounter = 30;
      this.chatForm.get('message')?.enable();
      clearInterval(interval);
    }, 30000)
    const interval = setInterval(() => {
      this.messageCounter =  this.messageCounter - 1;
    }, 1000)
  }

}
