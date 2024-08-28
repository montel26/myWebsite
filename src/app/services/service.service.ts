import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private serviceID: string = 'service_7bb6yfi';
  private templateID: string = 'template_mfv4877';

  constructor() {
    this.initializeEmail();
  }

  private initializeEmail(): void {
    emailjs.init('njmYilLbTb48AiG2a');
  }

  sendEmail(formData: { name: string; email: string; message: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceID, this.templateID, {
      to_name: 'Mr Wood',
      from_name: formData.name,
      message: formData.message,
      reply_to: formData.email
    });
  }
}
