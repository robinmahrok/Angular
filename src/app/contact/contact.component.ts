import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'; 
import { Feedback,ContactType} from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { Observable } from 'rxjs';
import{ visibility ,flyInOut, expand} from '../animations/app.animation';
import { $ } from 'protractor';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
       '[@flyInOut]':'true',
       'style':'display:block;'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class ContactComponent implements OnInit {
  errMess:string;
  feedbackForm:FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  feedbackcopy:Feedback;
  feedbackIds:string[];
  submitted:boolean;
 sf:boolean;
 gf:boolean;
@ViewChild('fform') feedbackFormDirective;

formErrors={
  'firstname': '',
  'lastname': '',
  'telnum'  : '',
  'email'   : '',
 
};
 
validationMessages = {
  'firstname': {
    'required':      'First Name is required.',
    'minlength':     'First Name must be at least 2 characters long.',
    'maxlength':     'FirstName cannot be more than 25 characters long.'
  },
  'lastname': {
    'required':      'Last Name is required.',
    'minlength':     'Last Name must be at least 2 characters long.',
    'maxlength':     'Last Name cannot be more than 25 characters long.'
  },
  'telnum': {
    'required':      'Tel. number is required.',
    'pattern':       'Tel. number must contain only numbers.'
  },
  'email': {
    'required':      'Email is required.',
    'email':         'Email not in valid format.'
  }
};

constructor(private fb:FormBuilder,private feedbackService:FeedbackService, @Inject('BaseURL') public BaseURL) { 

    this.createForm();
   }

  ngOnInit(): void {
this.submitted=false;
this.sf=false;
this.gf=true;
  }

  createForm()
  {
    this.feedbackForm=this.fb.group({

        firstname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]] ,
        lastname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]] ,
        telnum: [0,[Validators.required,Validators.pattern]] ,
        email: ['',Validators.required,Validators.email] ,
        agree: false ,
        contacttype: 'none' ,
        message: ''
      });
      this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
      this.onValueChanged();//re(set) form validation messages
  }

  onValueChanged(data?: any) 
  {
    if (!this.feedbackForm) { return; }
    const form = this.feedbackForm;
    for (const field in this.formErrors) 
    {
      if (this.formErrors.hasOwnProperty(field)) 
      {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) 
        {
          const messages = this.validationMessages[field];
          for (const key in control.errors) 
          {
            if (control.errors.hasOwnProperty(key)) 
            {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
 
  onSubmit() {
    this.gf=false;
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.submitted=true;
    
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(data => {
       this.feedback = data,setTimeout(() => {
        this.submitted=false,this.sf=true  }, 2000), setTimeout(() => {
          this.sf=false,this.gf=true }, 7000); },
      errmess => { this.feedback = null;  this.errMess = <any>errmess; });
      
     

    this.feedbackFormDirective.resetForm();
   
  }
}
