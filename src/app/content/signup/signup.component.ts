import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


    public customForm: FormGroup;

    public formArrayModel: FormGroup = new FormGroup({
        emails: new FormArray([new FormControl('')])
    });

    constructor(
        private _cd: ChangeDetectorRef,
        private _fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.customForm = this._fb.group({
            firstName: ['', [Validators.required, Validators.minLength(4), this.nameValidator]],
            lastName: ['', [Validators.required, Validators.minLength(4)], [this.asyncNameValidator]],
            male: [true],
            passwordGroup: this._fb.group({
                password: ['', [Validators.required, Validators.minLength(4)]],
                cpassword: ['', [Validators.required, Validators.minLength(4)]],
            })
        });
        this._cd.detectChanges();
    }

    public addEmail(): void {
        (this.formArrayModel.get('emails') as FormArray).push(new FormControl(''));
    }

    public removeEmail(index: number): void {
        (this.formArrayModel.get('emails') as FormArray).removeAt(index);
    }


    public nameValidator({ value }: FormControl): ValidationErrors | null {
        const valid: boolean = /^[a-zA-Z]*$/.test(value);
        const err: ValidationErrors | null = valid
            ? null
            : {
                nospicial: 'Только буквы'
            };
        return err;
    }

    public asyncNameValidator({ value }: FormControl): Observable<ValidationErrors | null> {
        const valid: boolean = /^[a-zA-Z]*$/.test(value);
        const err: ValidationErrors | null = valid
            ? null
            : {
                nospicial: 'Только буквы'
            };
        return of(err)
            .pipe(delay(5000));
    }


}
