import { css } from '@microsoft/fast-element';

export const parallaxItemStyles = css`
	:host {
		--container-min-height: 20rem;
		--container-max-height: 30rem;
		--item-min-height: 100%;
		--item-max-height: none;
		display: block;
		position: relative;
		height: 100%;
		width: 100%;
		min-height: var(--container-min-height);
		max-height: var(--container-max-height);
		overflow: hidden;
	}

	::slotted(*) {
		position: absolute;
		width: 100%;
		height: 100%;
		min-height: var(--item-min-height);
		max-height: var(--item-max-height);
		object-fit: cover;
		transition: none;
		margin: 0;
		padding: 0;
	}
`;