import { css } from '@microsoft/fast-element';

export const parallaxItemStyles = css`
	:host {
		display: block;
		position: relative;
		height: 100%;
		width: 100%;
		min-height: 20rem;
		max-height: 30rem;
		overflow: hidden;
	}

	::slotted(*) {
		position: absolute;
		width: 100%;
		height: 100%;
		max-height: none;
		object-fit: cover;
		transition: none;
	}
`;