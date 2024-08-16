import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;


  constructor(private fb: FormBuilder){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit(){
    if(this.contactForm.valid){
      const formValues =  this.contactForm.value;


      //using emailjs

      const templateParams = {
        name: formValues.name,
        email: formValues.email,
        message: formValues.message

      };


      emailjs.send("YOUR_SERVICES", "YOUR_TEMPLATE_ID", templateParams, "YOUR_USER_ID")
      .then((response: EmailJSResponseStatus) => {
          
      })
    }
  }

}
