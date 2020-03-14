/* Many thanks to
   https://math.stackexchange.com/questions/2820194/how-to-plot-n-coords-to-distribute-evenly-as-a-ring-of-points-around-a-circle
*/

function drawAllTheThings(canvas) {
  const context = canvas.getContext('2d');

  const theme = {
    'canvas-padding': '20px',
    'canvas-width': 200,
    'canvas-height': 200,
    'outer-circle-radius': 80,
    'outer-circle-line-width': 2,
    'outer-circle-stroke-style': '#ccc',
    'dot-on-radius': 2,
    'dot-on-stroke-style': '#ccc',
    'dot-on-fill-style': '#ccc',
  };

  /* Number of points that we want to plot */
  const points = 12;

  /* Canvas dimensions */
  const [width, height] = [
    theme['canvas-width'],
    theme['canvas-height'],
  ];

  /* Radius of the outer circle */
  const radius = theme['outer-circle-radius'];

  /* The entire circle is `360∘ ≡ 2π` and we we want to find the
     distance between each point `2π / N`. */
  const angle = (2 * Math.PI) / points;

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

  function drawDot(x, y) {
    context.strokeStyle = theme['dot-on-stroke-style'];
    context.fillStyle = theme['dot-on-fill-style'];
    context.beginPath();
    context.arc(
      x,
      y,
      theme['dot-on-radius'],
      0,
      2 * Math.PI,
    );
    context.fill();
    context.stroke();
  }

  drawOuterCircle();

  /* Find the equidistant points */
  for (let i = 0; i < points; i++) {
    const a = startAngle + angle * i;
    const x = Math.cos(a) * radius + width / 2;
    const y = Math.sin(a) * radius + height / 2;
    drawDot(x, y);
  }
}