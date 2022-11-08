import { elements, html, slotted } from '@microsoft/fast-element';

import type { ParallaxItem } from './parallax.js';
import type { ElementViewTemplate } from '@microsoft/fast-element';

export const parallaxItemTemplate = <T extends ParallaxItem>(): ElementViewTemplate<T> => {
	return html<T>`
		<slot ${slotted({
			property: 'elements',
			filter: elements()
		})}></slot>
	`;
}