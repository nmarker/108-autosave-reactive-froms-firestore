import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore'
import { BehaviorSubject } from 'rxjs'

@Component({
  selector: 'form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent implements OnInit {

  myForm: FormGroup;
  myDoc;

  state: string;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) { }

  ngOnInit() {

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      career: ['', Validators.required],
      bio: [''],
      skillArrayForm: [this.fb.group(
        (
          [this.initSkill()]
        ))]
    })

    this.myDoc = this.afs.doc('contacts/test').valueChanges();
  }

  get getskillForms() {
    return this.myForm.get('skillArrayForm') as FormArray
  }
  
  initSkill() {
    console.log("in initSkill")
    // initialize our address
    return this.fb.group({
        level: ['', Validators.required],
        skill: ['']
    });
  }

  changeHandler(e) {
    // console.log(e)
    this.state = e;

  }
  addSkill() {

    const phone = this.fb.group({ 
      level: [],
      skill: []
    })

    this.getskillForms.push(phone);
  }
}
