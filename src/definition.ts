import { Parallax } from './parallax.js';
import { styles } from './styles.js';
import { template } from './template.js';

export const parallaxDefinition = Parallax.compose({
	name: 'neutron-parallax',
	template: template(),
	styles: styles,
	registry: customElements
});