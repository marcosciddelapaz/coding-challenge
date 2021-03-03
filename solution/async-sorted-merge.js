"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    //Pop all entries and store them in a list
    Promise.all(logSources.map( (source) => source.popAsync())).then( async (headEntries) => {
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
        headEntries[index] = await logSources[index].pop()
      }
      resolve(console.log("Async sort complete."));
    })
  });
};
