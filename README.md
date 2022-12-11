# bestwebs
bestwebs is a helper, wrapper functions library also published on npm @ https://www.npmjs.com/package/bestwebs


## Usage/Examples

### http
To send network request
```javascript
import { http } from 'bestwebs'

// GET
http.get(url, options = {});

// DELETE
http.delete(url, options = {});

// POST
http.post(url, body, options = {});

// PUT
http.put(url, body, options = {});

// PATCH
http.patch(url, body, options = {});
```


### sha512
Hash supplied string to sha512
```javascript
import { sha512 } from 'bestwebs'

let __HASHED_STRING__ = sha512( __STRING_TO_BE_HASHED__ );
```



### events
To pass below events propogated by betwebs library to router & store
- bw:alert
- bw:redirect
- bw:loading

```javascript
import { events } from 'bestwebs'

events(router, store)
```



### storage

```javascript
import { storage } from 'bestwebs'

storage (name, value, [options]);

// options.type: "local"/"Session"/"cookie" -- default: "local"

storage("user", {name: "Santosh"}) // {name: "Santosh"} ## to set
storage("user") // {name: "Santosh"} /## to get
storage("user", null) // {name: "Santosh"}  ## to delete
 ```



### debounce
```javascript
import { debounce } from 'bestwebs'

debounce (callback, wait = 500, immediate = false)
```


### throttle
```javascript
import { throttle } from 'bestwebs'

throttle (callback, wait = 500)
```



### noty
```javascript
import { noty } from 'bestwebs'

noty(type, message, config)
```




### browser
Get the browser details
```javascript
import { browser } from 'bestwebs'

console.log( browser() );

// Sample output
{
    "isMobile": false,
    "name": "Chrome",
    "version": "107",
    "os": "Windows",
    "osVersion": "10",
    "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.42"
}
```




### validations
```javascript
import { validations } from 'bestwebs'


validations.required(value);
validations.email(value);
validations.upi(value);
validations.mobile(value);
validations.username(value);
validations.gstin(value);
validations.pan(value);
validations.aadhar(value);
validations.ifsc(value);
validations.minLength(min)(value);
validations.maxLength(max)(value);
validations.min(min)(value);
validations.max(max)(value);
validations.custom(regex, [message])(value);
validations.number(min, max)(value);
validations.text(minlength, maxlength, [regex])(value);
validations.match(existingValue)(value);
validations.alphaFirst(value);
validations.filecount(min, max)(value);
validations.lpad(value);

// Can  also be used inside rules prop like ...

:rules="[validations.required, validations.text(6,100)]"

```



### sleep
Can be used inside async await to perfom php sleep
```javascript
import { sleep } from 'bestwebs'

sleep(timeInSeconds)
```


### loader
```javascript
import { loader } from 'bestwebs'

loader(isLoading)
```



### random
To generate random number between min, max (both can be possible) wit precision (digits after decimal)
```javascript
import { random } from 'bestwebs'


random(min, max, precision)
```