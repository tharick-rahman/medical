// Animated Counter Function
// Animated Counter Function (robust for large ranges)
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  if (start === end) {
    obj.textContent = id === 'revenue' ? '₹' + end.toLocaleString() : end.toLocaleString();
    return;
  }
  const range = end - start;
  const minInterval = 30; // ms per tick
  const steps = Math.max(1, Math.round(duration / minInterval));
  const step = Math.ceil(Math.abs(range) / steps);
  let current = start;
  const dir = end > start ? 1 : -1;
  const timer = setInterval(() => {
    current += step * dir;
    if ((dir === 1 && current >= end) || (dir === -1 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    obj.textContent = id === 'revenue' ? '₹' + current.toLocaleString() : current.toLocaleString();
  }, minInterval);
}

// Run counters
animateValue("devices", 0, 1250, 2000);
animateValue("active", 0, 1108, 2000);
animateValue("revenue", 0, 2450000, 2200);
animateValue("service", 0, 42, 2000);

// Line Chart
if (typeof Chart !== 'undefined') {
  new Chart(document.getElementById("lineChart"), {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Device Performance %",
      data: [75, 80, 78, 85, 88, 92],
      borderColor: "#2c5364",
      fill: false,
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 2000
    }
  }
});

// Bar Chart
  new Chart(document.getElementById("barChart"), {
  type: 'bar',
  data: {
    labels: ["ECG", "Ventilator", "Pump", "X-Ray"],
    datasets: [{
      label: "Units Sold",
      data: [120, 90, 150, 70],
      backgroundColor: ["#2c5364", "#203a43", "#0f2027", "#4ca1af"]
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 2000
    }
  }
});

// Donut Chart
  new Chart(document.getElementById("donutChart"), {
  type: 'doughnut',
  data: {
    labels: ["Active", "Service", "Inactive"],
    datasets: [{
      data: [1108, 42, 100],
      backgroundColor: ["green", "orange", "red"]
    }]
  },
  options: {
    responsive: true,
    animation: {
      animateRotate: true,
      duration: 2000
    }
  }
});
} else {
  console.warn('Chart.js not loaded — charts will not render.');
}

// Mobile nav toggle (collapsible menu)
document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menu.setAttribute('data-open', isOpen ? 'true' : 'false');
    });
  }
});

// ===== LOADING SCREEN CONTROL =====

window.addEventListener("load", function () {
  setTimeout(function () {
    const loader = document.getElementById("loader");
    loader.classList.add("loader-hidden");
  }, 1500); // 1.5 seconds
});