"use strict";

// Print all entries, across all of the sources, in chronological order.

const logUtils = require("./utils/log-utils.js")
const SortedMap = require("collections/sorted-map");
const orderEntriesByDate = logUtils.orderEntriesByDate

module.exports = (logSources, printer) => {
  //Pop all entries and store them in a list
  const entries = logSources.map( (source) => {
    const log = source.pop()
    return !!log? [log, source] : [null, null]
  })
  let headEntries = new SortedMap(new Map(entries), (x,y) => x === y,  orderEntriesByDate)
  while(headEntries.size > 0){
    //print log 
    var entry = headEntries.store.min()
    printer.print(entry.key)
    //pop log from source where log was printed.
    headEntries.delete(entry.key)
    const key = entry.value.pop()
    if(!!key){
      headEntries.set(key, entry.value)
    }
  }
  return console.log("Sync sort complete.");
};
