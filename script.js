window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


 // Function to handle smooth scrolling with offset
 function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const headerHeight = document.querySelector('header').offsetHeight;
    window.scrollTo({
      behavior: 'smooth',
      top: section.offsetTop - headerHeight
    });
  }
}

// Add event listeners to navigation links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.Navigation a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').substring(1); // Remove the # symbol
      scrollToSection(targetId);
    });
  });
});

// Return to top button 

let mybutton = document.getElementById("return-to-top");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function returnToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Menu Slide

const imgInner = document.querySelector(".img-wrap img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const arrImg = [
    "./images/menu-1.jpg",
    "./images/menu-2.jpg",
    "./images/menu-3.jpg",
    "./images/menu-4.jpg",
    "./images/menu-5.jpg",

];
let currentIndex = 0;
next.addEventListener("click" , function(){
   
    if(currentIndex < arrImg.length - 1){
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    imgInner.src = arrImg[currentIndex];

});

prev.addEventListener("click", function (){
    if(currentIndex > 0){
        currentIndex--;
    } else {
        currentIndex = arrImg.length - 1;
    }
    imgInner.src = arrImg[currentIndex];
})

// Recipe-Swiper

var swiper = new Swiper('.swiper', {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

//Order button click

document.getElementById("order-button1").addEventListener("click", function() {
  // Redirect to the menu page
  window.location.href = "./menu/menu.html";
});

//  //login button click
//  document.getElementById("login-button").addEventListener("click", function() {
//   // Redirect to the login page
//   window.location.href = "login.html";
// });

//Sign up button click
document.getElementById("sign-up-button").addEventListener("click", function() {
  // Redirect to the signup page
  window.location.href = "signup.html";
});


// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Subscribe section
// Retrieve used emails from local storage or initialize an empty array
let usedEmails = JSON.parse(localStorage.getItem("usedEmails")) || [];

function validateForm(event) {
  event.preventDefault(); // Prevent the default form submission behavior 
  
// Form Validation For Empty Inputs 
  var x = document.forms["myForm"]["email"].value;
  if (x == "") {
    var alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert");
    alertDiv.textContent = "Your email address cannot be blank";
    document.body.appendChild(alertDiv);
    setTimeout(function () {
      alertDiv.style.display = "none";
    }, 1000); // Hide the alert after 1 second
    return false;
  } else if (usedEmails.includes(x)) {
    var alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert");
    alertDiv.textContent = "This email is already used";
    document.body.appendChild(alertDiv);
    setTimeout(function () {
      alertDiv.style.display = "none";
    }, 1000); // Hide the alert after 1 second
    return false;
  } else {
    usedEmails.push(x);
    localStorage.setItem("usedEmails", JSON.stringify(usedEmails));

    var alertDiv = document.createElement("div");
    alertDiv.classList.add("custom-alert");
    alertDiv.textContent = "Code sent to email! Enjoy 25% off to your next purchase!";
    document.body.appendChild(alertDiv);
    setTimeout(function () {
      alertDiv.style.display = "none";
    }, 1000); // Hide the alert after 1 second
    return true;
  }
}

// Login modal

    // Toggle between forms
    document.querySelectorAll('.toggle-link').forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault();
          const toggleTarget = this.getAttribute('data-toggle');
          document.querySelectorAll('.toggle-form').forEach(form => {
              form.style.display = form.getAttribute('data-toggle') === toggleTarget ? 'block' : 'none';
          });
      });
  });

 document.addEventListener('DOMContentLoaded', function() {
        const Validator = {
            isRequired: function(value) {
                return value.trim() !== '';
            },
            isEmail: function(value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value);
            },
            minLength: function(value, min) {
                return value.length >= min;
            }
        };

        function showError(element, message) {
            const formGroup = element.closest('.form-group');
            const formMessage = formGroup.querySelector('.form-message');
            formMessage.textContent = message;
            formMessage.style.color = 'red';
        }

        function clearError(element) {
            const formGroup = element.closest('.form-group');
            const formMessage = formGroup.querySelector('.form-message');
            formMessage.textContent = '';
        }

        const loginForm = document.getElementById('loginForm');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const emailInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const rememberMeCheckbox = document.getElementById('RememberMe');

            let isFormValid = true;

            // Validate email
            if (!Validator.isRequired(emailInput.value)) {
                showError(emailInput, 'Email is required.');
                isFormValid = false;
            } else if (!Validator.isEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address.');
                isFormValid = false;
            } else {
                clearError(emailInput);
            }

            // Validate password
            if (!Validator.isRequired(passwordInput.value)) {
                showError(passwordInput, 'Password is required.');
                isFormValid = false;
            } else if (!Validator.minLength(passwordInput.value, 6)) {
                showError(passwordInput, 'Password must be at least 6 characters long.');
                isFormValid = false;
            } else {
                clearError(passwordInput);
            }

            if (isFormValid) {
                // Handle "Remember Me" functionality
                if (rememberMeCheckbox.checked) {
                    localStorage.setItem('rememberMe', 'true');
                    localStorage.setItem('email', emailInput.value);
                } else {
                    localStorage.removeItem('rememberMe');
                    localStorage.removeItem('email');
                }

                // Submit the form or handle the login process here
                console.log('Form is valid. Submitting...');
                // loginForm.submit(); // Uncomment this line to actually submit the form
            }
        });

        // Load remembered email if "Remember Me" was checked previously
        if (localStorage.getItem('rememberMe') === 'true') {
            rememberMeCheckbox.checked = true;
            emailInput.value = localStorage.getItem('email') || '';
        }
    });

    // Forgot Password modal
    document.addEventListener('DOMContentLoaded', function() {
      const Validator = {
          isRequired: function(value) {
              return value.trim() !== '';
          },
          isEmail: function(value) {
              const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailPattern.test(value);
          }
      };

      function showError(element, message) {
          const formGroup = element.closest('.form-password');
          const errorMessage = formGroup.querySelector('small');

          errorMessage.textContent = message;
          errorMessage.style.display = 'block';
      }

      function clearError(element) {
          const formGroup = element.closest('.form-password');
          const errorMessage = formGroup.querySelector('small');

          errorMessage.style.display = 'none';
      }

      const forgotPasswordForm = document.getElementById('forgot-password-form');

      forgotPasswordForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const emailInput = document.getElementById('email-password');

          let isFormValid = true;

          // Validate email
          if (!Validator.isRequired(emailInput.value)) {
              showError(emailInput, 'The Email field is required.');
              isFormValid = false;
          } else if (!Validator.isEmail(emailInput.value)) {
              showError(emailInput, 'Please enter a valid email address.');
              isFormValid = false;
          } else {
              clearError(emailInput);
          }

          if (isFormValid) {
              // Handle the form submission process here
              console.log('Form is valid. Submitting...');
              forgotPasswordForm.submit(); 
              alert("Link sent! Please check your email address.");                  
          }
      });
  });
