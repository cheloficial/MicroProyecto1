//SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth"
      });
    });
  });

//CAROUSEL
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const nav = document.querySelector('.carousel__nav');
const dots = Array.from(nav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//arrage the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide,targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//when click left, move slides to the left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = nav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

//when click right, move slides to the right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = nav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);

})

//when click selector move to that slide
nav.addEventListener('click', e => {
    const targetDot = e.target.closest('button');
    if(!targetDot) return;
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = nav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);
})

//SKILLS
fetch('skills.json')
  .then(response => response.json())
  .then(data => {
    // Create the HTML for the skills section
    let skillsHTML1 = '';
    let skillsHTML2 = '';
    data.skills.forEach((skill, index) => {
      let width;
      switch (skill.level) {
        case "Expert":
          width = 100;
          break;
        case "Advanced":
          width = 75;
          break;
        case "Intermediate":
          width = 50;
          break;
        case "Beginner":
          width = 25;
          break;
      }
      let skillsHTML = `
        <div class="skill">
          <h3>${skill.name}</h3>
          <div class="bar">
            <span style="width: ${width}%"></span>
          </div>
        </div>
      `;
      if (index % 2 === 0) {
        skillsHTML1 += skillsHTML;
      } else {
        skillsHTML2 += skillsHTML;
      }
    });

    // Add the skills HTML to the page
    document.querySelector('.skill-column:first-child').innerHTML = skillsHTML1;
    document.querySelector('.skill-column:last-child').innerHTML = skillsHTML2;
  });

//CONTACTME
const form = document.querySelector("#contact-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");

form.addEventListener("submit", e => {
  e.preventDefault();

  const name = nameInput.value;
  const email = emailInput.value;
  const message = messageInput.value;

  if (!name || !email || !message) {
    alert('All fields are required.');
    return;
  }

  if (/[^a-zA-Z ]/.test(name)) {
    alert("Name cannot contain special characters.");
    return;
  }

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    alert("Email is invalid.");
    return;
  }
  if (message.length > 250) {
    alert("Message cannot be longer than 250 words.");
    return;
  }
  
  alert(`Your request has been sent\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);
});