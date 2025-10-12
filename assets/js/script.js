'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

/* === Portfolio Modal Logic === */
function openModal(event, element) {
  event.preventDefault();

  const title = element.getAttribute('data-title');
  const image = element.getAttribute('data-image');
  const description = element.getAttribute('data-description');
  const details = element.getAttribute('data-details');

  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalImage').src = image;
  document.getElementById('modalImage').alt = title;
  document.getElementById('modalDescription').textContent = description;
  document.getElementById('modalDetails').innerHTML = details;

  const modal = document.getElementById('customModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('customModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}


/* === Resume Modal Logic === */
document.addEventListener("DOMContentLoaded", () => {
  const resumeModal = document.getElementById("resumeModal");
  const modalImg = document.getElementById("resumeModalImg");
  const modalCaption = document.getElementById("resumeModalCaption");
  const closeBtn = document.querySelector(".resume-close-btn");
  const nextBtn = document.querySelector(".resume-next-btn");
  const prevBtn = document.querySelector(".resume-prev-btn");
  const thumbs = document.querySelectorAll(".resume-thumb");

  let currentIndex = 0;

  // Open modal with selected image
  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      currentIndex = index;
      openResumeModal();
    });
  });

  function openResumeModal() {
    const imgData = thumbs[currentIndex];
    modalImg.src = imgData.dataset.full;
    modalCaption.textContent = imgData.dataset.caption;
    resumeModal.classList.add("active");
    document.body.style.overflow = "hidden"; // disable scroll behind modal
  }

  function closeResumeModal() {
    resumeModal.classList.remove("active");
    document.body.style.overflow = ""; // restore scroll
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % thumbs.length;
    openResumeModal();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + thumbs.length) % thumbs.length;
    openResumeModal();
  }

  // Button handlers
  nextBtn.addEventListener("click", showNext);
  prevBtn.addEventListener("click", showPrev);
  closeBtn.addEventListener("click", closeResumeModal);

  // Close when clicking outside the modal content
  resumeModal.addEventListener("click", (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!resumeModal.classList.contains("active")) return;

    if (e.key === "Escape") closeResumeModal();
    else if (e.key === "ArrowRight") showNext();
    else if (e.key === "ArrowLeft") showPrev();
  });
});
