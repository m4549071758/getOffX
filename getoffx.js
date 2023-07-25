// ==UserScript==
// @name         get off X
// @namespace    http://tampermonkey.net/
// @version      1.1.2
// @description  ロゴ変えるやつ
// @author       github.com/m4549071758
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function () {
  function returnBirdFavicon() {
    const xFavicon = document.querySelector('link[rel="shortcut icon"]').href="favicon2.ico";
    const newFaviconURL = "https://github.com/m4549071758/getOffX/blob/bc17e6d551dfa32e63ae683f470dad2b74ac599c/twitter.png"
    if (shortcutIconElement) {
      // 新しいFaviconのURLを設定する
      shortcutIconElement.href = newFaviconURL;
      //headの最初のlinkとして再挿入
      const head = document.head || document.getElementsByTagName('head')[0];
      head.appendChild(shortcutIconElement.cloneNode(true));
          // 以前のFaviconの要素を削除する
      head.removeChild(shortcutIconElement);
    } else {
      // もしshortcutIconElementが見つからなかった場合のエラーメッセージ
      console.error("shortcut icon要素がないよ");
    }
  };

  function returnBlueBird() {
    let svgElements = Array.from(document.querySelectorAll('svg'));
    //svg要素を抽出してアイコン属性を持つ要素を削除
    svgElements.forEach(svg => {
      let paths = Array.from(svg.querySelectorAll('path'));
      paths.forEach(path => {
        if (path.getAttribute('d')?.startsWith('M14.258')) {
          path.remove();

          //空パス
          let newPath1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          newPath1.setAttribute("opacity", "0");
          newPath1.setAttribute("d", "M0 0h24v24H0z");
          svg.appendChild(newPath1);
          let newPath2 = document.createElementNS("http://www.w3.org/2000/svg", 'path');
          //svg図形描画
          newPath2.setAttribute("d", "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z");
          //色を#1A8CD8に
          newPath2.setAttribute('style', "color: #1a8cd8;");
          svg.appendChild(newPath2);
        }
      });
    });
  };

  returnBirdFavicon();
  returnBlueBird();
  //動的ページ用のやつ
  let observer = new MutationObserver(returnBlueBird);
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => observer.disconnect(), 5000);
})();