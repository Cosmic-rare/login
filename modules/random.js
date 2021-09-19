module.exports = function(userId) {
    const crypto = require('crypto'); // hashを作る準備
    const now = Date.now(); // タイムスタンプを取得
    const random = Math.round(Math.random()*10000000000); // ランダムの数字を作成

    // くっつけてハッシュにする
    const str = String(userId) + String(random) + String(now);
    return crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}
