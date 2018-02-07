// Extensionのアイコンがクリックされたときに呼ばれる
chrome.browserAction.onClicked.addListener(function() {
  // デバッグコンソールにメッセージを表示
  console.log('hello tiraura');
  window.open('http://tiraura.orz.hm/rbbs.cgi', '_blank');
});