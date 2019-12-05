function runIntCode(arr){
    var inputArray = arr.slice();
    var idx = 0;
    while(inputArray[idx] != 99){
        if(inputArray[idx]== 1){
            // addition     
            inputArray[inputArray[idx+3]] = inputArray[inputArray[idx+1]] + inputArray[inputArray[idx+2]]
        } else if(inputArray[idx]==2){
            // multiplication     
            inputArray[inputArray[idx+3]] = inputArray[inputArray[idx+1]] * inputArray[inputArray[idx+2]]
        }
        idx += 4;
    }
    return inputArray[0]; 
}