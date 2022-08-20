import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/@tensorflow/tfjs-backend-wasm/dist/*.wasm",
          dest: "/",
        },
      ],
    }),
  ],
};
