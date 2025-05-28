let extensionsData = [];

async function loadExtensions() {
  const response = await fetch("data.json");
  extensionsData = await response.json();
  renderExtensions("all");
}

function renderExtensions(filter = "all") {
  const container = document.querySelector(".cardextensions");
  container.innerHTML = "";

  const filtered = extensionsData.filter((ext) => {
    if (filter === "active") return ext.isActive;
    if (filter === "inactive") return !ext.isActive;
    return true; // all
  });

  filtered.forEach((item, index) => {
    const extCard = document.createElement("div");
    extCard.className = "extension";
    extCard.innerHTML = `
            <div class="box">
                <div class="image">
                    <img src="${item.logo}" alt="${item.name}" />
                </div>
                <div class="text">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
            <div class="cardbtn">
                <button class="removebtn">Remove</button>
                <label class="toggle-switch">
                    <input type="checkbox" class="statusToggle" ${
                      item.isActive ? "checked" : ""
                    } />
                    <span class="slider"></span>
                </label>
            </div>
        `;

    // Remove handler
    extCard.querySelector(".removebtn").addEventListener("click", () => {
      const originalIndex = extensionsData.findIndex(
        (ext) => ext.name === item.name
      );
      if (originalIndex !== -1) {
        extensionsData.splice(originalIndex, 1);
        renderExtensions(filter); // Re-render with updated data
      }
    });

    // Toggle handler
    extCard.querySelector(".statusToggle").addEventListener("change", (e) => {
      item.isActive = e.target.checked;
      renderExtensions(filter); // Refresh view if filter was active/inactive
    });

    container.appendChild(extCard);
  });
}

function setupTabButtons() {
  const allBtn = document.getElementById("all");
  const activeBtn = document.getElementById("active");
  const inactiveBtn = document.getElementById("inactive");

  function setActiveTab(btn) {
    [allBtn, activeBtn, inactiveBtn].forEach((b) => {
      b.style.backgroundColor = "rgb(62 61 54 / 65%)";
      b.style.color = "white";
    });
    btn.style.backgroundColor = "rgb(213 80 43)";
    btn.style.color = "black";
  }

  allBtn.addEventListener("click", () => {
    setActiveTab(allBtn);
    renderExtensions("all");
  });

  activeBtn.addEventListener("click", () => {
    setActiveTab(activeBtn);
    renderExtensions("active");
  });

  inactiveBtn.addEventListener("click", () => {
    setActiveTab(inactiveBtn);
    renderExtensions("inactive");
  });
}

async function main() {
  await loadExtensions();
  setupTabButtons();
  document.getElementById("all").click(); // Default tab
}

main();
