import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ChatService } from "../../services/chat.service";
import { ActiveUserService } from "../../services/active-user.service";
import { User } from "../../models/User";
import { PusherService } from "../../services/pusher.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

  @Input() disabled: boolean;
  @Input() users: User[];

  user: User;
  chatForm: FormGroup;
  messageTimer = 30;
  messageCountLimit = -1;
  messageLength = 100;
  tinySpinner = false;
  newMessages = 0;

  messages = [
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
    // { userName: 'yahav' , message: 'wow!@##@ Hello f 3i44r8f Nickel-back kosher  sd kill', time: '22:45'},
  ];

  constructor(private fb: FormBuilder,
              private chatService: ChatService,
              private activeUserService: ActiveUserService,
              private pusher: PusherService) {
  }

  ngOnInit(): void {
    this.user = this.activeUserService.getActiveUser();
    this.initForm();
    this.setPusher();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeDisabled(changes['disabled']?.currentValue);
    this.changeUsers(changes['users']?.currentValue);
  }

  changeDisabled(disabled: boolean) : void {
    this.disabled = disabled;
    this.disabled ? this.chatForm?.get('message')?.disable() : this.chatForm?.get('message')?.enable()
  }

  changeUsers(users: User[]) : void {
    this.users = users;
  }

  setPusher(): void {
    this.pusher.connection.bind('message', (data: never) => {
        const messageContainer = document.getElementById('messageContainer');
        const scrollClientHeightDeduction = messageContainer!.scrollHeight - messageContainer!.clientHeight;
        const scrollBarTop = messageContainer!.scrollTop;

        this.newMessages++;
        this.users.forEach(user => {
          if (user.userName === data['userName']) {
            this.messages.push(data);
          }
        })

        setTimeout(() => {
          const message = document.getElementById(`${this.messages.length - 1}`);
          if (scrollClientHeightDeduction - scrollBarTop <= 300) {
            message!.scrollIntoView(true);
          }
        }, 1);
      });
  }

  initForm(): void {
    this.chatForm = this.fb.group({
      'message': [null, [Validators.maxLength(this.messageLength), Validators.required]],
    });
  }

  submit(messageContainer: HTMLDivElement, input: HTMLTextAreaElement): void {
    const messageControl = this.chatForm.get('message')!;
    if (this.chatForm.invalid) {
      return;
    }
    this.messageCountLimit++;

    if (this.messageCountLimit === 5) {
      this.limitMessageCount(messageControl, input);
      return;
    }

    this.tinySpinner = true;
    messageControl.disable();

    this.chatService.sendChat(this.user.userName, this.chatForm.get('message')?.value)
      .subscribe(() => {
        this.handleSubmit(messageControl, input, messageContainer);
      })
  }

  handleSubmit(messageControl: AbstractControl, input: HTMLTextAreaElement, messageContainer: HTMLDivElement): void {
    this.tinySpinner = false;
    this.newMessages = 0;
    messageContainer.scrollBy(0, messageContainer.scrollHeight);
    messageControl.reset();
    messageControl.enable();
    input.focus();
  }

  limitMessageCount(messageControl: AbstractControl, input: HTMLTextAreaElement): void {
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
      this.messageTimer--;
    }, 1000);
  }

  scroll(messageContainer: HTMLDivElement): void {
    const scrollClientHeightDeduction = messageContainer.scrollHeight - messageContainer.clientHeight;
    const scrollBarTop = messageContainer.scrollTop;
    if (scrollClientHeightDeduction - scrollBarTop <= 5) {
      this.newMessages = 0;
    }
  }

  down(messageContainer: HTMLDivElement): void {
    this.newMessages = 0;
    messageContainer.scrollBy(0, messageContainer.scrollHeight)
  }

}
