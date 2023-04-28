---
title: "Accessing Nested Objects with TypeScript: A Guide to Avoiding Errors"
date: '2023-04-27T06:16:03.546Z'
category: ["TypeScript", "Programming", "Objects"]
cover: "/images/blog/nested-object-keys.png"
thumb: "/images/blog/nested-object-keys.png"
meta: '[
{
"name": "keywords",
"content": "TypeScript, programming, nested objects, errors"
},
{
"name": "description",
"content": "Learn how to access nested objects in TypeScript without the risk of encountering errors or typos. Discover the power of type-checking with TypeScript to access complex nested objects with ease."
},
{
"name": "og:title",
"content": "Accessing Nested Objects with TypeScript: A Guide to Avoiding Errors"
},
{
"name": "og:type",
"content": "article"
},
{
"name": "og:description",
"content": "Learn how to access nested objects in TypeScript without the risk of encountering errors or typos. Discover the power of type-checking with TypeScript to access complex nested objects with ease."
},
{
"name": "og:url",
"content": "https://portfolio2-poconri.vercel.app/postdetails/nested-objects-typescript"
},
{
"name": "og:image",
"content": "https://portfolio2-poconri.vercel.app/images/blog/nested-object-keys.png"
}
]'

---

Today, I want to share with you a way to access nested objects in TypeScript and how not to die trying. I've often encountered the problem of having a typo or something misspelled and not knowing what is failing. One of the best examples I could think of to present the problem is the following:


```javascript
const locales = {
    en_us: {
        hello: "Hi {user}",
        greetings: {
            morning: "Good morning {user}",
            evening: "Good evening {user}",
            afternoon: "Good afternoon {user}",
            goodbyes: {
                seeYou: "See you later {user}",
            },
      },
    },
  };
```

In the previous example, as more and more complexity is added to the translations, it becomes increasingly difficult to access them. If you have a typo in the key name or property name, TypeScript won't help us find the error. And if you have a nested object with 10 levels, it becomes very hard to find the error.

To solve this problem, I came up with the idea of creating a function that takes a string with the name of the key to be accessed and returns an object with the key value and key name. In this way, if you have a typo in the key name, TypeScript will help us find the error.

How could something like this be done? By creating types for the object and its properties to leverage the power of TypeScript:

```typescript
type LocaleName = keyof typeof locales;
type Locale = typeof locales[LocaleName];
```

With this, we already have a type for the locales object and a type for the key name. Now, we can create another conditional type called PathInto<T> that constructs the union of all possible paths in a nested object.

```typescript
type PathInto<T extends Record<string, string | {}>> = keyof {
    [K in keyof T as T[K] extends string
    ? K
    : T[K] extends Record<string, string | {}>
    ? `${K & string}.${PathInto<T[K]> & string}`
    : never]: string | {};
};
```

But how does it do that? First, it takes the generic type T extends Record<string, string | {}> since this solution will be prepared to work with many nested objects. Then, we are going to map the types to iterate over the properties of the object; that's where T and K become useful and will represent properties of the object T. First, if the union of T[K] is a string, we simply use K as part of the type mapping. But if not, we check if it is a nested object, and if it is, we will build the type recursively. And if it is not a string or a nested object, we simply mark it as never.

This conditional type will construct the union of all possible paths in a nested object. For example, for the locales object, the PathInto type will be:

```typescript
type PathIntoLocale = "en_us" | "en_us.hello" | "en_us.greetings" | "en_us.greetings.morning" | "en_us.greetings.evening" | "en_us.greetings.afternoon" | "en_us.greetings.goodbyes" | "en_us.greetings.goodbyes.seeYou"
```

Now that we've constructed the type, let's use the two functions below: one recursive function that will handle accessing the properties of the nested object, and another that will receive the PathInto type and return the key value.

```typescript
function getValueAtPath(
        object: Record<string, unknown>,
        path: Array<string>,
        index = 0
    ): string {
        const key = path[0];
        const result = object[key];
        if (key === undefined || result === undefined) {
            return "";
        } else if (typeof result === "string") {
            return result;
        } else {
            return getValueAtPath(Object(result), path, index + 1);
        }
  }

    export function getLocalizedText(key: PathInto<Locale>): string {
        return getValueAtPath(locales[currentLocale], key.split("."));
  }
```

And ultimately, this will allow us to access the properties of the nested object in the following way:

```typescript
const foo = getLocalizedText('greetings.goodbyes.seeYou');
```

The coolest part is that TypeScript will write the key for us and won't allow us to write it incorrectly and because the recursive nature of the function, we can access as many nested objects as we want.