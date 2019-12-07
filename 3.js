//First star

// imports 
var fs = require('fs');
var cm = require('./common.js')

var contents = fs.readFileSync('3.txt','utf8');
// var contents  = "R8,U5,L5,D3\nU7,R6,D4,L4";

var dirsOne = contents.split("\n")[0].split(",");
var dirsTwo = contents.split("\n")[1].split(",");

//constructing points 
var a1 = [new cm.Point(0,0)];
var a2 = [new cm.Point(0,0)];

function makeIntoPoints(a,directions){
  for(i=0;i<directions.length;i++){
    var s = directions[i];
    var num = Number(s.slice(1));
    var pt = a[a.length-1].copy(); 
    switch(s[0]) {
      case "R":
        pt.x += num;
        break;
      case "U":
        pt.y += num
        break;
      case "L":
        pt.x -= num
        break;
      case "D":
        pt.y -= num
        break;
    }
    a.push(pt)
  }
}

makeIntoPoints(a1,dirsOne);
makeIntoPoints(a2,dirsTwo);

var collisions = [];

for(i=0;i<=a1.length-2;i++){ // for each pair hence length -2
  var thisPt = a1[i];
  var nextPt = a1[i+1];
  
  var vertical = false;
  if(thisPt.x==nextPt.x){
    vertical = true;
  }

  if( vertical ){
    var lower = Math.min(thisPt.y,nextPt.y)
    var upper = Math.max(thisPt.y,nextPt.y)
    var constCoord = thisPt.x

    for(j=0;j<=a2.length-2;j++){ // iterate over second line for each segment of this line
      var thisPtI = a2[j];
      var nextPtI = a2[j+1];
      if((lower<=thisPtI.y&&thisPtI.y<=upper)||(lower<=nextPtI.y&&nextPtI.y<=upper)){ // we have the potential for a collision
        var lowerI = Math.min(thisPtI.x,nextPtI.x)
        var upperI = Math.max(thisPtI.x,nextPtI.x)
        var lowerI2 = Math.min(thisPtI.y,nextPtI.y);
        var upperI2 = Math.min(thisPtI.y,nextPtI.y);
        if(lowerI<=constCoord&&constCoord<=upperI){ // we have a collision
          if(lowerI==upperI){ // this line segment is incident and parallel with the outer segment
            for(c2=Math.max(lower,lowerI2);c2<=Math.min(upper,upperI2);c2++){ //add every point on the intersection between outer and inner lines
              collisions.push(new cm.Point(constCoord, c2))
            }
            continue;
          } else { // normal one-point intersection
            if(i==0 && j==0){ // exclude the case that this is the first segment for both lines
              continue; 
            }
            var coll = new cm.Point(constCoord, lowerI2)
            collisions.push(coll); // lowerI2 == upperI2 since inner line is perp. to outer
            console.log(coll)
          }
        }
      }
    }
  } else {// horizontal
    var lower = Math.min(thisPt.x,nextPt.x)
    var upper = Math.max(thisPt.x,nextPt.x)
    var constCoord = thisPt.y

    for(j=0;j<=a2.length-2;j++){ // iterate over second line for each segment of this line
      var thisPtI = a2[j];
      var nextPtI = a2[j+1];
      if((lower<=thisPtI.x&&thisPtI.x<=upper)||(lower<=nextPtI.x&&nextPtI.x<=upper)){ // we have the potential for a collision
        var lowerI = Math.min(thisPtI.y,nextPtI.y)
        var upperI = Math.max(thisPtI.y,nextPtI.y)
        var lowerI2 = Math.min(thisPtI.x,nextPtI.x);
        var upperI2 = Math.min(thisPtI.x,nextPtI.x);
        if(lowerI<=constCoord&&constCoord<=upperI){ // we have a collision
          if(lowerI==upperI){ // this line segment is incident and parallel with the outer segment
            for(c2=Math.max(lower,lowerI2);c2<=Math.min(upper,upperI2);c2++){ //add every point on the intersection between outer and inner lines
              collisions.push(new cm.Point(c2,constCoord ))
            }
            continue;
          } else { // normal one-point intersection
            if(i==0 && j==0){ // exclude the case that this is the first segment for both lines
              continue; 
            }
            var coll = new cm.Point(lowerI2,constCoord )
            collisions.push(coll); // lowerI2 == upperI2 since inner line is perp. to outer
            console.log(coll)
          }
        }
      }
    }

  }

}
console.log("Got All Collisions");
console.log("_____________________________)");

var lowestDist = Number.POSITIVE_INFINITY;
var lowestDistPoint = null;
var origin = new cm.Point(0,0);
var thisDist = null;

for (pt of collisions){
  thisDist = origin.manhattanDistance(pt);
  if(thisDist<=lowestDist){
    lowestDist = thisDist
    lowestDistPoint = pt
  }
}

console.log(lowestDistPoint);
console.log("lowest distance:")
console.log(lowestDist);
