// Load canvas-confetti
const script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
document.head.appendChild(script);

function showModal(
  text = "Message sent successfully! I'll get back to you soon."
) {
  document.getElementById("modal").classList.remove("hidden");
  document.getElementById("modal-text").textContent = text;
}

function showContact() {
  document.getElementById("contact").classList.remove("hidden");
}

function closeContact() {
  document.getElementById("contact").classList.add("hidden");
}

function toggleSubmitButton(disabled = false, text = "Send Message") {
  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector("span");
  submitBtn.disabled = disabled;
  btnText.textContent = text;
}

document
  .getElementById("contactForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    toggleSubmitButton(true, "Sending...");

    try {
      const formData = {
        name: this.querySelector("#name").value.trim(),
        email: this.querySelector("#email").value.trim(),
        subject: this.querySelector("#subject").value.trim(),
        message: this.querySelector("#message").value.trim(),
      };

      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        showModal("All fields are required");
        toggleSubmitButton(false);
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        showModal("Please enter a valid email address");
        toggleSubmitButton(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      this.reset();
      showModal();
      toggleSubmitButton(false);

      setTimeout(() => {
        closeContact();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      showModal(error.message || "Failed to send message. Please try again.");
      toggleSubmitButton(false);
    }
  });
