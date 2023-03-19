const maxParticles = 100;
window.addEventListener("load", () => {
  particlesJS.load("particles-js", "/particles/particles.json", function () {
    const pJSIndex = 0;
    const pJS = pJSDom[pJSIndex].pJS;
    pJS.particles.array.splice(0, pJS.particles.array.length - maxParticles);
    pJS.interactivity.el.addEventListener("click", () => {
      pJS.particles.array.splice(0, pJS.particles.array.length - maxParticles);
    });
  });
});

var elem = document.querySelector("#particles-js");

function callback(mutationList, observer) {
  mutationList.forEach(function (mutation) {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      // handle class change
      try {
        if (document.body.classList.contains("v1")) {
          elem.setAttribute("style", "opacity: 1; visibility: visible;");
        } else {
          elem.setAttribute("style", "opacity: 0; visibility: hidden;");
        }
      } catch {}
    }
  });
}

const observer = new MutationObserver(callback);
observer.observe(document.body, {
  attributes: true
});
