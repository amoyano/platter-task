class BestSellers extends HTMLElement {
  constructor() {
    super();
    this.container = null;
    this.showMoreBtn = null;
    this.additionalCards = null;
    this.showMoreText = '';
    this.showLessText = '';
    this.isExpanded = false;
  }

  connectedCallback() {
    this.container = this.querySelector('.product-container');
    this.showMoreBtn = this.querySelector('.show-more-less');
    this.additionalCards = this.querySelector('.additional-cards');

    if (this.showMoreBtn) {
      this.showMoreText = this.showMoreBtn.dataset.showMoreText || 'Show More';
      this.showLessText = this.showMoreBtn.dataset.showLessText || 'Show Less';
      this.showMoreBtn.addEventListener('click', this.toggleCards);
      this.showMoreBtn.addEventListener('keydown', this.handleKeyDown);

      // Hide button if no additional products
      if (this.additionalCards.children.length === 0) {
        this.showMoreBtn.style.display = 'none';
      }
    }
  }

  disconnectedCallback() {
    if (this.showMoreBtn) {
      this.showMoreBtn.removeEventListener('click', this.toggleCards);
      this.showMoreBtn.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.toggleCards();
    }
  };

  toggleCards = () => {
    this.isExpanded = !this.isExpanded;
    this.additionalCards.classList.toggle('max-h-0');
    this.additionalCards.classList.toggle('max-h-[1000px]');

    this.showMoreBtn.setAttribute('aria-expanded', this.isExpanded.toString());
    this.additionalCards.setAttribute(
      'aria-hidden',
      (!this.isExpanded).toString(),
    );

    this.showMoreBtn.textContent = this.isExpanded
      ? this.showLessText
      : this.showMoreText;
  };
}

customElements.define('best-sellers', BestSellers);
