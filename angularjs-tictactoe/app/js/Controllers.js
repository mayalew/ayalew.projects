function TicTacToeCntl($scope, $location,$window) {
  
  $scope.cellStyle= {
    'height': '100px',
    'width': '100px',
    'border': '1px solid black',
    'text-align': 'center',
    'vertical-align': 'middle',
    'cursor': 'pointer'
  };
  
  $scope.players=['Computer','Person'];
  
  $scope.reset = function() {
    $scope.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    
    var idx=(Math.floor(Math.random() * 2));
    $scope.firstMove= "XO".charAt(idx);
    $scope.computerMark='O';// fixed
    $scope.isFirstGame=true;
    $scope.nextMove= $scope.firstMove;
    $scope.winner= '';
    if ($scope.nextMove==$scope.computerMark) $scope.goComputer();
  };
 
  $scope.dropPiece = function(row, col) {
    if (!$scope.winner && !$scope.board[row][col]) {
      $scope.board[row][col] = $scope.nextMove;
      $scope.nextMove = $scope.nextMove == 'X' ? 'O' : 'X';
      grade();
      
      if ($scope.winner){
      		$scope.winner= $scope.winner=="X"? 'You have won! Click reset to play again.': 
      											'Computer has won! Click reset to play again.';
      	return;
      }
      if(isTie()){
      	$scope.winner= "It is a tie. Click reset to play again.";
      	return;
      }
     $scope.isFirstGame=false;
      if ($scope.nextMove==$scope.computerMark) $scope.goComputer();
    }
  };
 
  function grade() {
    var b = $scope.board;
    $scope.winner =
      row(0) || row(1) || row(2) ||
      col(0) || col(1) || col(2) ||
      diagonal(-1) || diagonal(1);
    function row(row) { return same(b[row][0], b[row][1], b[row][2]);}
    function col(col) { return same(b[0][col], b[1][col], b[2][col]);}
    function diagonal(i) { return same(b[0][1-i], b[1][1], b[2][1+i]);}
    function same(a, b, c) { return (a==b && b==c) ? a : '';};
  }
 
 function isTie(){
 	var b = $scope.board;
 	var found=true;
  	var i=0; //row
  	while (i<=2 && found) {
	  	for (var j =0;j<=2;j++){
	  			if(b[i][j]=='') {
	  				found=false;
	  				break;
	  			}
  			}
  		i++;
  	}
  	return found;
  }
  
  $scope.goComputer = function(){
  	//begin game
  	if ($scope.isFirstGame){
  		$scope.dropPiece((Math.floor(Math.random() * 3)),(Math.floor(Math.random() * 3)));
  		return;
  	}
  	
  	var b = $scope.board;
  	var mark= $scope.computerMark;
  	var oppMark = mark=== 'X' ? 'O' : 'X';
 	var isfound=false;
 	
 	isfound=goPlay(mark,1); //go to win
 	if (isfound) return;
 	isfound=goPlay(oppMark,1); //go defend
 	
 	if (isfound) return;
 	isfound=goPlay(mark,2); //go to add a score 
 	
 	if (isfound) return;
 	isfound=goPlay(oppMark,2); //go to score first time
 	
 	// it is a tie, anyway complete it
	 if (isfound) return;
	  lastOne(b);
	 	
 	//computer play
 	function goPlay(mark,s){
 		//cell objects
		var aCell={'row':-1,'col':-1,'value':''};
		var bCell={'row':-1,'col':-1,'value':''};
		var cCell={'row':-1,'col':-1,'value':''};
		var cell ={};
		
	//priority to diagonals
	//check first diagonal '\' 
	aCell.row=0; aCell.col=0; aCell.value=b[0][0];
	bCell.row=1; bCell.col=1; bCell.value=b[1][1];
	cCell.row=2; cCell.col=2; cCell.value=b[2][2];
	
	 if (s==1){
		  	cell = findTwo(mark,aCell,bCell,cCell);
		 	}
	else if (s==2){
		 	cell = findOne(mark,aCell,bCell,cCell);
		 	}
 	 
	 if(!angular.equals(cell, {})) { //if not empty object
	 	$scope.dropPiece(cell.row,cell.col);
		isfound=true;
	 }
	if(isfound) return isfound;	

	//check 2nd diagonal '/'
	cell ={};
	aCell.row=0; aCell.col=2; aCell.value=b[0][2];
	bCell.row=1; bCell.col=1; bCell.value=b[1][1];
	cCell.row=2; cCell.col=0; cCell.value=b[2][0];
	
	 if (s==1){
		  	cell = findTwo(mark,aCell,bCell,cCell);
		 	}
	else if (s==2){
		 	cell = findOne(mark,aCell,bCell,cCell);
		 	}
 	 
	 if(!angular.equals(cell, {})) { //if not empty object
	 	$scope.dropPiece(cell.row,cell.col);
		isfound=true;
	 }
	if(isfound) return isfound;	
	
	cell ={};
	for (var j =0;j<=2;j++){ // rows		
			aCell.row=j; aCell.col=0; aCell.value=b[j][0];
			 bCell.row=j; bCell.col=1; bCell.value=b[j][1];
			 cCell.row=j; cCell.col=2; cCell.value=b[j][2];
			 
			 if (s==1){
			  	cell = findTwo(mark,aCell,bCell,cCell);
			 	}
			 else if (s==2){
			 	cell = findOne(mark,aCell,bCell,cCell);
			 	}
			  
			 if(!angular.equals(cell, {})) { //if not empty object
			 	$scope.dropPiece(cell.row,cell.col);
				isfound=true;
				break;
			}
		}
		
		if(isfound) return isfound;	
			
			cell ={};
		for (var i =0;i<=2;i++){	// columns	
			 aCell.row=0; aCell.col=i; aCell.value=b[0][i];
			 bCell.row=1; bCell.col=i; bCell.value=b[1][i];
			 cCell.row=2; cCell.col=i; cCell.value=b[2][i];
			 
			 if (s==1){
			  	cell = findTwo(mark,aCell,bCell,cCell);
			 	}
			 else if (s==2){
			 	cell = findOne(mark,aCell,bCell,cCell);
			 	}
			  
			 if(!angular.equals(cell, {})) { //if not empty object
			 	$scope.dropPiece(cell.row,cell.col);
				isfound=true;
				break;
			 }
		}
	if(isfound) return isfound;	
	
	
	//not found
	return false;	
 	}
		
	//m:mark, a,b,c: objects representing a cell as {row:#,col:#, value:val}
  	function findTwo(m,a, b, c) { 
  	  	if(m==a.value && a.value==b.value && c.value=='')  return c;	
  	 	if(m==a.value && a.value==c.value && b.value=='')  return b;
  	 	if(m==b.value && b.value==c.value && a.value=='') return a;
  	 	return {};//empty object
  	  }
  	  
  	  //m:mark, a,b,c: objects representing a cell as {row:#,col:#, value:val}
  	function findOne(m,a, b, c) { 
  	  	if(m==a.value && b.value==c.value && c.value=='')  return c;	
  	 	if(m==b.value && a.value==c.value && c.value=='')  return a;
  	 	if(m==c.value && a.value==b.value && a.value=='') return b;
  	 	return {};//empty object
  	  }
  	// find the last empty cell
  function lastOne(b){
  	var i=0; //row
  	var found=false;
  	while (i<=2 && !found) {
	  	for (var j =0;j<=2;j++){
	  			if(b[i][j]=='') {
	  				$scope.dropPiece(i,j);
	  				found=true;
	  				break;
	  			}}
	  	i++;
	  }}
  
  };
 
  $scope.reset();
//TicTacToeCntl.$inject = ['$scope', '$location'];
}