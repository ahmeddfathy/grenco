// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Contact form submission
  const contactForm = document.querySelector('.contact-form-detailed');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;

      if (name && email && subject) {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
      }
    });
  }

  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // Toggle current item only if it wasn't active
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Department email links
  const departmentCards = document.querySelectorAll('.department-card');
  departmentCards.forEach(card => {
    const emailLink = card.querySelector('.btn');
    if (emailLink) {
      emailLink.addEventListener('click', (e) => {
        // Email link will work naturally with mailto:
        // No need to prevent default
      });
    }
  });

  // Smooth scroll to contact form
  const contactButtons = document.querySelectorAll('a[href="#contact"]');
  contactButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
