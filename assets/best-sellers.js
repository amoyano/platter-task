class BestSellers extends HTMLElement {
  constructor() {
    super();
    this.container = null;
    this.showMoreBtn = null;
    this.additionalCards = null;
  }

  connectedCallback() {
    this.container = this.querySelector('.product-container');
    this.showMoreBtn = this.querySelector('button');
    this.additionalCards = this.querySelector('.additional-cards');

    if (this.showMoreBtn) {
      this.showMoreBtn.addEventListener('click', this.toggleCards);
    }
  }

  disconnectedCallback() {
    if (this.showMoreBtn) {
      this.showMoreBtn.removeEventListener('click', this.toggleCards);
    }
  }

  toggleCards = () => {
    this.additionalCards.classList.toggle('max-h-0');
    this.additionalCards.classList.toggle('max-h-[1000px]');

    const currentText = this.showMoreBtn.textContent.trim();
    this.showMoreBtn.textContent =
      currentText === 'Show More' ? 'Show Less' : 'Show More';
  };
}

customElements.define('best-sellers', BestSellers);
