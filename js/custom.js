document.addEventListener("DOMContentLoaded", function (event) {
    if (window.innerWidth < 992) {
        document.querySelector("body").classList.remove("menu-open");
    }
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }
    const btnFloat = document.querySelectorAll(".btn-hero"),
      body = document.querySelector("body"),
      navBtn = document.querySelector(".nav-hamburger");
    let isMenuAlreadyOpen = false;
    navBtn.addEventListener("click", () => {
      if (isMenuAlreadyOpen) {
        body.classList.remove("menu-open");
        isMenuAlreadyOpen = false;
        if (document.querySelector("#fullpage") !== null) {
          if (typeof fullpage_api !== "undefined") {
            fullpage_api.setAllowScrolling(true);
          }
        }
      } else {
        body.classList.add("menu-open");
        isMenuAlreadyOpen = true;
        if (document.querySelector("#fullpage") !== null) {
          if (typeof fullpage_api !== "undefined") {
            fullpage_api.setAllowScrolling(false);
          }
        }
      }
    });
    // floating btn
    // auto contact btn mobile
    const buttonFixed = document.querySelector(".btn-hero.fixed-ver"),
      hideSect = document.querySelectorAll(".hide-btn");
    const areIntersecting = (bounds1, bounds2) => bounds1.top < bounds2.bottom && bounds1.bottom > bounds2.top;
    const btnFloatMobileWrapper = document.querySelector(".btn-float");
    window.addEventListener("scroll", function () {
      let buttonRect = buttonFixed.getBoundingClientRect();
      if (window.innerWidth < 992) {
        if (btnFloatMobileWrapper !== null) {
          if (window.scrollY > btnFloatMobileWrapper.offsetTop + btnFloatMobileWrapper.offsetHeight) {
            buttonFixed.classList.add("float");
          } else {
            buttonFixed.classList.remove("float");
          }
        }
        for (let item of hideSect) {
          const itemRect = item.getBoundingClientRect();
          if (areIntersecting(itemRect, buttonRect)) {
            buttonFixed.style.visibility = "hidden";
            return;
          }
          buttonFixed.style.visibility = "visible";
        }
      }
    });
    let controller = new ScrollMagic.Controller();
    if (window.innerWidth < 992 && window.innerWidth > 767) {
      let scrollHorizontal = new TimelineLite();
      scrollHorizontal.to(".slider-mobile", 1, { x: "-70%" });
      let horizontalScroll = new ScrollMagic.Scene({
        triggerElement: ".slider",
        triggerHook: "onLeave",
        duration: 3000,
      })
        .setPin(".slider")
        .setTween(scrollHorizontal)
        .addTo(controller);
    } else {
      controller.destroy(true);
    }
    // fullpage
    if (document.querySelector("#fullpage") !== null) {
      if (window.innerWidth > 991) {
        new fullpage("#fullpage", {
          licenseKey: "B9KBJ-QX946-K90AH-0VAJ9-LEXLN",
          scrollHorizontallyKey: "bE1iMlJoYldFdWFXOD01dl9qQ01jMk55YjJ4c1NHOXlhWHB2Ym5SaGJHeDV2YnI=",
          scrollHorizontally: true,
          responsiveWidth: 993,
          scrollingSpeed: 1000,
          scrollBar: true,
          autoScrolling: true,
          scrollOverflow: false,
          onLeave: function (origin, destination, direction, trigger) {
            if (origin.index == 0 && direction == "down") {
              setTimeout(() => {
                btnFloat.forEach((btn) => btn.classList.add("float"));
              }, 500);
            } else if (origin.index == 1 && direction == "up") {
              setTimeout(() => {
                btnFloat.forEach((btn) => btn.classList.remove("float"));
              }, 350);
            } else if (origin.index == 5 && direction == "down") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "hidden"));
                document.querySelector(".custom-cursor-wrapper").classList.add("d-none");
              }, 250);
            } else if (origin.index == 6 && direction == "up") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "visible"));
              }, 500);
              setTimeout(() => {
                document.querySelector(".custom-cursor-wrapper").classList.remove("d-none");
              }, 250);
            } else if (origin.index == 6 && direction == "down") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "visible"));
                document.querySelector(".custom-cursor-wrapper").classList.remove("d-none");
              }, 250);
            } else if (origin.index == 7 && direction == "up") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "hidden"));
              }, 500);
              setTimeout(() => {
                document.querySelector(".custom-cursor-wrapper").classList.add("d-none");
              }, 250);
            } else if (origin.index == 9 && direction == "down") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "hidden"));
              }, 250);
            } else if (origin.index == 10 && direction == "up") {
              setTimeout(() => {
                btnFloat.forEach((btn) => (btn.style.visibility = "visible"));
              }, 800);
            } else if ((origin.index == 2 && direction == "down") || (origin.index == 4 && direction == "up")) {
              setTimeout(() => {
                document.querySelector(".custom-cursor-wrapper").classList.add("d-none");
              }, 250);
            } else if ((origin.index == 3 && direction == "down") || (origin.index == 3 && direction == "up")) {
              setTimeout(() => {
                document.querySelector(".custom-cursor-wrapper").classList.remove("d-none");
              }, 250);
            }
          },
        });
      }
    }
    // preloader
    let counter = 0,
      count = 0;
    const preloadCounter = document.querySelector(".preload-counter");
    if (preloadCounter !== null) {
      if (typeof fullpage_api !== "undefined") {
        fullpage_api.setAllowScrolling(false);
      }
      let progress = setInterval(() => {
        preloadCounter.innerHTML = count;
        document.querySelector(".preload-bar").style.width = count + "%";
        counter++;
        count++;
        counter++;
        count++;
        if (counter > 100) {
          clearInterval(progress);
          setTimeout(() => {
            document.querySelector(".preloader").classList.add("hide");
            document.querySelector("body").classList.remove("menu-open");
            if (typeof fullpage_api !== "undefined") {
              fullpage_api.setAllowScrolling(true);
            }
          }, 300);
        }
      }, 70);
    }
    // text hover section 3
    let text = document.querySelectorAll(".text-wrapper.ani-hover"),
      imgMouse = document.querySelector(".img-curson-wrapper"),
      parentSection = document.querySelector(".mouse-ani-sect"),
      moveTimer;
    let mouse = { x: Math.abs(document.documentElement.clientWidth * 0.5), y: Math.abs(document.documentElement.clientHeight * 0.15) };
    let mouseSmall = { x: 0, y: 0 };
    let pos = { x: 0, y: 0 };
    let mouseTravel = 0;
    let lastMouseX = -1;
    const speed = 0.1; // between 0 and 1
    if (parentSection !== null && window.innerWidth > 991) {
      const updatePosition = () => {
        pos.x += (mouse.x - pos.x) * speed;
        pos.y += (mouse.y - pos.y) * speed;
        if (mouseSmall.x > lastMouseX) {
          imgMouse.style.transform = "translate3d(" + pos.x + "px ," + pos.y + "px, 0) rotate(" + Math.abs(mouseTravel * 2.5) + "deg)";
        } else {
          imgMouse.style.transform = "translate3d(" + pos.x + "px ," + pos.y + "px, 0) rotate(-" + Math.abs(mouseTravel * 2.5) + "deg)";
        }
        lastMouseX = mouseSmall.x;
      };
      const updateCoordinates = (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      const updateCoordinatesSmall = (e) => {
        mouseSmall.x = e.clientX;
        mouseSmall.y = e.clientY;
        if (lastMouseX > -1) {
          mouseTravel += Math.abs(mouseSmall.x - lastMouseX) / 1000;
        }
        imgMouse.style.filter = "brightness(" + Math.abs(1 + mouseTravel) + ")";
      };
      const resetMouse = () => {
        imgMouse.style.filter = "brightness(1)";
        mouseTravel = 0;
        imgMouse.style.transform = "translate3d(" + pos.x + "px ," + pos.y + "px, 0) rotate(0deg)";
      };
      text.forEach((el) => {
        el.addEventListener("mouseover", () => {
          let bgColor = el.getAttribute("data-bg"),
            imgSrc = el.getAttribute("data-img");
          parentSection.style.backgroundColor = bgColor;
          el.parentNode.style.zIndex = 2;
          imgMouse.querySelector(".img-mouse").setAttribute("src", imgSrc);
          imgMouse.classList.add("active");
        });
        el.addEventListener("mousemove", (e) => {
          updateCoordinatesSmall(e);
          clearTimeout(moveTimer);
          moveTimer = setTimeout(() => {
            resetMouse();
          }, 100);
        });
        el.addEventListener("mouseout", () => {
          imgMouse.classList.remove("active");
          parentSection.style.backgroundColor = "transparent";
          el.parentNode.style.zIndex = 0;
          clearTimeout(moveTimer);
          moveTimer = setTimeout(() => {
            resetMouse();
          }, 100);
        });
      });
      parentSection.addEventListener("mousemove", (e) => {
        updateCoordinates(e);
      });
      function loop() {
        updatePosition();
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }
    if (document.querySelector(".process-slide") !== null) {
      let owl = $(".process-slide").owlCarousel({
        loop: false,
        dots: false,
        nav: false,
        mouseDrag: false,
        responsive: {
          0: {
            items: 1,
            margin: 24,
            onTranslated: function (e) {
              if (e.item.index + 1 >= e.item.count) {
                nextBtn.classList.add("disable");
              } else {
                nextBtn.classList.remove("disable");
              }
              if (e.item.index == 0) {
                prevBtn.classList.add("disable");
              } else {
                prevBtn.classList.remove("disable");
              }
            },
          },
          768: {
            items: 3,
            margin: 24,
            slideBy: "page",
            onTranslated: function (e) {
              if (e.page.index + 1 >= e.page.count) {
                nextBtn.classList.add("disable");
              } else {
                nextBtn.classList.remove("disable");
              }
              if (e.page.index == 0) {
                prevBtn.classList.add("disable");
              } else {
                prevBtn.classList.remove("disable");
              }
            },
          },
          1092: {
            items: 3,
            margin: 32,
            slideBy: "page",
            onTranslated: function (e) {
              if (e.page.index + 1 >= e.page.count) {
                nextBtn.classList.add("disable");
              } else {
                nextBtn.classList.remove("disable");
              }
              if (e.page.index == 0) {
                prevBtn.classList.add("disable");
              } else {
                prevBtn.classList.remove("disable");
              }
            },
          },
        },
      });
      const nextBtn = document.querySelector(".next-btn"),
        prevBtn = document.querySelector(".prev-btn");
      nextBtn.addEventListener("click", () => {
        if (!nextBtn.classList.contains("disable")) {
          owl.trigger("next.owl.carousel");
        }
      });
      prevBtn.addEventListener("click", () => {
        if (!prevBtn.classList.contains("disable")) {
          owl.trigger("prev.owl.carousel");
        }
      });
    }
    // dribble
    // Set the Access Token
    var accessToken = "ce66f5e279665d6abfcff204573d4796bc045134319c8f3da0dbb6e03bc07512";
    // Call Dribble v2 API
    $.ajax({
      url: "https://api.dribbble.com/v2/user/shots?access_token=" + accessToken,
      dataType: "json",
      type: "GET",
      success: function (data) {
        if (data.length > 0) {
          $.each(data.reverse(), function (i, val) {
            if (i > 4) {
              $(".shot-wrapper").prepend(
                '<a class="shot" target="_blank" href="' + val.html_url + '" title="' + val.title + '"><div class="title">' + val.title + '</div><img src="' + val.images.hidpi + '"/></a>'
              );
            }
          });
        } else {
          $(".shot-wrapper").append("<h1>No shots yet!</h1>");
        }
      },
    });
    // 3D rotation
    const modelViewer = document.getElementById("nika-section");
    const nika3d = document.querySelector(".nika-3d");
    if (modelViewer !== null) {
      modelViewer.addEventListener("mousemove", (e) => {
        let bounds = nika3d.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        if (x <= 0 && y >= 80 && y <= 320) {
          nika3d.setAttribute("camera-orbit", "25deg 0 0");
        } else if (x >= 380 && y >= 80 && y <= 320) {
          nika3d.setAttribute("camera-orbit", "-25deg 0 0");
        } else if (x >= 0 && x <= 380 && y <= 80) {
          nika3d.setAttribute("camera-orbit", "0 120deg 0");
        } else if (x >= 0 && x <= 380 && y > 320) {
          nika3d.setAttribute("camera-orbit", "0 60deg 0");
        } else if (x < 0 && y < 80) {
          nika3d.setAttribute("camera-orbit", "25deg 120deg 0");
        } else if (x < 0 && y > 320) {
          nika3d.setAttribute("camera-orbit", "25deg 60deg 0");
        } else if (x > 380 && y > 320) {
          nika3d.setAttribute("camera-orbit", "-25deg 60deg 0");
        } else if (x > 380 && y < 80) {
          nika3d.setAttribute("camera-orbit", "-25deg 120deg 0");
        } else {
          nika3d.setAttribute("camera-orbit", "0 0 0");
        }
      });
    }
    // Dribbble Btn
    dribbbleBtn = document.querySelector("#dribble-btn");
    dribbbleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      dribbbleBtn.classList.add("active");
      setTimeout(() => {
        window.open(dribbbleBtn.getAttribute("href"), "_blank");
      }, 1500);
    });
    dribbbleBtn.addEventListener("mouseenter", (e) => {
      dribbbleBtn.classList.remove("active");
    });
    // Active link navbar
    var current = location.pathname;
    document.querySelectorAll(".nav-link-box a").forEach((el) => {
      if (el.getAttribute("href") == window.location.href) {
        el.classList.add("has-active");
      }
    });
  });