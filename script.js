document.addEventListener("DOMContentLoaded", () => {

  // 🔥 MAKE NAVIGATION GLOBAL
  window.enterDashboard = function () {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
  };

  const form = document.getElementById("bloodForm");

  if (!form) {
    console.error("Form not found");
    return;
  }

  // ==========================
  // ✅ FORM SUBMIT (ALREADY OK)
  // ==========================
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const donor = {
      donorName: document.getElementById("name").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      contact: document.getElementById("contact").value,
      branch: document.getElementById("branch").value,
      blood: document.getElementById("bloodGroup").value,
    };

    alert("🎉 Congratulations!\nThank you for registration.\nYour donor details are saved successfully.");

    await fetch("http://localhost:5000/api/donors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donor),
    });

    form.reset();

    // 🔥 AFTER SUBMIT COUNT UPDATE
    loadDonorCount();
  });

  // ==========================
  // ✅ TOTAL DONORS COUNT CODE
  // ==========================
  async function loadDonorCount() {
  try {
    const res = await fetch("http://localhost:5000/api/donors");
    const result = await res.json();

    console.log("Donors response:", result);

    // 🔥 UNIVERSAL FIX
    const donors = Array.isArray(result)
      ? result
      : result.data || [];

    document.getElementById("donorCount").innerText = donors.length;
  } catch (err) {
    console.error("Count error:", err);
  }
}

  // 🔥 PAGE LOAD TIME COUNT
  loadDonorCount();

});
