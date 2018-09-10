import {
  Directive,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { tap, map, take, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fireForm]'
})
export class FireFormDirective implements OnInit, OnDestroy {

  @Input() path: string;
  @Input() formGroup: FormGroup;

  private _state: 'loading' | 'synced' | 'modified' | 'error';

  @Output() stateChange = new EventEmitter<string>();
  @Output() formError = new EventEmitter<string>();

  // Firestore Document
  private docRef: AngularFirestoreDocument;

  // Subscriptions
  private formSub: Subscription;

  constructor(private afs: AngularFirestore) { }


  ngOnInit() {
    this.preloadData();
    this.autoSave();
  }

  // Loads initial form data from Firestore
  preloadData() {
    this.state = 'loading';
    this.docRef = this.getDocRef(this.path);
    this.docRef
      .valueChanges()
      .pipe(
        tap(doc => {
          if (doc) {
            //this.formGroup.patchValue(doc);
            this.formGroup.setValue({
              email: doc['email'],
              career: doc['career'],
              bio: doc['bio'],
              skillArrayForm: doc['skillArrayForm']
              //skillArrayForm: this.testparse(doc['skillArrayForm'])
            });
            this.formGroup.markAsPristine();
            this.state = 'synced';
          }
        }),
        take(1)
      )
      .subscribe();
  }

  // testparse(skillarray: Variable){
  //   console.log('typeof: ' + typeof skillarray)
  //   console.log('isarray: ' + isArray(skillarray))
  //   console.log('in testparse: ' + skillarray)  
  //   for (let temp in skillarray)
  //   {
  //     console.log('temp:' + temp.toString() + ' : ' + skillarray[temp.toString()]['level'] + ' : ' + skillarray[temp.toString()]['skill'])
      
  //     const phone = this.fb.group({ 
  //       level: [skillarray[temp.toString()]['level']],
  //       skill: [skillarray[temp.toString()]['skill']]
  //     })
  
  //     //this.getskillForms.push(phone)    
  //     this.formGroup.setValue(phone)
  //   }
  // }

  // Autosaves form changes
  autoSave() {
    this.formSub = this.formGroup.valueChanges
    .pipe(
      tap(change => {
        this.state = 'modified';
      }),
      debounceTime(2000),
      tap(change => {
        if (this.formGroup.valid && this._state === 'modified') {
          this.setDoc();
        }
      })
    )
    .subscribe();
  }

  

  @HostListener('ngSubmit', ['$event'])
  onSubmit(e) {
    this.setDoc();
  }


  // Determines if path is a collection or document
  getDocRef(path: string): any {
    if (path.split('/').length % 2) {
      return this.afs.doc(`${path}/${this.afs.createId()}`);
    } else {
      return this.afs.doc(path);
    }
  }

  // Writes changes to Firestore
  async setDoc() {
    try {
      await this.docRef.set(this.formGroup.value, { merge: true });
      this.state = 'synced';
    } catch (err) {
      console.log(err)
      this.formError.emit(err.message)
      this.state = 'error';
    }
  }
  
  // Setter for state changes
  set state(val) {
    this._state = val;
    this.stateChange.emit(val);
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }



}
