# Contact App Challenge

The main goal of this is to challenge myself to build a web app from scratch. Though simple and useless, an app to manage contacts can be pretty neat to learn important concepts.

## Requirements

As a user, I need a web application to manage contacts (_view_, _create_, _update_ and _delete_). The application will be divided into two main parts: the **client** and the **server**.

The project must use **Git** as code versioning tool. In the end, the source code will be made available on **Github**.

### The Server

The server must:

1. Serve static files to the client;
    * `.css` and `.js` files must be minified.
2. Expose a RESTful API to **retrieve**, **create**, **update** and **delete** contacts.
3. Persist data by storing them in a `.json` file.

Frameworks such as `express` and `koa` are not allowed. The server must be built using solely the current LTS version (8.9.4) of `Node.js`.

### The Contact Model

* `id`, unique, incremental integer
* `first_name`
* `last_name`
* `job_title`
* `email`
* `gender`
* `phone`, format ###-###-####
* `city`
* `street_address`

The server must start with at least 10 contacts for testing. Use [Mockaroo](https://www.mockaroo.com/) to generate sample data.

### The Client

The client side must only make use of `Bootstrap`, `jQuery` and `Sass`. `jQuery` plugins are allowed.

The user should be allowed to search, view, create, update and delete contacts.