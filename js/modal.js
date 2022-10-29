var currentTab = 0;
showTab(currentTab);

function formSubmit(token) {
  document.getElementById("submitBtn").disabled = true;
  $.ajax({
    url: "https://inquiry.odama.io/api/v2-inquiry",
    type: "post",
    data: $("#inqury-form").serialize(),
    success: function (response) {
      document.getElementById("submitBtn").disabled = false;
      if (response.alert == "success") {
        document.getElementById("inqury-form").style.display = "none";
        document.getElementById("inqury-success").style.display = "flex";
      }
      console.log(response);
    },
  });
}

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  document.querySelector(".step.total").innerHTML = x.length;
  document.querySelector(".step.current").innerHTML = n + 1;
  x[n].style.display = "flex";
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "block";
  } else {
    document.getElementById("nextBtn").style.display = "block";
    document.getElementById("submitBtn").style.display = "none";
  }
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  if (n == 1 && !validateForm()) return false;
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  if (currentTab >= x.length) {
    return false;
  }
  showTab(currentTab);
}

function validateForm() {
  let x,
    y,
    i,
    valid = true,
    flag = 0,
    textarea,
    checkbox = false;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  textarea = x[currentTab].getElementsByTagName("textarea");

  for (i = 0; i < y.length; i++) {
    if (y[i].getAttribute("type") == "checkbox") {
      checkbox = true;
      if (y[i].checked) {
        flag++;
      }
    } else {
      if (y[i].value == "" && !y[i].classList.contains("d-none")) {
        y[i].classList.add("invalid");
        valid = false;
      }
    }
  }

  for (i = 0; i < textarea.length; i++) {
    if (textarea[i].value == "") {
      textarea[i].classList.add("invalid");
      valid = false;
    }
  }

  if (checkbox) {
    if (flag == 0) {
      valid = false;
    } else {
      if (document.querySelector("#otherInput").value == "" && !document.querySelector("#otherInput").classList.contains("d-none")) {
        valid = false;
      } else {
        valid = true;
      }
    }
  }
  return valid;
}

// other state
const other = document.querySelector("#other");
other.addEventListener("change", () => {
  if (other.checked) {
    document.querySelector("#otherInput").classList.remove("d-none");
  } else {
    document.querySelector("#otherInput").classList.add("d-none");
  }
});

// modal trigger btn
let isModalAlreadyOpen = false;
const body = document.querySelector("body"),
  modalBtn = document.querySelectorAll(".modal-btn"),
  modalCloseBtn = document.querySelector(".close-modal"),
  modalBtnNav = document.querySelector(".btn-nav.modal-btn");

let hideModal = () => {
  if (isModalAlreadyOpen === true) {
    modalCloseBtn.click();
    isModalAlreadyOpen = false;
    body.classList.remove("menu-open");
  }
};

modalBtn.forEach((el) => {
  el.addEventListener("click", () => {
    if (isModalAlreadyOpen) {
      body.classList.remove("menu-open");
      isModalAlreadyOpen = false;
      if (document.querySelector("#fullpage") !== null) {
        fullpage_api.setAllowScrolling(true);
      }
    } else {
      body.classList.add("menu-open");
      isModalAlreadyOpen = true;
      if (document.querySelector("#fullpage") !== null) {
        fullpage_api.setAllowScrolling(false);
      }
    }
  });
});

document.querySelector(".form-wrapper").addEventListener("click", (e) => {
  if (!document.getElementById("contactForm").contains(e.target)) {
    hideModal();
  }
});

modalCloseBtn.addEventListener("click", (e) => {
  isModalAlreadyOpen = false;
  body.classList.remove("menu-open");
  if (document.querySelector("#fullpage") !== null) {
    fullpage_api.setAllowScrolling(true);
  }
});

modalBtnNav.addEventListener("click", (e) => {
  document.querySelector(".nav-hamburger").click();
  body.classList.add("menu-open");
  isModalAlreadyOpen = true;
  if (document.querySelector("#fullpage") !== null) {
    fullpage_api.setAllowScrolling(false);
  }
});
