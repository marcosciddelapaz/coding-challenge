"use strict";

const logUtils = require("./utils/log-utils.js")
const SortedMap = require("collections/sorted-map");
const orderEntriesByDate = logUtils.orderEntriesByDate

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
    //Pop all entries and store them in a list
    Promise.all(logSources.map( async (source) => {
      const log = await source.popAsync()
      return !!log? [log, source] : [null, null]
    })).then( async (entries) => {
      let headEntries = new SortedMap(new Map(entries), (x,y) => x === y,  orderEntriesByDate)
      while(headEntries.size > 0){
        //print log 
        var entry = headEntries.store.min()
        printer.print(entry.key)
        //pop log from source where log was printed.
        headEntries.delete(entry.key)
        const key = await entry.value.pop()
        if(key){
          headEntries.set(key, entry.value)
        }
      }
      resolve(console.log("Async sort complete."));
    })
  });
};
