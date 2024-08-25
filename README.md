<div align="center">
  <h1>Maggo</h1>
   <img src="https://img.shields.io/badge/npm-1.3v-blue">
  <h6>A versatile HTTP client library for simplifying API requests and handling responses with ease. </h6>
</div>

- [Get started](#get-started)
- [Installing](#installing)
- [Usage](#usage)
  - [Instances](#instances)
  - [Response shape](#response-shape)
  - [Templates](#templates)

## Get started

Maggo is a tool that helps you in the process of making http requests on the web and on servers (inspired by axios) supporting the main http methods (GET, POST, PUT, DELETE) plus some added extras to speed up very specific processes and solve common problems. focused on simplicity and minimalism

#### Your first GET request

After [installing](#installing) the pagacke using `npm` or `yarn`, just import a basic instance and use the method you need. In this case we will make a GET request

```js
import { maggo } from "maggo/request";

maggo.get("https://jsonplaceholder.typicode.com/posts");
```

This would be the minimum to be able to make a request. From here we can manipulate the response to work with it in this way :

```js
import { maggo } from "maggo/request";

const respone = maggo.get("https://jsonplaceholder.typicode.com/posts");
console.log(response.body);
```

Or this way :

```js
import { maggo } from "maggo/request";

maggo
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((res) => console.log(res.body))
  .catch((err) => console.error(err));
```

## Installing

Using npm

```js
$ npm i maggo
```

Using pnpm

```js
$ pnpm i maggo
```

Using yarn

```js
$ yarn add maggo
```

## Usage

#### Instances

Once installed Maggo you have two options to be able to use it and start making requests. The first method is using a basic instance with the same name since it is a re-export from the Maggo factory as seen in the example in the [Get started](#get-started) section. This would be the easiest and fastest method.

```js
import { maggo } from "maggo/request";

// Using a base instance
const respone = maggo.get("https://jsonplaceholder.typicode.com/posts");
console.log(response.body);
```

The second method would be to create an instance of the Maggo class which you can use exactly the same as the base instance with the difference that with this method you can assign a base URL for all requests made using this instance.

```js
import Maggo from "maggo";

// Creating the instance with a base URL
const maggo = new Maggo("https://jsonplaceholder.typicode.com");

// This will do a GET request to :
// https://jsonplaceholder.typicode.com/post
maggo.get("/post");
```

#### Response shape

The response to a request includes the following details.

```js
{
  // `details` will contain all the information of
  // the request itself such as headers, cookies, etc.
  details: Promise;

  // `body` is the response that was provided by the server
  body: {
  }

  // `status` is the HTTP status code from the server response
  status: 200;
}
```

When using then, the response will be handled like this:

```js
maggo.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
  console.log(response.details);
  console.log(response.body);
  console.log(response.status);
});
```

#### Templates

Using templates you can tell Maggo what form the server response (which comes in the body object) is expected to have using type or typescript interfaces.

```ts
import { maggo } from "maggo/request";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

maggo.get<Post>("https://jsonplaceholder.typicode.com/posts");
```

## License

[MIT](LICENSE)
