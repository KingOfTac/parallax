import { attr, FASTElement, observable } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';

export interface ParallaxItemModel {
	scale: number;
	calc: number;
	offset: number;
};

export interface ParallaxElement extends HTMLElement {
	$parallax: ParallaxItemModel
}

export class ParallaxItem extends FASTElement {
	@attr
	public speed: number = 0.25;
	
	@attr({ mode: 'boolean' })
	public noscale: boolean = false;
	
	@attr
	public orientation: Orientation = Orientation.vertical;

	@observable public calc: number = 0;
	@observable public offset: number = 0;
	@observable public scale: number = 0;

	@observable
	public elements!: Array<ParallaxElement>;
	public elementsChanged(
		oldValue: Array<ParallaxElement>,
		newValue: Array<ParallaxElement>
	): void {
		if (newValue) {
			this.configureParallax(newValue);
		}
	}

	private configureParallax(elements: Array<ParallaxElement>): void {
		const vh = window.innerHeight;
		
		elements.forEach((element: ParallaxElement, index: number) => {
			const model: ParallaxItemModel = {
				scale: (vh - (element.clientHeight)) * this.speed,
				calc: (vh - element.clientHeight) * 0.5,
				offset: element.getBoundingClientRect().top + window.scrollY
			}

			element.$parallax = model;

			const translation = (((0 - model.offset) + model.calc) * this.speed);

			if (this.orientation === Orientation.horizontal) {
				Object.assign(element.style, {
					top: index > 1 ? 'unset' : `${element.clientHeight * index}px`,
					transform: `translate3d(${translation}px, 0, 0)`
				});
			}

			if (this.orientation === Orientation.vertical) {
				Object.assign(element.style, {
					top: index > 1 ? 'unset' : `${element.clientHeight * index}px`,
					transform: `translate3d(0, ${translation}px, 0)`
				});
			}

			if (this.noscale) {
				this.setNoscale(element);
			}
		});
	}

	private setNoscale(element: ParallaxElement) {
		Object.assign(element.style, {
			height: `${element.clientHeight + element.$parallax.scale}px`,
			top: `${element.$parallax.scale * -0.5}px`
		});
	}

	private handleScroll = (event: Event): void => {
		const positionY = window.scrollY;

		this.elements.forEach((element: ParallaxElement) => {
			const translation = (((positionY - element.$parallax.offset) + element.$parallax.calc) * this.speed);

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
	}

	public connectedCallback(): void {
		super.connectedCallback();

		window.addEventListener('scroll', this.handleScroll);
	}

	public disconnectedCallback(): void {
		window.removeEventListener('scroll', this.handleScroll);

		super.disconnectedCallback();
	}
}