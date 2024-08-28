import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../services/service.service';  // Import the service

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {  // Inject the service
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  downloadCV(): void {
    // Implement logic to download the CV, for example:
    window.open('path-to-cv.pdf', '_blank');
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;

      this.serviceService.sendEmail(formValues)
        .then((response) => {
          console.log('Email sent successfully!', response.status, response.text);
          // You can show a success message to the user here
        })
        .catch((error) => {
          console.error('Failed to send email.', error);
          
          // You can show an error message to the user here
        });

    } else {
      console.log('Form is not valid');
      // Optionally show validation errors to the user
    }
  }
}


