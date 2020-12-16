//Design Underground System
// Implement the class UndergroundSystem that supports three methods:

// 1. checkIn(int id, string stationName, int t)

// A customer with id card equal to id, gets in the station stationName at time t.
// A customer can only be checked into one place at a time.
// 2. checkOut(int id, string stationName, int t)

// A customer with id card equal to id, gets out from the station stationName at time t.
// 3. getAverageTime(string startStation, string endStation)

// Returns the average time to travel between the startStation and the endStation.
// The average time is computed from all the previous traveling from startStation to endStation that happened directly.
// Call to getAverageTime is always valid.
// You can assume all calls to checkIn and checkOut methods are consistent. That is, if a customer gets in at time t1 at some station, then it gets out at time t2 with t2 > t1. All events happen in chronological order.
var UndergroundSystem = function () {
  this.allCheckIns = {}
  this.allCheckOuts = {}
  this.allTravelTimes = {}
};

/**
* @param {number} id
* @param {string} stationName
* @param {number} t
* @return {void}
*/
UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.allCheckIns[id] = { stationName, t }
};

/**
* @param {number} id
* @param {string} stationName
* @param {number} t
* @return {void}
*/
UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  this.allCheckOuts[id] = { stationName, t }
  if (!this.allTravelTimes[`${this.allCheckIns[id].stationName}-${stationName}`]) {
    this.allTravelTimes[`${this.allCheckIns[id].stationName}-${stationName}`] = []
    this.allTravelTimes[`${this.allCheckIns[id].stationName}-${stationName}`].push(t - this.allCheckIns[id].t)
  }
  else {
    this.allTravelTimes[`${this.allCheckIns[id].stationName}-${stationName}`].push(t - this.allCheckIns[id].t)
  }
};

/**
* @param {string} startStation
* @param {string} endStation
* @return {number}
*/
UndergroundSystem.prototype.getAverageTime = function (startStation, endStation) {
  let stationTimes = this.allTravelTimes[`${startStation}-${endStation}`]
  return stationTimes.reduce((accum, current) => {
    return accum += current
  }, 0) / stationTimes.length
};
