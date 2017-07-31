[![Coverage Status](https://coveralls.io/repos/github/cyrielo/LocalStorageDB.js/badge.svg?branch=master)](https://coveralls.io/github/cyrielo/LocalStorageDB.js?branch=setup-repo-badges) [![Build Status](https://circleci.com/gh/cyrielo/LocalStorageDB.js.svg?branch=master&style=shield)](https://circleci.com/gh/cyrielo/LocalStorageDB.js.svg?branch=master&style=shield) [![Code Climate](https://codeclimate.com/github/cyrielo/LocalStorageDB.js/badges/gpa.svg)](https://codeclimate.com/github/cyrielo/LocalStorageDB.js)
# LocalStorageDB
LocalStorageDB is an enhancement of the built-in localStorage for browsers, it gives you the ability to save complex data localy for rapid application development.

It works like Firebase except less complex and this time it's offline. It's useful in instances where you want to cache little or large data within the application on the user's machine.


why use LocalStorageDB?

 * It's pretty fast and lightweight (2kb)
 * It has the least complex data storage api while also providing rich functionality
 * No form of setups required

## Installation
To get the latest version of LocalStorageDB, simply run this command
```
via npm

 npm install local-storage-db

via bower

bower install local-storage-db


```
Alternatively you can download it from github as a zip, extract and move it to your project directory

you will then need to link it like this

```html
<script type="text/javascript" src="LocalStorageDB/dist/localStorageDB.min.js">
```
## Usage

```javascript
// For node only

import LocalStorageDB from 'local-storage-db';
```

First create an instance to use for your app. The construtor parameter is similar to the key in the `setItem` method and is required.

NOTE: you can create multiple instance for your app if you want

#### Creating data
```javascript
const db = new LocalStorageDB('documents');

// CREATING DATA

db.create('users', [{id: 1, name: 'john-doe'}, {id: 2, name: 'jane-doe'}]);
// append new user
db.create('users', {id: 3, name: 'dan-daniels'});

// this would return
// {"users" : [ {id: 1, name: 'john-doe'}, {id: 2, name: 'jane-doe'}, {id: 3, name: 'dan-daniels'}]}

// similarly you can create new data like this

db.create('pictures', { img: 'pic1.jpg', ownerId: 1 } );
db.create('pictures', { img: 'pic2.jpg', ownerId: 2 } );

// this would return
// { pictures: [{ img: 'pic1.jpg', ownerId: 1 }, { img: 'pic2.jpg', ownerId: 2 }] }


```

#### Reading data
```javascript


db.get();

/* this would return
{ "users" : [ {id: 1, name: 'john-doe'}, {id: 2, name: 'jane-doe'}, {id: 3,
name: 'dan-daniels'}],
  "pictures": [{ img: 'pic1.jpg', ownerId: 1 }, { img: 'pic2.jpg', ownerId: 2 }]
}
*/

db.get('pictures');
//this would return

/*
[{ img: 'pic1.jpg', ownerId: 1 }, { img: 'pic2.jpg', ownerId: 2 }]
*/

db.get('users', 2);

// this would return
// {id: 3, name: 'dan-daniels'}
```

#### Updating data
```javascript
db.update( {id: 3, name: 'Dr Dan Daniels'}, 'users' , 2);

// this would override the third user with new information resulting to:
/*
{"users" : [ {id: 1, name: 'john-doe'}, {id: 2, name: 'jane-doe'}, {id: 3,
name: 'Dr Dan Daniels'}]}
*/

db.update( [], 'pictures')
// this would override the pictures saved already with an empty array

```
#### Deleting data
```javascript
db.remove('pictures');

// this would remove the picture key from the object

db.remove('users', 0);
// this would remove the first element in the users array
/*
"users" : [{id: 2, name: 'jane-doe'}, {id: 3, name: 'dan-daniels'}]
*/

db.remove();
// this would remove every item in the object

```

## Contributing

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.


## License
The MIT License (MIT). Please see License File for more information.
