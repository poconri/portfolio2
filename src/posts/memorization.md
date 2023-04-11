---
title: "Exploring Memoization in Functional Programming"
date: '2023-04-08T03:21:03.004Z'
category: ["javascript", "typescript", "functional programming"]
cover: "/images/blog/fibonacci.avif"
thumb: "/images/blog/fibonacci.avif"
meta:  '[
  {
    "name": "keywords",
    "content": "JavaScript, Memoization, TypeScript, Functional Programming"
  },
  {
    "name": "description",
    "content": "Discover the power of memoization in functional programming and learn how to apply it in JavaScript and TypeScript to improve the performance of your applications."
  },
  {
    "name": "og:title",
    "content": "Exploring Memoization in Functional Programming"
  },
  {
    "name": "og:type",
    "content": "article"
  },
  {
    "name": "og:description",
    "content": "Discover the power of memoization in functional programming and learn how to apply it in JavaScript and TypeScript to improve the performance of your applications."
  },
  {
    "name": "og:url",
    "content": "https://portfolio2-poconri.vercel.app/postdetails/memorization"
  },
  {
    "name": "og:image",
    "content": "https://portfolio2-poconri.vercel.app/images/blog/fibonacci.avif"
  }
]'
---

In a future discussion, I'd love to talk about something I've been researching lately that took me some time to learn at first: functional programming, specifically, memoization.

For a long time, I believed that memoization was something only used in the world of artificial intelligence. However, it's also used in programming to improve the performance of applications. But what exactly is it?

Memoization is a programming technique that involves storing the results of function calls so they don't have to be recalculated. This is very useful when a function is called many times with the same parameters. Instead of recalculating the result, you can use the stored result.

An interesting point is that a function doesn't need to be pure to be memoized. In other words, it doesn't need to be a function without side effects that solely depends on its parameters. However, it's recommended that a memoized function is pure. All its properties should be determined by its arguments, and it should not depend on anything other than its arguments.

Let's take a look at an example:

```typescript
type MemoizedFunction<T, R> = (...args: T[]) => R;

const memoize = <T, R>(func: MemoizedFunction<T, R>): MemoizedFunction<T, R> => {
  const cache: { [key: string]: R } = {};

  return (...args: T[]): R => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || func(...args);
    return cache[argStr];
  };
};
```

If the TypeScript implementation looks a bit cumbersome, here's the JavaScript version:


```javascript
const memoize = (f) => {
  const cache = {};

  return (...args) => {
    const argStr = JSON.stringify(args);
    cache[argStr] = cache[argStr] || f(...args);
    return cache[argStr];
  };
}; 
```

Using this memoization function, you can improve the performance of computationally expensive functions by caching their results for the same input parameters. This is particularly useful when working with recursive functions, such as calculating Fibonacci numbers, where many function calls with the same parameters may occur.

Now for example the Fibonacci numbers, where many function calls with the same parameters may occur. Let's see an example using the Fibonacci function with our TypeScript memoization implementation:

```typescript
const fibonacci = (n: number): number => {
  if (n <= 1) {
    return n;
  }
  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
};

const memoizedFibonacci = memoize<number, number>(fibonacci);
```

In this example, we first define the memoize function as before. Then, we create a fibonacci function that calculates Fibonacci numbers recursively. Finally, we create a memoizedFibonacci function by memoizing the original fibonacci function. Using memoizedFibonacci, you can now calculate Fibonacci numbers more efficiently by reusing the stored results for previously computed inputs.