/**
 * WebnexaDev — Premium IT Services & Digital Solutions
 * Pure Vanilla JavaScript (Zero Build Steps)
 */

(function () {
  "use strict";

  // Central Configuration
  const CONFIG = {
    brandName: "WebnexaDev",
    whatsappNumber: "+91 7010957511",
    whatsappRaw: "917010957511",
    whatsappBaseUrl: "https://wa.me/917010957511",
    defaultHeroMessage: "Hi WebnexaDev! I'm interested in your IT services. I'd like to discuss a project.",
    defaultGeneralMessage: "Hi WebnexaDev! I'm interested in your IT services. Can we discuss my requirements?",
    sivaProjectMessage: "Hi WebnexaDev! I saw the Siva Construction project and would like to discuss a similar website for my business."
  };

  /**
   * Safe WhatsApp URL generator with encodeURIComponent
   */
  function buildWhatsAppUrl(message) {
    if (!message) return CONFIG.whatsappBaseUrl;
    return `${CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(message.trim())}`;
  }

  // DOM Elements
  const navbar = document.getElementById("navbar");
  const scrollProgressBar = document.getElementById("scroll-progress-bar");
  const mobileToggleBtn = document.getElementById("mobile-toggle-btn");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const currentYearSpan = document.getElementById("current-year");

  // Initialize Dynamic Copyright Year
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     1. Scroll Progress Bar & Sticky Header
     -------------------------------------------------------------------------- */
  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Progress Bar
    if (scrollProgressBar && docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollProgressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Sticky Navbar
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* --------------------------------------------------------------------------
     2. Mobile Menu Drawer
     -------------------------------------------------------------------------- */
  if (mobileToggleBtn && mobileDrawer) {
    mobileToggleBtn.addEventListener("click", function () {
      const isOpen = mobileDrawer.classList.contains("open");
      if (isOpen) {
        mobileDrawer.classList.remove("open");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileDrawer.classList.add("open");
        mobileToggleBtn.setAttribute("aria-expanded", "true");
      }
    });

    // Close when clicking mobile link
    const mobileLinks = mobileDrawer.querySelectorAll("a");
    mobileLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        mobileDrawer.classList.remove("open");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", function (e) {
      if (!navbar.contains(e.target)) {
        mobileDrawer.classList.remove("open");
        mobileToggleBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Scroll Reveal Animations (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
    revealElements.forEach(function (el) {
      el.classList.add("is-revealed");
    });
  }

  /* --------------------------------------------------------------------------
     4. Portfolio Interactive Device Viewport Toggle (Phone vs Desktop)
     -------------------------------------------------------------------------- */
  const btnDevicePhone = document.getElementById("btn-device-phone");
  const btnDeviceDesktop = document.getElementById("btn-device-desktop");
  const sivaPhoneFrame = document.getElementById("siva-phone-frame");
  const sivaDesktopFrame = document.getElementById("siva-desktop-frame");

  if (btnDevicePhone && btnDeviceDesktop && sivaPhoneFrame && sivaDesktopFrame) {
    btnDevicePhone.addEventListener("click", function () {
      btnDevicePhone.classList.add("active");
      btnDeviceDesktop.classList.remove("active");
      sivaPhoneFrame.style.display = "block";
      sivaDesktopFrame.style.display = "none";
    });

    btnDeviceDesktop.addEventListener("click", function () {
      btnDeviceDesktop.classList.add("active");
      btnDevicePhone.classList.remove("active");
      sivaDesktopFrame.style.display = "block";
      sivaPhoneFrame.style.display = "none";
    });
  }

  /* --------------------------------------------------------------------------
     5. Siva Construction Preview Modal & Category Filter
     -------------------------------------------------------------------------- */
  const btnOpenSivaModal = document.getElementById("btn-open-siva-modal");
  const sivaModal = document.getElementById("siva-preview-modal");
  const btnCloseSivaModal = document.getElementById("btn-close-siva-modal");
  const btnCloseSivaModalBottom = document.getElementById("btn-close-siva-modal-bottom");

  function openSivaModal() {
    if (sivaModal) {
      sivaModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeSivaModal() {
    if (sivaModal) {
      sivaModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (btnOpenSivaModal) btnOpenSivaModal.addEventListener("click", openSivaModal);
  if (btnCloseSivaModal) btnCloseSivaModal.addEventListener("click", closeSivaModal);
  if (btnCloseSivaModalBottom) btnCloseSivaModalBottom.addEventListener("click", closeSivaModal);

  if (sivaModal) {
    sivaModal.addEventListener("click", function (e) {
      if (e.target === sivaModal) closeSivaModal();
    });
  }

  // Category filter inside Siva modal
  const categoryFilterBtns = document.querySelectorAll(".modal-cat-btn");
  const modalProjectCards = document.querySelectorAll(".modal-project-card");

  categoryFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const selectedCat = btn.getAttribute("data-category");

      categoryFilterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");

      modalProjectCards.forEach(function (card) {
        const cardCat = card.getAttribute("data-category");
        if (selectedCat === "all" || cardCat === selectedCat) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Modal Viewport Switch (Desktop vs Mobile View)
  const modalTabDesktop = document.getElementById("modal-tab-desktop");
  const modalTabMobile = document.getElementById("modal-tab-mobile");
  const modalPreviewFrame = document.getElementById("modal-preview-frame");

  if (modalTabDesktop && modalTabMobile && modalPreviewFrame) {
    modalTabDesktop.addEventListener("click", function () {
      modalTabDesktop.classList.add("active");
      modalTabMobile.classList.remove("active");
      modalPreviewFrame.classList.remove("mobile-mode");
    });

    modalTabMobile.addEventListener("click", function () {
      modalTabMobile.classList.add("active");
      modalTabDesktop.classList.remove("active");
      modalPreviewFrame.classList.add("mobile-mode");
    });
  }

  /* --------------------------------------------------------------------------
     6. Privacy Policy Modal
     -------------------------------------------------------------------------- */
  const btnOpenPrivacy = document.getElementById("btn-open-privacy");
  const privacyModal = document.getElementById("privacy-modal");
  const btnClosePrivacy = document.getElementById("btn-close-privacy");
  const btnClosePrivacyGotIt = document.getElementById("btn-close-privacy-gotit");

  function openPrivacyModal() {
    if (privacyModal) {
      privacyModal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closePrivacyModal() {
    if (privacyModal) {
      privacyModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (btnOpenPrivacy) btnOpenPrivacy.addEventListener("click", openPrivacyModal);
  if (btnClosePrivacy) btnClosePrivacy.addEventListener("click", closePrivacyModal);
  if (btnClosePrivacyGotIt) btnClosePrivacyGotIt.addEventListener("click", closePrivacyModal);

  if (privacyModal) {
    privacyModal.addEventListener("click", function (e) {
      if (e.target === privacyModal) closePrivacyModal();
    });
  }

  // Escape key closes modals
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeSivaModal();
      closePrivacyModal();
    }
  });

  /* --------------------------------------------------------------------------
     7. FAQ Accordion Logic
     -------------------------------------------------------------------------- */
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const questionBtn = item.querySelector(".faq-question");
    if (!questionBtn) return;

    questionBtn.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close other items
      faqItems.forEach(function (otherItem) {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          const btn = otherItem.querySelector(".faq-question");
          if (btn) btn.setAttribute("aria-expanded", "false");
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove("active");
        questionBtn.setAttribute("aria-expanded", "false");
      } else {
        item.classList.add("active");
        questionBtn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. Project Enquiry Form Validation & Dual Pathways
     -------------------------------------------------------------------------- */
  const enquiryForm = document.getElementById("enquiry-form");
  const btnContinueWhatsApp = document.getElementById("btn-continue-whatsapp");
  const formSuccessAlert = document.getElementById("form-success-alert");
  const formSuccessMsg = document.getElementById("form-success-msg");

  // Validate form fields
  function validateForm() {
    let isValid = true;

    const fields = [
      { id: "fullName", errorId: "error-fullName", validate: (v) => v.trim().length > 0 },
      { 
        id: "email", 
        errorId: "error-email", 
        validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) 
      },
      { id: "phone", errorId: "error-phone", validate: (v) => v.trim().length >= 7 },
      { id: "service", errorId: "error-service", validate: (v) => v.trim().length > 0 },
      { id: "budget", errorId: "error-budget", validate: (v) => v.trim().length > 0 },
      { id: "description", errorId: "error-description", validate: (v) => v.trim().length >= 10 }
    ];

    fields.forEach(function (field) {
      const input = document.getElementById(field.id);
      const errorEl = document.getElementById(field.errorId);
      if (!input) return;

      const passed = field.validate(input.value);
      if (!passed) {
        input.classList.add("is-invalid");
        if (errorEl) errorEl.classList.add("active");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
        if (errorEl) errorEl.classList.remove("active");
      }
    });

    return isValid;
  }

  // Clear validation error on input
  const formInputs = document.querySelectorAll(".form-input, .form-select, .form-textarea");
  formInputs.forEach(function (input) {
    input.addEventListener("input", function () {
      input.classList.remove("is-invalid");
      const errorEl = document.getElementById(`error-${input.id}`);
      if (errorEl) errorEl.classList.remove("active");
    });
  });

  // Pathway A: Submit Enquiry
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
        const firstInvalid = enquiryForm.querySelector(".is-invalid");
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const submitBtn = enquiryForm.querySelector("button[type='submit']");
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Submitting...";

      // Generate reference ID
      const refId = "ENQ-" + Date.now().toString(36).toUpperCase() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase();

      const payload = {
        refId: refId,
        fullName: document.getElementById("fullName").value.trim(),
        businessName: document.getElementById("businessName") ? document.getElementById("businessName").value.trim() : "",
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        service: document.getElementById("service").value,
        budget: document.getElementById("budget").value,
        description: document.getElementById("description").value.trim(),
        timestamp: new Date().toISOString()
      };

      // Store in localStorage for development and client persistence
      try {
        const existing = JSON.parse(localStorage.getItem("webnexadev_enquiries") || "[]");
        existing.unshift(payload);
        localStorage.setItem("webnexadev_enquiries", JSON.stringify(existing.slice(0, 50)));
      } catch (err) {
        console.warn("Storage error:", err);
      }

      // Simulate short network delay for natural UX
      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        if (formSuccessAlert && formSuccessMsg) {
          formSuccessMsg.textContent = `Thank you! Your project enquiry has been received (Ref: ${refId}). Our technical team will review your requirements and reach out promptly.`;
          formSuccessAlert.style.display = "block";
          formSuccessAlert.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        enquiryForm.reset();
      }, 600);
    });
  }

  // Pathway B: Continue on WhatsApp with Dynamic Form Data
  if (btnContinueWhatsApp) {
    btnContinueWhatsApp.addEventListener("click", function () {
      const nameVal = (document.getElementById("fullName")?.value || "").trim() || "[Customer Name]";
      const businessVal = (document.getElementById("businessName")?.value || "").trim() || "[Business Name]";
      const serviceVal = document.getElementById("service")?.value || "[Selected Service]";
      const budgetVal = document.getElementById("budget")?.value || "[Selected Budget]";
      const detailsVal = (document.getElementById("description")?.value || "").trim() || "[Project Description]";

      const message = `Hi WebnexaDev! I'd like to discuss a project.
Name: ${nameVal}
Business: ${businessVal}
Service: ${serviceVal}
Budget: ${budgetVal}
Project Details: ${detailsVal}
Please let me know the next steps.`;

      const url = buildWhatsAppUrl(message);
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  // Initialize Lucide Icons if script is loaded
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

})();
