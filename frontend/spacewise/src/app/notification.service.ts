import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private currentColour: NotificationColour = NotificationColour.default;

  constructor() { }

  showNotification(message: string, colour: NotificationColour, closeInMs: number = 0) {
    const notification = document.getElementById('notification') as HTMLElement;
    const text = document.getElementById('notification-text') as HTMLElement;

    text.innerHTML = message;
    notification.className = 'open ' + colour.toString();
    this.currentColour = colour;

    if (closeInMs > 0) {
      setTimeout(() => {
        this.closeNotification();
      }, closeInMs);
    }
  }

  closeNotification() {
    const notification = document.getElementById('notification') as HTMLElement;
    const text = document.getElementById('notification-text') as HTMLElement;

    notification.className = this.currentColour.toString();

    setTimeout(() => {
      text.innerHTML = '';
      notification.className = '';
    }, 500);
  }
}

export enum NotificationColour {
  red = "red",
  yellow = "yellow",
  green = "green",
  default = "default"
}