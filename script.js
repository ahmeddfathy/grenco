// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Form submissions
const subscribeForm = document.querySelector(".subscribe-form");
if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = subscribeForm.querySelector('input[type="email"]').value;
    if (email) {
      alert("Thank you for subscribing! We will send you updates soon.");
      subscribeForm.reset();
    }
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".product-card, .feature-item, .testimonial-card, .about-card, .news-card"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});

// Active navigation link highlighting
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.pageYOffset >= sectionTop &&
      window.pageYOffset < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add active class styling
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: var(--primary-green);
    }
    .nav-link.active::after {
        width: 100%;
    }
    @media (max-width: 968px) {
        .nav-links.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--white);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            gap: 1rem;
        }
    }
`;
document.head.appendChild(style);

// Internationalization
const translationsBasePath = "translations";
const pageId = document.body?.dataset.page || "home";
const langButton = document.querySelector(".lang-btn");
let translationsCache = { common: null, page: null };
let currentLang = localStorage.getItem("site-lang") || "en";

const toggleLanguage = () => {
  const nextLang = currentLang === "en" ? "ar" : "en";
  applyLanguage(nextLang);
};

const applyLanguage = (lang, persist = true) => {
  if (!translationsCache) return;
  currentLang = lang;
  if (persist) {
    localStorage.setItem("site-lang", lang);
  }

  document.documentElement.lang = lang === "ar" ? "ar" : "en";
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  if (langButton) {
    langButton.textContent = lang === "ar" ? "English" : "العربية";
  }

  applyTranslations(translationsCache.common, lang);
  applyTranslations(translationsCache.page, lang);
};

const applyTranslations = (group, lang) => {
  if (!group) return;
  if (group.text) {
    group.text.forEach((entry) => {
      const elements = document.querySelectorAll(entry.selector);
      elements.forEach((el) => {
        el.textContent = entry[lang] ?? el.textContent;
      });
    });
  }

  if (group.html) {
    group.html.forEach((entry) => {
      const elements = document.querySelectorAll(entry.selector);
      elements.forEach((el) => {
        el.innerHTML = entry[lang] ?? el.innerHTML;
      });
    });
  }

  if (group.attributes) {
    group.attributes.forEach((entry) => {
      const elements = document.querySelectorAll(entry.selector);
      elements.forEach((el) => {
        if (entry.attribute) {
          el.setAttribute(
            entry.attribute,
            entry[lang] ?? el.getAttribute(entry.attribute)
          );
        }
      });
    });
  }
};

const fetchTranslationFile = async (path) => {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Unable to load ${path} (status ${response.status})`);
  }
  return response.json();
};

const loadTranslations = async () => {
  const commonPath = `${translationsBasePath}/common.json`;
  const pagePath = `${translationsBasePath}/${pageId}.json`;

  try {
    translationsCache.common = await fetchTranslationFile(commonPath);
  } catch (error) {
    console.error("Failed to load common translations:", error);
  }

  try {
    translationsCache.page = await fetchTranslationFile(pagePath);
  } catch (error) {
    console.warn(`No specific translations for page "${pageId}"`, error);
    translationsCache.page = null;
  }

  applyLanguage(currentLang, false);

  if (langButton) {
    langButton.addEventListener("click", toggleLanguage);
  }
};

loadTranslations();
