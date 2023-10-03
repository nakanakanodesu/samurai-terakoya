const animal = { //animalという変数名でオブジェクト作成
  name: `雀`, //動物の種類名（'犬'・'猫'など）の文字列を代入するプロパティ
  voice: `チュンチュン`, //鳴き声の文字列を代入するプロパティ
  bark: function () { //オブジェクト自身の name と voice へアクセスした上で、鳴き方の説明をコンソールに出力するメソッド
    console.log(`${this.name}は${this.voice}と鳴く`);
  },
};
animal.bark(); //メソッドを呼び出し
 
 
// const animal = {
//   //animalという変数名でオブジェクト作成
//   name: [`雀`, `狼`], //動物の種類名（'犬'・'猫'など）の文字列を代入するプロパティ
//   voice: [`チュンチュン`, `ウォウウォウ`], //鳴き声の文字列を代入するプロパティ
//   bark: function () {
//     //オブジェクト自身の name と voice へアクセスした上で、鳴き方の説明をコンソールに出力するメソッド
//     console.log(`${this.name[0]}は${this.voice[0]}と鳴く`);
//     console.log(`${this.name[1]}は${this.voice[1]}と鳴く`);
//   },
// };
// animal.bark(); //メソッドを呼び出し