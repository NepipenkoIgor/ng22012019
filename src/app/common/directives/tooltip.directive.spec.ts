import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipDirective } from './tooltip.directive';
import { By } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

console.log(environment);

@Component({
    selector: 'app-test-component',
    template: `
      <div class="with_tooltip" [appTooltip]="tooltipText" #t="tooltip"></div>
      <div class="with_control" (mouseenter)="t.show()" (mouseleave)="t.hide()"></div>
    `
})
class TestComponent {
    public tooltipText = 'text on tooltip';
}


describe('TooltipDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                TooltipDirective
            ]
        });
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should work', () => {
        const tooltipContainer = fixture.debugElement.query(By.css('.with_tooltip'));
        const tooltip = tooltipContainer.query(By.css('.tooltiptext'));

        expect(tooltip.nativeElement.classList.contains('open'))
            .toBeFalsy();

        const tooltipControl = fixture.debugElement.query(By.css('.with_control'));

        tooltipControl.triggerEventHandler('mouseenter', null);
        expect(tooltip.nativeElement.classList.contains('open'))
            .toBeTruthy();
        tooltipControl.triggerEventHandler('mouseleave', null);
        expect(tooltip.nativeElement.classList.contains('open'))
            .toBeFalsy();
    });
});
