// モバイルブラウザかどうか判定
const isMobile = !!new MobileDetect(window.navigator.userAgent).mobile();

/**
 * ----------------------
 * 指定された名前のタブを表示
 * ----------------------
 */
const showTab = (tabName) => {
  // すでに表示されている場合は何もせずに終了
  if ($(`#${tabName}`).is(":visible")) {
    return;
  }

  const tabsContainer = $(`a[href='#${tabName}']`).closest(".tabs");
  // .tabs__menu liのうちtabNameに該当するものにだけactiveクラスを付ける
  tabsContainer.find(".tabs__menu li").removeClass("active");
  tabsContainer
    .find(`.tabs__menu a[href='#${tabName}']`)
    .parent("li")
    .addClass("active");

  // .tabs__contentの直下の要素をすべて非表示
  tabsContainer.find(".tabs__content > *").css({ display: "none" });
  // #<tabName>と.tabs__content .<tabName>を表示
  tabsContainer
    .find(`#${tabName}, .tabs__content .${tabName}`)
    .css({
      display: "block",
      opacity: 0.7,
    })
    .animate(
      {
        opacity: 1,
      },
      400
    );
};

/**
 * -------------
 * パララックス関連
 * -------------
 */

// 背景画像のスクロール速度。数字が小さいほど速い。
const parallaxXSpeed = 12;
const parallaxYSpeed = 3;
const parallaxXSpeedSmall = 5;
const parallaxYSpeedSmall = 1;

// パララックスを適用する関数
const showParallax = () => {
  const scrollTop = $(window).scrollTop();

  // 背景画像の位置をスクロールに合わせて変える
  const offsetX = Math.round(scrollTop / parallaxXSpeed);
  const offsetY = Math.round(scrollTop / parallaxYSpeed);
  const offsetXSmall = Math.round(scrollTop / parallaxXSpeedSmall);
  const offsetYSmall = Math.round(scrollTop / parallaxYSpeedSmall);

  $(".puppies").css({
    "background-position":
      // 一番上
      `${-offsetX}px ${-offsetY}px, ${
        // 上から2番目
        offsetXSmall
      }px ${-offsetYSmall}px, ` +
      // 一番下
      "0% 0%",
  });

  $(".kittens").css({
    "background-position":
      // 一番上
      `${offsetX}px ${-offsetY}px, ${
        // 上から2番目
        -offsetXSmall
      }px ${-offsetYSmall}px, ` +
      // 一番下
      "0% 0%",
  });
};

// パララックスを初期化する関数
const initParallax = () => {
  $(window).off("scroll", showParallax);

  if (!isMobile) {
    // モバイルブラウザでなければパララックスを適用
    showParallax();

    // スクロールのたびにshowParallax関数を呼ぶ
    $(window).on("scroll", showParallax);
  }
};

/**
 * ------------------
 * イベントハンドラの登録
 * ------------------
 */

/**
 * animatedクラスを持つ要素が画面内に入ったら
 * Animate.cssのfadeOutUpエフェクトを適用
 */
$(".animated").waypoint({
  handler(direction) {
    if (direction === "up") {
      $(this.element).addClass("fadeOutUp");
    } else {
      $(this.element).removeClass("fadeOutUp");
    }
    // this.destroy();
  },
  /**
   * 要素の上端が画面のどの位置に来たときにhandlerメソッドを呼び出すか指定
   * 0%なら画面の一番上、100%なら画面の一番下に来たときに呼び出される
   */
  offset: "50%",
});
/**
 * animatedクラスを持つ要素が画面内に入ったら
 * Animate.cssのfadeInUpエフェクトを適用
//  */
$(".animated").waypoint({
  handler(direction) {
    if (direction === "down") {
      $(this.element).addClass("fadeInUp");
      // this.destroy();
    } else {
      $(this.element).removeClass("fadeInUp");
      // this.destroy();
    }
  },
  /**
   * 要素の上端が画面のどの位置に来たときにhandlerメソッドを呼び出すか指定
   * 0%なら画面の一番上、100%なら画面の一番下に来たときに呼び出される
   */
  offset: "50%",
});

$(window).on("resize", () => {
  // ウインドウがリサイズされるとここが実行される
  initParallax();
});

// タブがクリックされたらコンテンツを表示
$(".tabs__menu a").on("click", (e) => {
  const tabName = $(e.currentTarget).attr("href");

  // hrefにページ遷移しない
  e.preventDefault();

  if (tabName[0] === "#") {
    // hrefの先頭の#を除いたものをshowTab()関数に渡す
    showTab(tabName.substring(1));
  }
});

/**
 * モバイル用メニューボタンが押されたら、メニューを表示する。
 */
$(".nav__menu-button").on("click", (e) => {
  // nav__menuクラスにはopacity: 0、nav__menu--showクラスには、opacity: 0.9 が設定されている
  // javascript側では、nav__menu--showクラスをつけたり外したりするだけで表示・非表示が切り替わる。
  $(".nav__menu").toggleClass("nav__menu--show");
});

/**
 * ナビゲーションバーのリンクをクリックしたら、
 * スムーズにスクロールしながら対象位置に移動
 */
$(".nav__link").on("click", (e) => {
  // 本来のクリックイベントは処理しない
  e.preventDefault();

  // デフォルトはトップ
  let scrollTop = 0;

  // #id名が指定されていたら、該当箇所の位置で上書きする。
  // e.currentTargetは、イベントハンドラを登録した要素を表す。
  // e.targetは実際にイベントが発生した要素。
  // 左上のアイコンをクリックすると、イベントを発生した要素(=e.target)はアイコンとなり、
  // 該当イベントを処理するイベントハンドラを登録した要素(=e.currentTarget)は、a要素となる。
  // a要素のhref属性を取得したいので、e.currentTargetを用いる。
  const destination = $(e.currentTarget).attr("href");

  if (destination !== "#") {
    scrollTop = $(destination).offset().top;
  }

  $("html, body").animate(
    {
      scrollTop,
    },
    1000
  );

  // メニューが開いている場合は閉じる
  if ($(".nav__menu").hasClass("nav__menu--show")) {
    $(".nav__menu").removeClass("nav__menu--show");
  }
});

// image-gallery__itemクラスの中のa要素にMagnific Popupを適用
$(".image-gallery__item a").magnificPopup({
  type: "image",
  gallery: { enabled: true },

  /**
   * ポップアップに適用されるクラス。
   * ここではフェードイン・アウト用のmfp-fadeクラスを適用。
   */
  mainClass: "mfp-fade",

  // ポップアップが非表示になるまでの待ち時間
  removalDelay: 300,
});

/**
 * ---------------------------------------
 * ページの読み込みが完了したタイミングで行うDOM操作
 * ---------------------------------------
 */

// モバイルブラウザでは静止画を表示し、それ以外では動画を表示
if (isMobile) {
  $(".top__bg").css({
    "background-image": "url(video/top-video-still.jpg)",
  });
} else {
  $(".top__video").css({ display: "block" });
}

// 初期状態として1番目のタブを表示
showTab("puppies-1");
showTab("kittens-1");

// パララックスを初期化する
initParallax();
