import { Directive, ViewContainerRef, TemplateRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInView]'
})
export class InViewDirective implements AfterViewInit {

  alreadyRendered: boolean; // cheking if visible already

  constructor(
    private vcRef: ViewContainerRef,
    private tplRef: TemplateRef<any>
  ) { }

  ngAfterViewInit() {
    const commentEl = this.vcRef.element.nativeElement; // template
    const elToObserve = commentEl.parentElement;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          this.renderContents(entry.isIntersecting)
        });
      }, {threshold: [0, .1, .9, 1]});
    observer.observe(elToObserve);
  }

  renderContents(isInView) {
    if (isInView && !this.alreadyRendered) {
      this.vcRef.clear();
      this.vcRef.createEmbeddedView(this.tplRef);
      this.alreadyRendered = true;
    }
  }

}
