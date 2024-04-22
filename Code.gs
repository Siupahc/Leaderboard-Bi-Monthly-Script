/** @OnlyCurrentDoc */
var LEFT_UP_CORNER_ROW = 2; //Coordinates of the cell containing the rank of the first player in the top 10, this assumes that the players are stored in this style : rank, name, score
var LEFT_UP_CORNER_COLUMN = 20; // T is the 20th letter, and in this case our top10 starts in cell T2
function onEditHandler(e) {
    var webhook = "placeholder";
    
    var sheet = SpreadsheetApp.getActiveSheet();

    var top10players = getTop10Players(sheet);
    var message = "Voici l'état du top 10 des meilleurs joueurs de cette saison :\n";
    message=message+"```";
    for (const p of top10players) {
      message = message +p.rank.toString().padEnd(2)+"\t"+p.name.toString().padEnd(35)+"\t"+p.score.toString().padEnd(3)+"\n"+"\n";
    }
    message = message + "```";
    message = message + "Vous n'êtes pas dans le top 10? Alors inscrivez-vous au plus vite à la prochaine bi-monthly pour montrer de quoi vous êtes capable!"
    var payload = JSON.stringify({content: message});

    var params = {
        method: "POST",
        payload: payload,
        muteHttpExceptions: true,
        contentType: "application/json"
    };
    var response = UrlFetchApp.fetch(webhook,params);
}
function getTop10Players(sheet) {
  var players = [];
  for (let i = 0;i<10;i++) {
    var range = sheet.getRange(LEFT_UP_CORNER_ROW+i,LEFT_UP_CORNER_COLUMN,1,3);
    var values = range.getValues()[0];
    const player = {
      rank: values[0],
      name: values[1],
      score: values[2]
    };
    players.push(player);
  }
  return players;
}
