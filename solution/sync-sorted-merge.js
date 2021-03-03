"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  //Pop all entries and store them in a list
  let headEntries = logSources.map( (source) => source.pop())
  while(headEntries.filter(entry => entry).length > 0){
    //order entry list
    let orderedList = headEntries.sort((x, y) => {
      if(!x && !y) return 0
      if(!y) return -1
      if(!x) return 1
      return x.date.getTime() - y.date.getTime()
    })
    //print log 
    printer.print(orderedList[0])
    //pop log from source where log was printed.
    let index = headEntries.findIndex(item => item === orderedList[0])
    headEntries[index] = logSources[index].pop()
  }
};
