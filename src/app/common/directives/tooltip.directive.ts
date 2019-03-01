import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appTooltip]',
    exportAs: 'tool,tooltip'
})
export class TooltipDirective implements OnInit {
// <span class="tooltiptext open">Эквив. ~ 150$ {{product.price }}</span>

    @Input()
    public set appTooltip(text: string) {  // onChanges
        if (!text) {
            return;
        }
        this._tooltipContext.textContent = text;
    }

    private _tooltipContext: HTMLSpanElement = this._render.createElement('span');

    public constructor(
        private _render: Renderer2,
        private _elementRef: ElementRef,
    ) { }

    public ngOnInit(): void {
        this._render.addClass(this._tooltipContext, 'tooltiptext');
        this._render.appendChild(this._elementRef.nativeElement, this._tooltipContext);
    }

    // @HostListener('window:resize')
    // public tooltipHide(): void {
    //     console.log(1);
    // }

    public show() {
        this._render.addClass(this._tooltipContext, 'open');
    }

    public hide() {
        this._render.removeClass(this._tooltipContext, 'open');
    }
}
