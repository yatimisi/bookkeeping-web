import { ElementRef, Directive, OnInit, Renderer2, Input } from '@angular/core';


@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[customButton]'
})
export class BsButtonDirective implements OnInit {

  @Input() customButton: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'btn');

    switch (this.customButton) {
      case 'back':
        this.renderer.addClass(this.el.nativeElement, 'btn-outline-danger');
        break;
      case 'delete':
        this.renderer.addClass(this.el.nativeElement, 'btn-outline-danger');
        break;
      case 'edit':
        this.renderer.addClass(this.el.nativeElement, 'btn-primary');
        break;
      case 'save':
        this.renderer.addClass(this.el.nativeElement, 'btn-success');
        break;
      case 'success':
        this.renderer.addClass(this.el.nativeElement, 'btn-success');
        this.renderer.addClass(this.el.nativeElement, 'button-main');
        break;
      case 'feature':
        this.renderer.addClass(this.el.nativeElement, 'btn-dark');
        break;
      case 'other':
      default:
        this.renderer.addClass(this.el.nativeElement, 'btn-outline-dark');
        break;
    }

    this.renderer.addClass(this.el.nativeElement, 'mr-2');
    this.renderer.addClass(this.el.nativeElement, 'mt-2');
  }
}
