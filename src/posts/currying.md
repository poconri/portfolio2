---
title: "Currying in Functional Programming: Creating HTML Elements with JavaScript and TypeScript"
date: '2023-04-18T04:41:08.922Z'
category: ["JavaScript", "TypeScript", "Functional programming"]
cover: "/images/blog/builder.png"
thumb: "/images/blog/builder.png"
meta: '[
{
"name": "keywords",
"content": "JavaScript, currying, TypeScript, functional programming"
},
{
"name": "description",
"content": "Discover the power of currying in functional programming and learn how to apply it in JavaScript and TypeScript to create and add HTML elements to the DOM."
},
{
"name": "og:title",
"content": "Exploring Currying in Functional Programming with JavaScript and TypeScript"
},
{
"name": "og:type",
"content": "article"
},
{
"name": "og:description",
"content": "Discover the power of currying in functional programming and learn how to apply it in JavaScript and TypeScript to create and add HTML elements to the DOM."
},
{
"name": "og:url",
"content": "https://portfolio2-poconri.vercel.app/postdetails/currying"
},
{
"name": "og:image",
"content": "https://portfolio2-poconri.vercel.app/images/blog/builder.png"
}
]'
---

Currying, as my teacher explained it, is like a smartphone - it's something you didn't need until you've had one. It is one of the interesting actions used in functional programming to transform a function that takes multiple arguments into a function that takes a single argument and returns another function that takes the next argument, and so on, until all arguments have been supplied.

```javascript
function curry(fn) {
  const arity = fn.length;

  return function $curry(...args) {
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
}
```

To demonstrate how currying works, we will not create the typical function that adds two numbers; instead, we will create a function that creates and adds elements to the DOM.

First things first, let's declare a type that allows us to know what elements we can create with the createElement function. Then we declare the function; the interesting part is that the function will not return an HTML element but will return another function that will receive the text that the HTML element will have.

```typescript
type TagName = keyof HTMLElementTagNameMap;

function createElement(tag: TagName, newClassName: string = ""): (child: string) => void {
  return function (child: string): void {
    const element = document.createElement(tag);
    element.textContent = child;
    if (newClassName) {
      element.classList.add(newClassName);
    }
    document.body.appendChild(element);
  };
}

const newDiv = createElement("div");
newDiv("hello world");

const newDivStyled = createElement("div", "styled");
newDivStyled("hello world");
```

Now, what's interesting about this code is that you can create functions that create HTML elements, and then you can use those functions to create HTML elements with specific text.

This example is very similar to the builder design pattern, but in this case, we are not creating an object; instead, we are creating an HTML element. This speeds up the development process.
