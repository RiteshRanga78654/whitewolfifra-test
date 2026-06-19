// import './globals.css';
// import Script from 'next/script';

// export const metadata = {
//   title: 'White Wolf Infra | Luxury Real Estate & Infrastructure',
//   description: 'Premium Luxury Real Estate & Infrastructure',
// };

// // Strips browser-extension attributes (like bis_skin_checked) before React hydration
// const stripExtensionAttrs = `
//   (function() {
//     var ATTRS = ['bis_skin_checked'];
//     function clean(node) {
//       if (node.nodeType !== 1) return;
//       ATTRS.forEach(function(a) { node.removeAttribute(a); });
//       node.querySelectorAll && node.querySelectorAll('[' + ATTRS.join('],[') + ']').forEach(function(el) {
//         ATTRS.forEach(function(a) { el.removeAttribute(a); });
//       });
//     }
//     var mo = new MutationObserver(function(mutations) {
//       mutations.forEach(function(m) {
//         if (m.type === 'attributes') { m.target.removeAttribute(m.attributeName); }
//         m.addedNodes.forEach(function(n) { clean(n); });
//       });
//     });
//     document.addEventListener('DOMContentLoaded', function() {
//       clean(document.body);
//       mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ATTRS });
//     });
//   })();
// `;

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <head>
//         <link rel="icon" type="image/png" href="/white_wolf_infra_logo.png" />
//         {/* Strip browser extension attrs before React hydration */}
//         <Script
//           id="strip-ext-attrs"
//           strategy="beforeInteractive"
//           dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }}
//         />
//       </head>
//       <body className="bg-black text-white/60 m-0 p-0 overflow-x-hidden" suppressHydrationWarning>
//         <div id="page-wrapper" suppressHydrationWarning>
//           {children}
//         </div>
//       </body>
//     </html>
//   );
// }

import localFont from 'next/font/local';
import './globals.css';
import Script from 'next/script';
import FloatingButtons from '../components/FloatingButtons';
import CrmButton from '../components/CrmButton';

const manrope = localFont({
  src: [
    { path: '../../public/fonts/Manrope-ExtraLight.ttf', weight: '200', style: 'normal' },
    { path: '../../public/fonts/Manrope-Light.ttf',      weight: '300', style: 'normal' },
    { path: '../../public/fonts/Manrope-Regular.ttf',    weight: '400', style: 'normal' },
    { path: '../../public/fonts/Manrope-Medium.ttf',     weight: '500', style: 'normal' },
    { path: '../../public/fonts/Manrope-SemiBold.ttf',   weight: '600', style: 'normal' },
    { path: '../../public/fonts/Manrope-Bold.ttf',       weight: '700', style: 'normal' },
    { path: '../../public/fonts/Manrope-ExtraBold.ttf',  weight: '800', style: 'normal' },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata = {
  title: 'White Wolf Infra | Luxury Real Estate & Infrastructure',
  description: 'Premium Luxury Real Estate & Infrastructure',
};

const stripExtensionAttrs = `
  (function() {
    var ATTRS = ['bis_skin_checked'];
    function clean(node) {
      if (node.nodeType !== 1) return;
      ATTRS.forEach(function(a) { node.removeAttribute(a); });
      node.querySelectorAll && node.querySelectorAll('[' + ATTRS.join('],[') + ']').forEach(function(el) {
        ATTRS.forEach(function(a) { el.removeAttribute(a); });
      });
    }
    var mo = new MutationObserver(function(mutations) {
      mutations.forEach(function(m) {
        if (m.type === 'attributes') { m.target.removeAttribute(m.attributeName); }
        m.addedNodes.forEach(function(n) { clean(n); });
      });
    });
    document.addEventListener('DOMContentLoaded', function() {
      clean(document.body);
      mo.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ATTRS });
    });
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/white_wolf_infra_logo.png" />
        <Script
          id="strip-ext-attrs"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: stripExtensionAttrs }}
        />
      </head>
      <body className="bg-black text-white/60 m-0 p-0 overflow-x-hidden" suppressHydrationWarning>
        <div id="page-wrapper" suppressHydrationWarning>
          {children}
        </div>
        <FloatingButtons />
        <CrmButton/>
      </body>
    </html>
  );
}