module.exports = { 
  orderEntriesByDate: (x, y) => {
    if(!x && !y) return 0
    if(!y) return -1
    if(!x) return 1
    return x.date.getTime() - y.date.getTime()
  }
}