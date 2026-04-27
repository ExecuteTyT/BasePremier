const path = require("path");
const sharpPath = path.resolve(__dirname, "../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp");
const sharp = require(sharpPath);

const svg = Buffer.from(`<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'>
  <rect width='1200' height='630' fill='#0A0A0B'/>
  <rect x='0' y='0' width='6' height='630' fill='#1B2A4E'/>
  <text x='80' y='240' font-family='Georgia,serif' font-size='96' font-weight='bold' fill='#F5F5F2' letter-spacing='-4'>BASE Premier</text>
  <text x='80' y='310' font-family='Courier New,monospace' font-size='22' fill='#9A9A98' letter-spacing='6'>BARBER SHOP · KAZAN</text>
  <line x1='80' y1='340' x2='480' y2='340' stroke='#F5F5F2' stroke-width='1' stroke-opacity='0.2'/>
  <text x='80' y='380' font-family='Courier New,monospace' font-size='20' fill='#9A9A98' letter-spacing='2'>5.0 stars · 394 reviews · Shalyapina 26</text>
  <text x='80' y='415' font-family='Courier New,monospace' font-size='20' fill='#9A9A98' letter-spacing='2'>Daily 10:00-21:00</text>
</svg>`);

sharp(svg)
  .jpeg({ quality: 90 })
  .toFile(path.resolve(__dirname, "../public/images/og-default.jpg"))
  .then((info) => console.log("og-default.jpg created:", info))
  .catch((err) => console.error("Error:", err));
