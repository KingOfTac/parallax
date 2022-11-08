import { css } from '@microsoft/fast-element';

export const styles = css`
	:host {
		display: block;
	}
	
	.elements {
		display: block;
		position: relative;
		min-height: 20rem;
		max-height: 30rem;
		box-sizing: border-box;
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