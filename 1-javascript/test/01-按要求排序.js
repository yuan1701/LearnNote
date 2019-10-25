/**
 * 题目：
 let arr1 = ['A1','A2','B1','B2','C1','C2']
 let arr2 = ['A','B','C']
 要求返回：["A1", "A2", "A", "B1", "B2", "B", "C1", "C2", "C"]
 */

let arr1 = ['A1','A2','B1','B2','C1','C2']
let arr2 = ['A','B','C']


 /** 方法1 */
 let arr = arr2.map(item => item+'c');
 arr = arr1.concat(arr).sort((a,b)=>a.localeCompare(b)).map((item)=>{
     return item.replace("c",'')
 })
 

 console.log(arr);

 /**
  * 问题2
 let arr3 = ['D1','D2','A1','A2','B1','B2','C1','C2']
 let arr4 = ['A','B','C','D']
 要求返回：["D1", "D2", "D", "A1", "A2", "A", "B1", "B2", "B", "C1", "C2", "C"]
  */
 let arr3 = ['D1','D2','A1','A2','B1','B2','C1','C2']
 let arr4 = ['A','B','C','D']

/** 方法 */
let index=0
arr4.forEach(x=>{
    arr3.forEach((y,key)=>{
        if(y.indexOf(x)>-1){
            index=key
        }
    })
    arr3.splice(index+1,0,x)
})
console.log(arr3);
