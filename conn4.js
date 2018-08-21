var player1 = prompt("Player 1:Blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Player 2:Red");
var player2Color = 'rgb(237, 45, 73)';

var game_on = true;
var table = $('table tr' );

function reportWin(rowNum,colNum) {
  console.log("You Won");
  console.log(rowNum);
  console.log(colNum);
}

function changeColor(rowIndex,colIndex,color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  var colorReport = returnColor(6,colIndex);
  for (var row = 6; row >= 0; row--) {
    colorReport = returnColor(row,colIndex);
    if (colorReport === 'rgb(128, 128, 128)') {
      return row;
    }
  }
}

function colorMatchCheck(one,two,three,four) {
  return (one === two && one === three && one === four && one!=='rgb(128, 128, 128)' &&  one!==undefined);
}

function horizontalWinCheck() {
  for (var row = 0; row < 7; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))) {
        console.log("horiz");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}

function verticalWinCheck() {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 7; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))) {
        console.log("vertical");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}
function diagonalWinCheck() {
  for (var row = 0; row < 4; row++) {
    for (var col = 0; col < 4; col++) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1), returnColor(row+2,col+2), returnColor(row+3,col+3))) {
        console.log("diagonal");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }

  for (var row = 0; row < 4; row++) {
    for (var col = 6; col > 2; col--) {
      if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col-1), returnColor(row+2,col-2), returnColor(row+3,col-3))) {
        console.log("diagonal");
        reportWin(row,col);
        return true;
      }
      else {
        continue;
      }
    }
  }
}
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" drop your chip")

$('.board button').on('click',function(){

    var col = $(this).closest('td').index();

    var bottomAvail = checkBottom(col);

    changeColor(bottomAvail,col,currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
      $('h1').text(currentName+" you have won");
      $('h3').fadeOut('fast');
      $('h2').fadeOut('fast');
    }

    currentPlayer = currentPlayer * -1;

    if(currentPlayer===1){
      currentName = player1;
      $('h3').text(currentName+" drop your chip");
      currentColor = player1Color;
    }
    else {
      currentName = player2;
      $('h3').text(currentName+" drop your chip");
      currentColor = player2Color;
    }
})
