//selectorに該当するタブを表示する関数

const showTab = (selector) => {
  // 引数selectorの中身をコンソールで確認する
  console.log(selector);

  /* 1. タブの選択状態のリセット */
  // いったん、すべての.tabs-menuの子要素からactiveクラスを削除する
  $(".tabs-menu > div").removeClass("active");

  // ❌いったん、すべての.tabs-contentを非表示にする
  // ❌$(".tabs-content").hide();
  //tabs-contentの子要素を非表示にする
  $(".tabs-content > div").hide();

  /* 2. 選択されたタブの表示 */
  // クリックされたselectorにactiveクラスを付けそれに対応したcontentを表示する
  $(selector).addClass("active");
  if (selector === `#tab-menu-a`) {
    // ❌if (`#tab-menu-a="${selector}"`) {
    console.log(selector);
    $("#tabs-a").show();
    // ❌} else if (`#tab-menu-b="${selector}"`) {
  } else if (selector === `#tab-menu-b`) {
    $("#tabs-b").show();
  } else {
    $("#tabs-c").show();
  }
};

// タブがクリックされたらコンテンツを表示
$(".tabs-menu div").on("click", (e) => {
  // idの値を受け取った後、showTab()関数に渡す。
  const selector = $(e.target).attr("id");
  showTab(`#` + selector);
});

// 初期状態として1番目のタブを表示
showTab("#tab-menu-a");
