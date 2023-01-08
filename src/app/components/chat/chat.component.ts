import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import Pusher from "pusher-js";
import { ChatService } from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user: any;

  messages = [
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
    // { userName: 'yahav' , message: 'wwow!@##@ jdsg f 3i44r8f nckiuds kjhsd  sd kjhdf', time: '22:45'},
  ];

  chatForm: FormGroup;
  messageTimer = 30;
  messageCountLimit = -1;
  messageLength = 100;
  spinner = false;
  newMessages = 0;

  constructor(private fb: FormBuilder,
              private chatService: ChatService) {
  }

  ngOnInit():void {
    this.user = JSON.parse(sessionStorage.getItem('user')!);
    this.initForm();
    this.setPusher();
  }

  setPusher(): void {
    Pusher.logToConsole = true;
    new Pusher('2adb81657a664e4db099', {cluster: 'eu'})
      .subscribe('secret-killer')
      .bind('message', (data: never) => {

        const messageContainer = document.getElementById('messageContainer');
        const scrollClientHeightDeduction = messageContainer!.scrollHeight - messageContainer!.clientHeight;
        const scrollBarTop = messageContainer!.scrollTop;

        this.newMessages++ ;
        this.messages.push(data);

        setTimeout(() => {
          const message = document.getElementById(`${this.messages.length - 1}`);
          if (scrollClientHeightDeduction - scrollBarTop <= 300) {
            message!.scrollIntoView(true);
          }}, 1);
      });
  }

  initForm(): void {
    this.chatForm = this.fb.group({
      'message' : [null, [Validators.maxLength(this.messageLength), Validators.required]],
    });
  }

  submit(messageContainer: HTMLDivElement, input: HTMLTextAreaElement): void {
    const messageControl = this.chatForm.get('message')!;
    if (this.chatForm.invalid) {
      return;
    }
    this.messageCountLimit++ ;

    if (this.messageCountLimit === 5) {
      this.limitMessageCount(messageControl, input);
      return;
    }

    this.spinner = true;
    messageControl.disable();

    this.chatService.sendChat({userName: this.user['user_name'], message: this.chatForm.get('message')?.value })
      .subscribe(() => {
        this.handleSubmit(messageControl, input, messageContainer);
      })
  }

  handleSubmit(messageControl: AbstractControl, input: HTMLTextAreaElement, messageContainer: HTMLDivElement): void {
    this.spinner = false;
    this.newMessages = 0;
    messageContainer.scrollBy(0, messageContainer.scrollHeight);
    messageControl.reset();
    messageControl.enable();
    input.focus();
  }

  limitMessageCount(messageControl: AbstractControl, input: HTMLTextAreaElement) : void {
    messageControl.reset();
    messageControl.disable();
    setTimeout(() => {
      this.messageTimer = 30;
      this.messageCountLimit = -1;
      messageControl.enable();
      input.focus();
      clearInterval(interval);
    }, 30000);
    const interval = setInterval(() => {
      this.messageTimer-- ;
    }, 1000);
  }

  scroll(messageContainer: HTMLDivElement):void {
    const scrollClientHeightDeduction = messageContainer.scrollHeight - messageContainer.clientHeight;
    const scrollBarTop  = messageContainer.scrollTop;
    if (scrollClientHeightDeduction - scrollBarTop <= 5) {
      this.newMessages = 0;
    }
  }

  down(messageContainer: HTMLDivElement):void {
    this.newMessages = 0;
    messageContainer.scrollBy(0, messageContainer.scrollHeight)
  }

}
