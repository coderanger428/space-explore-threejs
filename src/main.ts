import Solar from "./lib/Solar";
console.log("MAIN STARTED");

// Initialize the Solar System simulation
const container = document.getElementById("container");
if (container) {
  const solarSystem = new Solar(container);
  console.log("Solar System initialized:", solarSystem);
} else {
  console.error("Container element not found");
}
