// filepath: /c:/Users/E2017567/Development/stackStatus/stackStatus/src/app/services/websocket.service.ts
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private subject: Subject<MessageEvent>;

  public connect(url: string): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);

    const observable = new Observable<MessageEvent>(observer => {
      ws.onmessage = observer.next.bind(observer);
      ws.onerror = observer.error.bind(observer);
      ws.onclose = observer.complete.bind(observer);
      return () => ws.close();
    });

    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }
}