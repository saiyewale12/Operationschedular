const form = document.getElementById("scheduleForm");
const schedulesDiv = document.getElementById("schedules");

// Fetch and display schedules
async function fetchSchedules() {
  const res = await fetch("/api/schedules");
  const schedules = await res.json();
  schedulesDiv.innerHTML = schedules
    .map(
      (schedule) => `
        <p>
          <strong>Operation ID:</strong> ${schedule.operationId} <br>
          <strong>Anesthesia:</strong> ${schedule.anesthesia} <br>
          <strong>Operation Date:</strong> ${new Date(schedule.operationDate).toDateString()} <br>
          <strong>Remarks:</strong> ${schedule.remarks}
        </p>`
    )
    .join("");
}

// Add a new schedule
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const operationId = document.getElementById("operationId").value;
  const anesthesia = document.getElementById("anesthesia").value;
  const operationDate = document.getElementById("operationDate").value;
  const remarks = document.getElementById("remarks").value;

  const res = await fetch("/api/schedules", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ operationId, anesthesia, operationDate, remarks }),
  });

  if (res.ok) {
    alert("Schedule added successfully!");
    fetchSchedules();
    form.reset();
  } else {
    alert("Failed to add schedule.");
  }
});

// Initial load
fetchSchedules();
