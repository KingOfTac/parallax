import { ParallaxItem } from './parallax.js';
import { parallaxItemStyles } from './parallax.styles.js';
import { parallaxItemTemplate } from './parallax.template.js';

export const parallaxItemDefinition = ParallaxItem.compose({
	name: 'neutron-parallax',
	template: parallaxItemTemplate(),
	styles: parallaxItemStyles,
	registry: customElements
});