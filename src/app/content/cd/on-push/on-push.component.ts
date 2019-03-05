import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { Person } from '../cd.component';

@Component({
    selector: 'app-on-push',
    templateUrl: './on-push.component.html',
    styleUrls: ['./on-push.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent implements OnInit {
    @Input()
    public person: Person;

    constructor(
        private _cd: ChangeDetectorRef,
        private _zone: NgZone
    ) { }

    ngOnInit() {

        // ga.map.getCoord((coord) => {
        //     console.log(coord);
        //     this._zone.run(()=>{
        //         this.coord = coord;
        //     })
        // });
        // this._zone.runOutsideAngular(()=>{
        //
        // })

        setTimeout(() => {
            this._cd.detach();
        }, 2000);

        setTimeout(() => {
            this._cd.reattach();
        }, 10000);
    }

}
