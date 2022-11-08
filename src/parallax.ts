import { attr, FASTElement, observable, Updates } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';

let VH;

export class Parallax extends FASTElement {
	@attr public speed: number = 0.25;
	@attr public noscale: boolean = false;
	@attr orientation: Orientation = Orientation.vertical;

	@observable public calc: number = 0;
	@observable private offset: number = 0;
	@observable private scale: number= 0;

	@observable public elements!: Array<HTMLElement>;

	public connectedCallback() {
		super.connectedCallback();

		
		Updates.enqueue(() => {
			const element = this.elements[0];
			
			VH = window.innerHeight;
			this.scale = (VH - (element.clientHeight)) * this.speed;
			this.calc = (VH - element.clientHeight) * 0.5;
			this.offset = element.getBoundingClientRect().top + window.scrollY;

			if (!this.noscale) {
				Object.assign(element.style, {
					height: `${element.clientHeight + this.scale}px`,
					top: `${this.scale * -0.5}px`
				});
			}
	
			const translation = (((0 - this.offset) + this.calc) * this.speed);
	
			if (this.orientation === Orientation.horizontal) {
				Object.assign(element.style, {
					transform: `translate3d(${translation}px, 0, 0)`
				});
			}
	
			if (this.orientation === Orientation.vertical) {
				Object.assign(element.style, {
					transform: `translate3d(0, ${translation}px, 0)`
				});
			}
		});

		window.addEventListener('scroll', (event: Event) => {
			const positionY = window.scrollY;
			const translation = (((positionY - this.offset) + this.calc) * this.speed);
			
			if (this.orientation === Orientation.horizontal) {
				Object.assign(this.elements[0].style, {
					transform: `translate3d(${translation}px, 0, 0)`
				});
			}

			if (this.orientation === Orientation.vertical) {
				Object.assign(this.elements[0].style, {
					transform: `translate3d(0, ${translation}px, 0)`
				});
			}
		});
	}
}