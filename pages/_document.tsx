import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
        />
      </Head>
      <body>
        <div id="particles-js" className="no-mobile"></div>
        <script async src="/particles/particleScript.js"></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
