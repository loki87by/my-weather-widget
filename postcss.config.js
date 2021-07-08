import autoprefixer from 'autoprefixer';
import cssnano from "cssnano";
import atImport from "postcss-import";

export default {
  plugins: [atImport, autoprefixer, cssnano]
};