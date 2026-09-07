/**
 * Erzeugt herunterskalierte Varianten der Bildsequenz aus den 2560px-Mastern.
 *
 * Hintergrund: Ein ImageBitmap belegt Breite x Hoehe x 4 Byte im Speicher.
 * Bei 2560px sind das 26 MB pro Frame - 140 Frames sprengen jedes Handy.
 * Gezeichnet wird ohnehin nur auf 400-630 CSS-Pixel (siehe useCanvasAnimation).
 *
 * Aufruf:  npm run frames            -> nur mobile
 *          npm run frames -- desktop -> nur desktop
 *          npm run frames -- mobile desktop
 */
import sharp from 'sharp';
import { mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_DIR = 'assets-source/image-sequenz';

const TARGETS = {
    mobile: {
        outDir: 'public/assets/image-sequenz-mobile',
        size: 640,
        step: 2, // jeder zweite Frame -> 70 statt 140
        quality: 82,
    },
    desktop: {
        outDir: 'public/assets/image-sequenz-desktop',
        size: 1280,
        step: 1,
        quality: 85,
    },
};

const CONCURRENCY = 8;

function formatBytes(bytes) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function directorySize(dir, files) {
    const sizes = await Promise.all(
        files.map(async (file) => (await stat(path.join(dir, file))).size)
    );
    return sizes.reduce((total, size) => total + size, 0);
}

/** Arbeitet die Aufgabenliste mit begrenzter Parallelitaet ab. */
async function runPool(items, worker) {
    let cursor = 0;
    const runners = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor++;
            await worker(items[index], index);
        }
    });
    await Promise.all(runners);
}

async function buildTarget(name, config, sourceFiles) {
    const selected = sourceFiles.filter((_, index) => index % config.step === 0);

    await rm(config.outDir, { recursive: true, force: true });
    await mkdir(config.outDir, { recursive: true });

    console.log(
        `\n${name}: ${selected.length} Frames à ${config.size}px -> ${config.outDir}`
    );

    await runPool(selected, async (file, index) => {
        // Fortlaufend neu nummerieren, damit der Loader Render0001..N erwartet.
        const outName = `Render${String(index + 1).padStart(4, '0')}.webp`;
        await sharp(path.join(SOURCE_DIR, file))
            .resize(config.size, config.size, { fit: 'inside' })
            .webp({ quality: config.quality, alphaQuality: 90, effort: 5 })
            .toFile(path.join(config.outDir, outName));
    });

    const outFiles = await readdir(config.outDir);
    const bytes = await directorySize(config.outDir, outFiles);
    const pixels = config.size * config.size * 4 * selected.length;

    console.log(`  Download: ${formatBytes(bytes)}`);
    console.log(`  Speicher als ImageBitmap: ${formatBytes(pixels)}`);

    return { frames: selected.length, bytes, pixels };
}

async function main() {
    const requested = process.argv.slice(2).filter((arg) => !arg.startsWith('-'));
    const targets = requested.length > 0 ? requested : ['mobile'];

    for (const target of targets) {
        if (!TARGETS[target]) {
            console.error(`Unbekanntes Ziel "${target}". Erlaubt: ${Object.keys(TARGETS).join(', ')}`);
            process.exit(1);
        }
    }

    const sourceFiles = (await readdir(SOURCE_DIR))
        .filter((file) => file.toLowerCase().endsWith('.webp'))
        .sort();

    if (sourceFiles.length === 0) {
        console.error(`Keine Frames in ${SOURCE_DIR} gefunden.`);
        process.exit(1);
    }

    const sourceBytes = await directorySize(SOURCE_DIR, sourceFiles);
    const { width, height } = await sharp(path.join(SOURCE_DIR, sourceFiles[0])).metadata();

    console.log(`Quelle: ${sourceFiles.length} Frames à ${width}x${height}px (${formatBytes(sourceBytes)})`);
    console.log(`Speicher als ImageBitmap: ${formatBytes(width * height * 4 * sourceFiles.length)}`);

    for (const target of targets) {
        await buildTarget(target, TARGETS[target], sourceFiles);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
