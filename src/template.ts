import { elements, html, ref, slotted } from '@microsoft/fast-element';

import type { Parallax } from './parallax.js';
import type { ElementViewTemplate } from '@microsoft/fast-element';

export const template = <T extends Parallax>(): ElementViewTemplate<T> => {
	return html<T>`
		<div class="elements">
			<slot ${slotted({ property: 'elements', filter: elements() })}></slot>
		</div>
	`;
}