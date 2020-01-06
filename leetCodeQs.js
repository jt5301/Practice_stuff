//Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.
var threeSum = function(nums) {
  let sumArrays = []
    let sortedArray = bubbleSort(nums)
    for(let i = 0;i<sortedArray.length-2;i++){
      let firstNum = sortedArray[i]
      let secondInd = i+1
      let thirdInd = sortedArray.length-1
      while(thirdInd>secondInd){
        if(firstNum+sortedArray[secondInd]+sortedArray[thirdInd]===0){
          let correctArray = [firstNum,sortedArray[secondInd],sortedArray[thirdInd]]
          sumArrays.push(correctArray)
          secondInd+=1
          thirdInd-=1
        }
        if(firstNum+sortedArray[secondInd]+sortedArray[thirdInd]<0){
          secondInd+=1
        }
        if(firstNum+sortedArray[secondInd]+sortedArray[thirdInd]>0){
          thirdInd-=1
        }
      }
    }
    return sumArrays
  };
  function bubbleSort(nums){
      for(let i = nums.length-1;i>0;i--){
          let swapped = true
          for(let k = 0;k<i;k++){
              if(nums[k]>nums[k+1]){
                  let temp = nums[k]
                  nums[k]= nums[k+1]
                  nums[k+1] = temp
                  swapped = false
              }
          }
      }
      return nums
  }


//container w most water

//brute force
var maxArea = function(height) {
  let currentHighest = 0

  for(let i = 0; i<height.length;i++){
    for(let k = i+1;k<height.length;k++){
        let lowest = Math.min(height[i],height[k])
        let tempHighest = lowest * (k-i)
        currentHighest = Math.max(currentHighest,tempHighest)
    }
  }
  return currentHighest
};
//w pointers

var maxArea = function(height) {
  let left = 0
  let right = height.length-1
  let mostWater = 0

  while(left < right){
      let smallest = Math.min(height[left], height[right])
      let tempHeight = smallest*(right-left)
      mostWater = Math.max(mostWater,tempHeight)
      if(smallest === height[left])left+=1
      else{
          if(smallest===height[right])right-=1
          else{
              if(height[right]===height[left])left+=1
          }
      }
  }
  return mostWater
};

/* Write an algorithm to determine if a number is "happy".

A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.*/

var isHappy = function(n) {
  let recorded = {}
  let numArr = n.toString().split('').map((current)=>{
      return parseInt(current, 10)
  })
  while(true){
      let possibleHappy = numArr.reduce((acc, current) =>{
          acc+= current*current
          return acc
      },0)
      if(possibleHappy === 1) return true
      if(!recorded[possibleHappy]){
          recorded[possibleHappy]=1
          numArr = possibleHappy.toString().split('').map((current)=>
          {
          return parseInt(current, 10)
          })
      }
      else return false
  }
};

/* Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Example:

Input: 38
Output: 2
Explanation: The process is like: 3 + 8 = 11, 1 + 1 = 2.
             Since 2 has only one digit, return it.*/

  var addDigits = function(num) {
  let numArray = num.toString().split('').map((current)=>{
      return parseInt(current, 10)
  })
  while(numArray.length !=1){
      let total = numArray.reduce((accum, current)=>{
          return accum+=current
      },0)
      numArray = total.toString().split('').map((current)=>{
      return parseInt(current, 10)
    })
  }
  return numArray[0]
};

/* Ugle number
Write a program to check whether a given number is an ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.

Example 1:

Input: 6
Output: true
Explanation: 6 = 2 × 3
Example 2:

Input: 8
Output: true
Explanation: 8 = 2 × 2 × 2
Example 3:

Input: 14
Output: false
Explanation: 14 is not ugly since it includes another prime factor 7.*/

var isUgly = function(num) {
  if(num ===0)return false
  while(num !=1){
      if(num % 5 ===0) num = num/5
      else if(num % 3 === 0) num = num/3
      else if (num % 2 === 0) num = num/2
      else{return false}
  }
  return true
};

/*Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price. */
var maxProfit = function(prices) {
  let minPrice = prices[0]
  let maxProfit = 0

  for(let i = 1;i<prices.length;i++){
      if(prices[i]<minPrice) minPrice = prices[i]
      else{
          if(prices[i]-minPrice > maxProfit) maxProfit = prices[i]-minPrice
      }
  }
  return maxProfit
};

/*Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.*/

var maxSubArray = function(nums) {
  let maxEndingHere = nums[0]
	let maxSoFar = nums[0]

	for(let i = 1;i<nums.length;i++){
		let temp = maxEndingHere + nums[i]
		maxEndingHere = Math.max(temp, nums[i])
		maxSoFar = Math.max(maxSoFar, maxEndingHere)
	}
	return maxSoFar
};


//balanced brackets solution

var isValid = function(s) {
  let openingBrackets = '({['
  let bracketLookup = {
      '[':']',
      '{':'}',
      '(':')'
  }
  let stack = []
  for(let i = 0; i< s.length;i++){
      if(openingBrackets.includes(s[i])){
          stack.push(s[i])
      }
      else{
          if(s[i]===bracketLookup[stack[stack.length-1]]){
              stack.pop()
          }
          else return false
      }
  }
      if(stack.length===0)return true
      else{return false}
};