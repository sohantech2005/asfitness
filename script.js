document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("admissionForm");
  const message = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name  = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const plan  = document.getElementById("plan").value;

    if (!name || !email || !phone || !plan) {
      showMessage("Please fill all fields.", "red");
      return;
    }

    // ✅ WhatsApp Message
    const whatsappNumber = "918001073839"; // gym number
    const text = 
`New Gym Admission 💪

Name: ${name}
Email: ${email}
Phone: ${phone}
Plan: ${plan}`;

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    // Open WhatsApp
    window.open(whatsappURL, "_blank");

    // Send to Google Sheet
    sendToGoogleSheet({ name, email, phone, plan });

    showMessage("Form submitted successfully ✅", "#25D366");
    form.reset();
  });

  function showMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
  }

});
function sendToGoogleSheet(data) {
  fetch("https://script.google.com/macros/s/AKfycbwUuJfDmSuBG5XKFbjZaCEMTQoebPDhJAtOAOEuWisR-jODN5ue_36E3gWRafNh-f-G_A/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(res => console.log("Saved to sheet"))
  .catch(err => console.error(err));
}
