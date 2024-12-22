document
  .querySelector('a[href="#projects"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#projects").scrollIntoView({
      behavior: "smooth",
    });
  });
