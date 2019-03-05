import { Component, OnInit } from '@angular/core';

export class Person {
    public constructor(
        public firstName: string,
        public lastName: string,
    ) {}

    public getDate(): Date {
        return new Date();
    }
}

@Component({
    selector: 'app-cd',
    templateUrl: './cd.component.html',
    styleUrls: ['./cd.component.css']
})
export class CdComponent implements OnInit {

    public person1: Person;
    public person2: Person;

    public ngOnInit(): void {
        this.person1 = new Person('Igor', 'Nepipenko');
        this.person2 = new Person('Vlad', 'Loban');

        setTimeout(() => {
            this.person2 = new Person('Jon', 'Doe');
        }, 5000);

        setTimeout(() => {
            this.person2 = new Person('Will', 'Braun');
        }, 15000);
    }

}
