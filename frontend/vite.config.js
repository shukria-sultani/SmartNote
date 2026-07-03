import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import imagemin from 'vite-plugin-imagemin'; 
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminSvgo from 'imagemin-svgo';
// https://vite.dev/config/
export default defineConfig({
  base: '/', 
 plugins: [
    react(),
    
    imagemin({
      plugins: {
        jpg: imageminMozjpeg({ quality: 75 }), 
        png: imageminOptipng({ optimizationLevel: 3 }), 
        gif: imageminGifsicle({ optimizationLevel: 3 }),
        svg: imageminSvgo({
          plugins: [{ name: 'removeViewBox', active: false }],
        }),
      },

      skipIfLarger: true,
      verbose: true, 
    }),
  ],
})
