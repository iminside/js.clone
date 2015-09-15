### Install

```
npm install js.clone --save
```

### Usage

```javascript

import Clone from "js.clone";

var a, b, c;

a = {
	null:     null,
	boolean:  true,
	number:   1,
	string:   "string",
	regexp:   /regexp/,
	function: function(){},
	array:    ["array"],
	object:   {foo: "bar"}
}

b = Clone( a );

a == b // false

a.array.push( 1 );
a.array // > ["array", 1]
b.array // > ["array"]

// Circular links

a.circular = a;
a.circular === a          // > true
c = Clone( a );
c.circular === c          // > true
c.circular === a.circular // > false

```

