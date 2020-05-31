import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'; 
import {Params,ActivatedRoute} from'@angular/router';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import {Location } from'@angular/common';
import { DishService } from '../services/dish.service';
import {switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { Comment} from '../shared/comment';
import{ visibility ,flyInOut, expand} from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  host: {
       '[@flyInOut]':'true',
       'style':'display:block;'
  },
  animations:[
    flyInOut(),
    visibility(),
    expand()
  ]  
})


export class DishdetailComponent implements OnInit {
  commentForm:FormGroup;
    dish:Dish;
   errMess:string;
   myModel=0;
    dishIds:string[];
    prev: string;
    next:string;
    rate:Comment;
    comment: Comment;
    dishcopy:Dish;
    cmt:string;
    date:string;
    visibility = 'shown';
    
    @ViewChild('cform') commentFormDirective;
  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location,
    public fbc:FormBuilder,
    @Inject('BaseURL') public BaseURL) { 

      this.createCommentForm();
    }
 


    createCommentForm():void
    {     
      this.commentForm=this.fbc.group({
          nameuser: ['',[Validators.required,Validators.minLength(2)]] ,
         ycomment: ['',[Validators.required]],
         maslider:[5]
        });
        this.commentForm.valueChanges.subscribe(data=>this.onCommentValueChanged(data));
        this.onCommentValueChanged();//re(set) form validation messages
    }
    formcommentErrors={
      'nameuser': '',
      'ycomment':''
     
    };

    validationMessages = {
      'nameuser': {
        'required':      'Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      
      'ycomment': {
        'required':      'Comment is required.'
      },
      
      
    };

    onCommentValueChanged(data?: any) 
  {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formcommentErrors) 
    {
      if (this.formcommentErrors.hasOwnProperty(field)) 
      {
        // clear previous error message (if any)
        this.formcommentErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) 
        {
          const messages = this.validationMessages[field];
          for (const key in control.errors) 
          {
            if (control.errors.hasOwnProperty(key)) 
            {
              this.formcommentErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  ngOnInit(){
    this.dishService.getDishIds().subscribe((dishIds)=> this.dishIds = dishIds);  
    this.route.params.pipe(switchMap((params:Params)=>{this.visibility = 'hidden'; return this.dishService.getDish(params['id']);}))
      .subscribe((dish) => { this.dish = dish; this.dishcopy=dish; this.setPrevNext(dish.id);this.visibility = 'shown'; },errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: string)
  {
    const index=this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack():void
  {
    this.location.back();
  }
  onSubmit() {
    this.comment = this.commentForm.value;
    var d = new Date();
     var n = d.toISOString();
    this.myModel;
    console.log(this.comment);
this.dishcopy.comments.push({rating:this.commentForm.get('maslider').value,comment:this.commentForm.get('ycomment').value,author:this.commentForm.get('nameuser').value,date:n});
   
    this.dishService.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      nameuser: [''],
      maslider:5, 
      ycomment: ['']
      
    });
   
  }
 
}
