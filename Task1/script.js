class ImageTextSection extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <section class="image-text-section">
        <div class="image-text-section__container">
          <img src="images/placeholder.jpg" alt="Product" class="image-text-section__img" />
          <div class="image-text-section__content">
            <h2 class="image-text-section__title">ELEGANTLY DESIGNED FOR EVERYDAY USE</h2>
            <p class="image-text-section__para">
              Whether you're heading to a meeting or strolling through the city, this piece is crafted to keep up with your style and pace. Minimalist in look but rich in functionality, it combines comfort with confidence.
            </p>
            <p class="image-text-section__para--extra">
              Built with premium materials and designed with intention, it's the kind of item you'll reach for every day. Because practical should never mean boring—and reliable should always feel luxurious.
            </p>
            <button class="image-text-section__button">Learn more</button>
          </div>
        </div>
      </section>
    `;

    this.section = this.querySelector('.image-text-section');
    this.button = this.querySelector('.image-text-section__button');
    this.extraPara = this.querySelector('.image-text-section__para--extra');

    this.button.addEventListener('click', () => {
      this.extraPara.classList.add('visible');
      this.button.classList.add('hidden');
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.section.classList.add('image-text-section--visible');
        } else {
          this.section.classList.remove('image-text-section--visible');
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(this.section);
  }
}

customElements.define('image-text-section', ImageTextSection);
