# Illustrations

Swap-friendly art for the surprise. The screens currently use **inline SVG**
characters (drawn in `src/components/Character.jsx`, `Cake.jsx`, and the camera
in `PolaroidReveal.jsx`), so nothing here is required for the site to run.

This folder is for **your own art**. Drop files here and reference them from a
component with a leading slash, e.g. `<img src="/illustrations/character.png" />`.

Suggested files to add if you want to replace the drawn art:

| File                       | Used for                                  |
| -------------------------- | ----------------------------------------- |
| `character.png` / `.svg`   | the cute character holding flowers (lock + reveal) |
| `cake.png`                 | the birthday cake                         |
| `camera.png`               | the polaroid camera                       |
| `heart-favicon.svg`        | browser tab icon (already provided)       |

To wire a swapped image in, open the matching component in
`src/components/` and replace the inline `<svg>` with an `<img>` tag.
Do **not** use Snoopy or any branded/trademarked character art.
