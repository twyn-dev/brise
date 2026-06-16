export class Modal {
	private readonly element: HTMLElement;

	constructor(element: HTMLElement) {
		this.element = element;
	}

	open(): void {
		this.element.removeAttribute('hidden');
		this.element.setAttribute('aria-modal', 'true');
	}

	close(): void {
		this.element.setAttribute('hidden', '');
		this.element.removeAttribute('aria-modal');
	}
}
