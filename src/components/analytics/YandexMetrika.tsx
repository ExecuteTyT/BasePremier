"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const YM_ID = process.env.NEXT_PUBLIC_YM_ID;

export function YandexMetrika() {
  const pathname = usePathname();

  useEffect(() => {
    if (!YM_ID || typeof window.ym !== "function") return;
    window.ym(Number(YM_ID), "hit", pathname);
  }, [pathname]);

  if (!YM_ID) return null;

  const initScript = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
    ym(${Number(YM_ID)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});
  `;

  return (
    <Script
      id="yandex-metrika"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: initScript }}
    />
  );
}
