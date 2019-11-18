# Jaypie Gateway 🔹

JSON:API Gateway for AWS Lambda in Node.js

## Project Goals

* JSON:API-compliant backend built on AWS Lambda and API Gateway
* Model-Controller pattern for implementing JSON:APIs (for the view)
* Opinionated REST vocabulary
* Proper use of HTTP status codes
* Aesthetic syntax inspired by Vue and Laravel.  Not "fluent" per se but a natural programming interface focusing on a graceful developer experience

## INB4 "Yet Another Framework"

Most of what I have found:

* Focuses on routing, which I believe should be boilerplate we abstract away by following a REST vocabulary
* Is agonistic on the schema of the response, which I believe leaves a lot for the developer to figure out
* Assumes Express or a similar underpinning rather than native serverless

## Project Status

| Item           | Status                |
| -------------- | --------------------- |
| Models         | In Progress           |
| Controllers    | Not Started           |
| Logging Module | Functionally Complete |
| Error Module   | Not Started           |
| Error Handling | Not Started           |

### Status List

* Complete
* Functionally Complete
* Viable
* In Progress
* Incomplete
* Not Started

## Usage

### Declaring Models

Models are designed to feel like classes to the object-oriented programmer.

* The simplest, but not preferred, way of declaring models is passing an array of attributes as strings
* You can initialize models by passing an object to set initial values
* Then you can interact with attributes in a natural manner

``` javascript
TodoItem = Model.new(["text", "done"]);
groceryTodo = new TodoItem({ text: "Go to grocery", done: false });
groceryTodo.done = true;
```

A more explicit way to define models would be to pass an array of attribute objects that provide the name and, optionally, type and default value:

``` javascript
TodoItem = Model.new([
  { name: "text", type: Model.type.string },
  { name: "done", type: Model.type.boolean, default: false }
]);
groceryTodo = new TodoItem({ text: "Go to grocery", done: false });
groceryTodo.done = true;
```

#### Attribute Types

When attribute types are set, items will throw errors when improper values are passed.

* `Model.type.any` - no types enforced (default)
* `Model.type.boolean`
* `Model.type.date`
* `Model.type.number`
* `Model.type.string`

## License

All rights reserved.  Safe for use around pets.
