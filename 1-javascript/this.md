```javascript
function Person(){this.name='person';console.log(this)}
Person()
// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}

new Person()
// Person {name: "person"}
```
