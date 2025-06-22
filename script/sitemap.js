const container = document.getElementById("sitemap");
const svg = document.getElementById("connection-lines");

const radiusMap = {
  1: 175,
  2: 125,
  3: 90
};

const distanceMap = {
  1: 0,
  2: 230,
  3: 125
};

// Create a node element
function createNode(node, x, y) {
  const size = radiusMap[node.priority] || 60;

  const el = document.createElement("a");
  el.className = "node";
  el.href = node.url;
  el.target = "_blank";
  el.style.width = size + "px";
  el.style.height = size + "px";
  el.style.left = x - size / 2 + "px";
  el.style.top = y - size / 2 + "px";
  el.style.backgroundColor = node.bgColor || "#333";
  el.innerText = node.title;

  container.appendChild(el);
  return { element: el, x, y };
}

// Draw a line between two points
// Draw a line between two points
function drawLine(x1, y1, x2, y2) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#666"); // Darker color
  line.setAttribute("stroke-width", "10"); // Increased width
  svg.appendChild(line);
}

// Main layout function
function layout(data) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const main = createNode(data, centerX, centerY);

  const firstRingCount = data.children.length;
  const angleStep = (2 * Math.PI) / firstRingCount;

  data.children.forEach((child, i) => {
    const angle = i * angleStep;
    const distance = distanceMap[2];
    const x = centerX + distance * Math.cos(angle);
    const y = centerY + distance * Math.sin(angle);

    const childNode = createNode(child, x, y);
    drawLine(centerX, centerY, x, y);

    if (child.children) {
      const subAngleStep = (Math.PI / 1) / child.children.length;
      const startAngle = angle - (subAngleStep * child.children.length) / 2;

      child.children.forEach((subchild, j) => {
        const subAngle = startAngle + j * subAngleStep;
        const subDistance = distanceMap[3];
        const subX = x + subDistance * Math.cos(subAngle);
        const subY = y + subDistance * Math.sin(subAngle);

        createNode(subchild, subX, subY);
        drawLine(x, y, subX, subY);
      });
    }
  });
}

// Load JSON and kick off
fetch("sitemap.json")
  .then((res) => res.json())
  .then((data) => {
    layout(data);
  });
