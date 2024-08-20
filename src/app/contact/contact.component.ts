import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import emailjs, {EmailJSResponseStatus} from 'emailjs-com';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;


  constructor(private fb: FormBuilder){
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }
  ngOnInit():void{
    this.intializeEmail();
  }


  intializeEmail():void{
    emailjs.init('njmYilLbTb48AiG2a')
  }

  onSubmit(): void{
    if(this.contactForm.valid){
      const formValues =  this.contactForm.value;


      //using emailjs

      let serviceID: string = "service_7bb6yfi";
      let templateID: string = "template_mfv4877";
      // let userID:string = "F2sm90Xa-LnJHsCusQxRg";


      emailjs.send(serviceID, templateID,{
        to_name: "Mr Wood",
        from_name: formValues.name,
        message: formValues.email,

      });
      
    }
  }

}
