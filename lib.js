/* Many thanks to
   https://math.stackexchange.com/questions/2820194/how-to-plot-n-coords-to-distribute-evenly-as-a-ring-of-points-around-a-circle
*/

function drawAllTheThings(canvas, pattern) {
  const context = canvas.getContext('2d');

  const theme = {
    'canvas-padding': '20px',
    'canvas-width': 200,
    'canvas-height': 200,
    'outer-circle-radius': 80,
    'outer-circle-line-width': 2,
    'outer-circle-stroke-style': '#ccc',
    'dot-path-stroke': '#000',
    'dot-on-radius': 4,
    'dot-on-stroke-style': '#000',
    'dot-on-fill-style': '#000',
    'dot-off-radius': 2,
    'dot-off-stroke-style': '#ccc',
    'dot-off-fill-style': '#ccc',
  };

  /* Canvas dimensions */
  const [width, height] = [
    theme['canvas-width'],
    theme['canvas-height'],
  ];

  /* Radius of the outer circle */
  const radius = theme['outer-circle-radius'];

  /* The entire circle is `360∘ ≡ 2π` and we we want to find the
     distance between each point `2π / N`. */
  const angle = (2 * Math.PI) / pattern.length;

  /* This is where it all starts */
  const startAngle = -.5 * Math.PI;

  /* Configure canvas */
  canvas.style.padding = theme['canvas-padding'];
  canvas.width = width;
  canvas.height = height;

  function drawOuterCircle() {
    context.lineWidth = theme['outer-circle-line-width'];
    context.strokeStyle = theme['outer-circle-stroke-style'];
    context.beginPath();
    context.arc(
      width / 2,   /* x */
      height / 2,  /* y */
      radius,      /* radius */
      0,           /* angle start */
      2 * Math.PI, /* angle end */
    );
    context.stroke();
  }

  function drawDot(x, y, { radius, stroke, fill }) {
    context.strokeStyle = stroke;
    context.fillStyle = fill;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  }

  function drawDotOn(x, y) {
    drawDot(x, y, {
      radius: theme['dot-on-radius'],
      stroke: theme['dot-on-stroke-style'],
      fill: theme['dot-on-fill-style'],
    });
  }

  function drawDotOff(x, y) {
    drawDot(x, y, {
      radius: theme['dot-off-radius'],
      stroke: theme['dot-off-stroke-style'],
      fill: theme['dot-off-fill-style'],
    });
  }

  drawOuterCircle();

  const patternDots = [];

  function connectDots(dots) {
    context.strokeStyle = theme['dot-path-stroke'];
    context.beginPath();
    context.moveTo(dots[0][0], dots[0][1]);
    for (let i = 1; i < dots.length; i++) {
      context.lineTo(dots[i][0], dots[i][1]);
    }
    context.closePath();
    context.stroke();
  }

  /* Find the equidistant points */
  for (let i = 0; i < pattern.length; i++) {
    const a = startAngle + angle * i;
    const x = Math.cos(a) * radius + width / 2;
    const y = Math.sin(a) * radius + height / 2;
    if (pattern[i] === '1') {
      drawDotOn(x, y);
      patternDots.push([x, y]);
    } else {
      drawDotOff(x, y);
    }
  }

  /* Connect the dots */
  connectDots(patternDots);
}
