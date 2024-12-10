if (!self.define) {
  let e,
    a = {};
  const s = (s, t) => (
    (s = new URL(s + ".js", t).href),
    a[s] ||
      new Promise((a) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = s), (e.onload = a), document.head.appendChild(e);
        } else (e = s), importScripts(s), a();
      }).then(() => {
        let e = a[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, c) => {
    const n = e || ("document" in self ? document.currentScript.src : "") || location.href;
    if (a[n]) return;
    let i = {};
    const r = (e) => s(e, n),
      o = { module: { uri: n }, exports: i, require: r };
    a[n] = Promise.all(t.map((e) => o[e] || r(e))).then((e) => (c(...e), i));
  };
}
define(["./workbox-829af5f8"], function (e) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/_next/static/chunks/10260a37-dceb15ad75e578ff.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1067-1426d2ca3863aa2b.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1549-4976b2a2aa5fad08.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1579-dcfd2704dd05e683.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1894-9b22966be49db1a0.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1895-48339b992319faa5.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1972-52afff814702a1e7.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/19f2fdb2-4da2f3df3e2dd661.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/1e9ba12d-41c791b67673091b.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/2053-401ec8fd613ccfb8.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/246-d73ff19c88425af3.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/3042-efe42b8c1d09db15.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/345249d4-e1b0bc3a658c0ae1.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/3478-fc546ad1edd8cca7.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/3662-4786341660cd8932.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/4316-90926d03c953ddf9.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/4447-0fd225d60f760235.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/484386e7-a8a0abf964f57528.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/5125-d76746cd0bf4aa26.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/5699-4ac29c1f2ca8d0c7.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/5916-9eb2fc97bdf6371e.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6150-12de76be38395612.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6622-1ddd617b50e4d951.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6655-badb9dad1f149e48.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6757-bc1690b05a0c53eb.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6854-0a1476bd89243093.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6b1b62d9-f7bd1439b075dbb1.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/6f594c63-e4dbd1db533d0354.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/802-6944401dc73c5090.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/8093-a44f3b23d6164a1c.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/8145-7e2239698fd5972e.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/8258-20840dfe0217ced6.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/8818-b4a19121ddeaa920.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/8894-ed44be5ba20a57e7.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/9213-99d19977b779dd8d.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/9281-195427ccf8183acc.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/9850.f61fa5076a44d2f9.js", revision: "f61fa5076a44d2f9" },
        { url: "/_next/static/chunks/a3d58394-81a81da2c32ab2df.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/addbf937-665023405ae9ac7f.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        {
          url: "/_next/static/chunks/app/(pages)/(approvemembers)/approvemembers/%5Bid%5D/page-d0aec01b0cfe54d0.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(auth)/auth/callback/InsertUserInfo/page-626329f6b65153b3.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(auth)/signin/page-b6bfb64e70cb5881.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(auth)/signupSecond/%5BuserId%5D/page-55e3fa43b0313894.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(categoryList)/category/%5BcategoryId%5D/layout-b89a1878ac317b06.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(categoryList)/category/%5BcategoryId%5D/page-cba083050274b228.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(chat)/chat/onetimeChat/%5BchatRoomId%5D/layout-2fec94a8cfce5830.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(chat)/chat/onetimeChat/%5BchatRoomId%5D/page-d726b3d7bf28adb6.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(chat)/chat/page-e7e2723d93ec92f9.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(chat)/chat/regularChat/%5BchatRoomId%5D/layout-3867d8022d7143a2.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(chat)/chat/regularChat/%5BchatRoomId%5D/page-87713f560b7528e2.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/list/onetime/page-77d7c9a0da8b477b.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/list/regular/page-a30d0de4787f0f74.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/one-time-club-sub/%5Bid%5D/page-80d24c2285d95afd.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/one-time/page-7c0998c2fde1d32f.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/page-56a9d0226163fa9e.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/regular-club-sub/%5Bid%5D/create/%5BsubId%5D/page-5a7c77a8bf74b582.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/regular-club-sub/%5Bid%5D/create/page-65e6d26f6002774b.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/regular-club-sub/%5Bid%5D/page-dadb13e7eed35f72.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(club)/club/regular-time/page-d71c3580ca53be0e.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(kakaopay)/kakaopay/isSuccess/page-14ae5b82a074b422.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(kakaopay)/kakaopay/paymentConfirm/page-67576ede522593e9.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(kakaopay)/kakaopay/success/page-1757bcf3164088d9.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(myclublist)/myclublist/page-9d764cbcdc29fc5c.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(mypage)/mypage/profile/inquiry/page-2d1869e634f0d506.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(mypage)/mypage/profile/page-485881e7f0d79a00.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(mypage)/mypage/profile/paymentDetails/page-aa05553d6727ab73.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(mypage)/mypage/profile/profileUpdate/page-90f2024d7f1e426f.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(mypage)/mypage/profile/wishClubList/page-50184480bef064f8.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        {
          url: "/_next/static/chunks/app/(pages)/(search)/search/page-eeb072342601390b.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        { url: "/_next/static/chunks/app/_not-found/page-44627a793681f732.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/error-5a5d53fed52180c0.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/global-error-8b33cfb34811ab0d.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/layout-be5ba657588723d0.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/loading-7003ff5402fc5e9c.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/not-found-2ae71fa21bf1f7e4.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/app/page-e32650a61a0ada74.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        {
          url: "/_next/static/chunks/app/sentry-example-page/page-3f3509a160fef8ca.js",
          revision: "y4wQtcUABWNQGg62mL6PA"
        },
        { url: "/_next/static/chunks/b4ce37b3-adff61691e2fbd1c.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/b71e0d0a-d51607d47bcd4eab.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/d43aea9c-692568e355fb0e8e.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/dfd1c73c-bdad2cc661433793.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/f8210949-74044c20dcc38df9.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/framework-b66c08f6a1b620ed.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/main-33ef357eee0e3c6f.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/main-app-a5585e44429e81fe.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/pages/_app-96580181c4403fdb.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/pages/_error-57a59da41fafc6ba.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/chunks/polyfills-42372ed130431b0a.js", revision: "846118c33b2c0e922d7b3a7676f81f6f" },
        { url: "/_next/static/chunks/webpack-0bfe04d15a39409e.js", revision: "y4wQtcUABWNQGg62mL6PA" },
        { url: "/_next/static/css/25a3317317bfb413.css", revision: "25a3317317bfb413" },
        { url: "/_next/static/css/44491df69b1d0570.css", revision: "44491df69b1d0570" },
        { url: "/_next/static/media/ff840cfebfb63b0c-s.p.woff2", revision: "302ec55f5b4320354ec6b35a53dead87" },
        { url: "/_next/static/y4wQtcUABWNQGg62mL6PA/_buildManifest.js", revision: "f0d6fc5671bf8af76eb9f9d89d5fded6" },
        { url: "/_next/static/y4wQtcUABWNQGg62mL6PA/_ssgManifest.js", revision: "b6652df95db52feb4daf4eca35380933" },
        { url: "/asset/AppIcon.svg", revision: "23abf167af14172457e3f5dc3da4b880" },
        { url: "/asset/Banner/Frame 2307.png", revision: "827a776893a6aca7960585067e78da7c" },
        { url: "/asset/Banner/MainBanner.jpg", revision: "d095b3814bb177b67b70af54165c7112" },
        { url: "/asset/Banner/Rectangle 20.png", revision: "de9efbf3d7bf6a06fc3ff63fd8ce820d" },
        { url: "/asset/Banner/banner.png", revision: "e8a4421f14e1fcf0dfd8cd68531d61c3" },
        { url: "/asset/Banner/banner.svg", revision: "ebf0cf0e9beadcd8ea837903c93cf3c5" },
        { url: "/asset/Banner/bigBanner.jpg", revision: "26f92e358d2e066d70857c13b2f5adae" },
        { url: "/asset/Banner/bigBanner.svg", revision: "955b25f6dc48210071a5dda1369b3fd0" },
        { url: "/asset/Banner/eggsBanner.png", revision: "721aec571c712bbc6ca910e7c0946475" },
        { url: "/asset/Banner/smallBanner.svg", revision: "6a8c1ebba47445cac414e06587293702" },
        { url: "/asset/Category/Category icon_airplane.png", revision: "7db31da6ceee71adb24e34342ab3f9bc" },
        { url: "/asset/Category/Category icon_clapper-board.png", revision: "c604e0dc015d6320f8599c44e9f3e1ce" },
        { url: "/asset/Category/Category icon_guitar.png", revision: "4ec66f2842feae251077fb2da9b7fe51" },
        { url: "/asset/Category/Category icon_hot-beverage.png", revision: "cd36589e9e134b459f54fbbb3d580b2d" },
        { url: "/asset/Category/Category icon_tennis.png", revision: "bb775d6d4fcd001853b1f14f250e4ae2" },
        { url: "/asset/Category/Category icon_voltage.png", revision: "94223c71afcc1b8103c28b0dbb58d10e" },
        { url: "/asset/Category/Category icon_woman-dancing.png", revision: "bb4d72358c303708a5aa2a467836af03" },
        { url: "/asset/Egg.png", revision: "58c23ebbfbeac95f991fa7e214615610" },
        { url: "/asset/Icon/Arrow-Right-Outline.png", revision: "559c5f8f6d464469d6870bc0bc5d4ccb" },
        { url: "/asset/Icon/BellIcon.png", revision: "33dbd2b79fee3a57b68e8afc4c231131" },
        { url: "/asset/Icon/Frame 1000007052.png", revision: "58f598d072c2fb797f8dab84614273ff" },
        { url: "/asset/Icon/Heart-Filled.png", revision: "936704cfa135ab8f86b9bef995d2a477" },
        { url: "/asset/Icon/Heart-Filled.svg", revision: "afbfd7f22c3c297138d8792da3d77569" },
        { url: "/asset/Icon/Heart-Outline.png", revision: "1b0c6908ab89e7a41c1fc421cb2016c0" },
        { url: "/asset/Icon/Heart.png", revision: "258beaea4d804517528c155e25ca8b54" },
        { url: "/asset/Icon/Icon-Heart.png", revision: "bb681282826ab4a4299e956382aef0f6" },
        { url: "/asset/Icon/Icon-Location.png", revision: "840f469c668ea0892f0c098fb60ed8d7" },
        { url: "/asset/Icon/MenuIcon.png", revision: "367ce1fe65b21d292190fac00a114746" },
        { url: "/asset/Icon/PlusIcon.png", revision: "9339adb461179db5b91c08e01096b0e4" },
        { url: "/asset/Icon/State-filled.png", revision: "d6bc704bfdc594595408902a4a7f43b3" },
        { url: "/asset/Icon/checkbox-default 2.png", revision: "ab09691b05e9ea35fc47790271bfc3ac" },
        { url: "/asset/Icon/checkbox-default.png", revision: "ab09691b05e9ea35fc47790271bfc3ac" },
        { url: "/asset/Icon/checkbox-selected 2.png", revision: "24d5a349fde6f96b6647e27f4a043cdf" },
        { url: "/asset/Icon/checkbox-selected.png", revision: "24d5a349fde6f96b6647e27f4a043cdf" },
        { url: "/asset/Icon/icon-vector.svg", revision: "8b78d6a5f58a0c00c2ddd236c957aa9a" },
        { url: "/asset/Logo/MainLogo.svg", revision: "69bc5b340dbb90ff041ef5395ee83fa0" },
        { url: "/asset/Logo/Message-Filled.png", revision: "38b3a954941675fae1665f6124bed22d" },
        { url: "/asset/Logo/icon-google.png", revision: "023aadfe50cc1af7b960750e422dfd63" },
        { url: "/asset/Logo/icon-kakao.png", revision: "504847e614f606832d63de9ce76aeae7" },
        { url: "/asset/Navigation/Bottom nav_Button_Home.png", revision: "647f3cf50489654544bda860da3b0cc8" },
        { url: "/asset/Navigation/Bottom nav_Button_Home_Default.png", revision: "f362a57a5d481eae4cb93e6083dc43b2" },
        { url: "/asset/Navigation/Bottom nav_Button_My chat.png", revision: "a908ff64f1008ee705178606651418f6" },
        {
          url: "/asset/Navigation/Bottom nav_Button_My chat_Default.png",
          revision: "7ece5e8619d6cd6ac961f7f2894b6750"
        },
        { url: "/asset/Navigation/Bottom nav_Button_My page.png", revision: "43666f18807809deb538b921fbaaf78d" },
        {
          url: "/asset/Navigation/Bottom nav_Button_My page_Default.png",
          revision: "7d421365b08c2e1c7eb2df53d5507b06"
        },
        { url: "/asset/Navigation/Bottom nav_Button_Search.png", revision: "f7a82109af4dd15d3b50b7ac78c8cf59" },
        { url: "/asset/Navigation/Bottom nav_Button_Search_Default.png", revision: "456ea2d2657423ce6c5da84bfe6cc938" },
        { url: "/asset/Navigation/Bottom nav_Button__My gathering.png", revision: "d0d02ea4e37ca9bf05bf43881815009d" },
        {
          url: "/asset/Navigation/Bottom nav_Button__My gathering_Default.png",
          revision: "c65b3c33d123d7311e02b00fd47823bd"
        },
        { url: "/asset/defaultProfileImg.svg", revision: "7a2a8b974937e8437c8badc9cbaad5c9" },
        { url: "/asset/icon.svg", revision: "2e60a8b4b5cb08a13649bf5caac7eb39" },
        { url: "/icon512_maskable.png", revision: "235a0410a28a1e87e19841e10322ab59" },
        { url: "/icon512_rounded.png", revision: "12d339cd96fe38e19a18abc75835d25a" },
        { url: "/manifest.json", revision: "b65c33793d976343665140a45507206f" },
        { url: "/manifest.webmanifest", revision: "9b0b00000e260acb04ac7f95bad6ae9b" }
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, { status: 200, statusText: "OK", headers: e.headers })
                : e
          }
        ]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: "next-static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [new e.RangeRequestsPlugin(), new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: a } }) =>
        !(!e || a.startsWith("/api/auth/callback") || !a.startsWith("/api/")),
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && "1" === e.headers.get("Next-Router-Prefetch") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc-prefetch",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: a }, sameOrigin: s }) =>
        "1" === e.headers.get("RSC") && s && !a.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages-rsc",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: a }) => a && !e.startsWith("/api/"),
      new e.NetworkFirst({
        cacheName: "pages",
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })]
      }),
      "GET"
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })]
      }),
      "GET"
    );
});
