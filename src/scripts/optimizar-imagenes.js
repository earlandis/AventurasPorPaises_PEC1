const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../imagenes/originales');
const outputDir = path.join(__dirname, '../imagenes/optimizadas');

// Crear carpeta de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Lista de imágenes y su dirección de arte (focus)
const images = [
  { name: 'australia.jpg', focus: 'left' },
  { name: 'brasil.jpg', focus: 'center' },
  { name: 'buceo.jpg', focus: 'center' },
  { name: 'claseCocina.jpg', focus: 'center' },
  { name: 'crucero.jpg', focus: 'south' },
  { name: 'egipto.jpg', focus: 'left' },
  { name: 'enlaces.jpg', focus: 'center' },
  { name: 'festival.jpg', focus: 'center' },
  { name: 'fondo_categorias.jpg', focus: 'right' },
  { name: 'fondo_prinipal.jpg', focus: 'left' },
  { name: 'francia.jpg', focus: 'center' },
  { name: 'gastronomia.jpg', focus: 'center' },
  { name: 'globo.jpg', focus: 'left' },
  { name: 'japón.jpg', focus: 'right' },
  { name: 'mapamundi.jpg', focus: 'center' }, // <-- especial
  { name: 'newZeland.jpg', focus: 'center' },
  { name: 'parapente.jpg', focus: 'center' },
  { name: 'paseoGlobo.jpg', focus: 'right bottom' },
  { name: 'piscinaTermal.jpg', focus: 'center' },
  { name: 'safari.jpg', focus: 'center' },
  { name: 'sky.jpg', focus: 'center' },
  { name: 'snow.jpg', focus: 'center' },
  { name: 'sudafrica.jpg', focus: 'center' },
  { name: 'templos.jpg', focus: 'center' },
  { name: 'turquia.jpg', focus: 'center' },
  { name: 'usa.jpg', focus: 'center' }
];

// Tamaños base (Resolution switching - tamaño)
const sizes = [400, 800, 1200]; // px

// Densidad de píxeles (Resolution switching - DPI)
const dpis = [1, 2]; // 1x normal, 2x retina

async function processImages() {
  for (const img of images) {
    for (const size of sizes) {
      for (const dpi of dpis) {
        const inputPath = path.join(inputDir, img.name);
        const ext = path.extname(img.name);
        const baseName = path.basename(img.name, ext);
        const outputName = `${baseName}-${size}w${dpi === 2 ? '@2x' : ''}${ext}`;
        const outputPath = path.join(outputDir, outputName);

        if (img.name === 'mapamundi.jpg') {
          // Para el mapamundi solo resize, sin recortar ni cambiar foco
          await sharp(inputPath)
            .resize(size * dpi, null, { fit: 'contain' })
            .toFile(outputPath);
          console.log(`Generada (mapamundi): ${outputName}`);
        } else {
          // Resto de imágenes con dirección de arte y recorte
          await sharp(inputPath)
            .resize({
              width: size * dpi,
              height: Math.round(size * dpi * 3 / 4), 
              fit: 'cover',
              position: img.focus
            })
            .toFile(outputPath);
          console.log(`Generada: ${outputName}`);
        }
      }
    }
  }
}

processImages()
  .then(() => console.log('¡Todas las imágenes han sido procesadas!'))
  .catch(err => console.error(err));
