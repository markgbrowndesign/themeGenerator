import express from 'express';
import Color from 'colorjs.io';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const scale = generateBasicScale("#FF0000");

  res.send(scale);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

interface ColorScale {
    '100': string;
    '200': string;
    '300': string;
    '400': string;
    '500': string;
    '600': string;
    '700': string;
    '800': string;
    '900': string;
    '1000': string;
    '1100': string;
    '1200': string;
}

function generateBasicScale(baseColor: string): ColorScale {

    const base = new Color(baseColor).to("oklch");
    const [baseL, baseC, baseH] = base.coords;

    const scale: Partial<ColorScale> = {};

    for(let i = 1; i <= 8; i++) {
        const lightness = 0.98 - (i - 1) * 0.06;
        const chroma = baseC * (i / 8);
        const color = new Color("oklch", [lightness, chroma, baseH]);

        const key: String = String(i * 100);

        scale[key as keyof ColorScale] = color.to("srgb").toString({format: "hex"});
    }

    scale['900'] = baseColor;

    for(let i = 10; i <= 12; i++) {
        const lightness = baseL - (i - 9) * 0.08;
        const chroma = baseC * (1 - (i - 9) * 0.15);
        const color = new Color("oklch", [lightness, chroma, baseH]);

        const key: String = String(i * 100);
        scale[key as keyof ColorScale] = color.to("srgb").toString({format: "hex"});
    }

    return scale as ColorScale
}