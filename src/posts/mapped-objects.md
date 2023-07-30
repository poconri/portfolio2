---
title: "Mapped Objects and Types in TypeScript: Transforming Lists into Indexable Objects"
date: '2023-07-30T16:24:30.761Z'
category: ["TypeScript", "Programming", "Objects"]
cover: "/images/blog/indexes.avif"
thumb: "/images/blog/indexes.avif"
meta: '[
{
"name": "keywords",
"content": "TypeScript, programming, mapped objects, types"
},
{
"name": "description",
"content": "Explore how to use mapped types in TypeScript to transform a list into an indexable object. Using generics and keyof, create a function that takes a list and a key, and returns an object with that key as an index."
},
{
"name": "og:title",
"content": "Mapped Objects and Types in TypeScript: Transforming Lists into Indexable Objects"
},
{
"name": "twitter:title",
"content": "Mapped Objects and Types in TypeScript: Transforming Lists into Indexable Objects"
},
{
"name": "og:type",
"content": "article"
},
{
"name": "og:description",
"content": "Explore how to use mapped types in TypeScript to transform a list into an indexable object. Using generics and keyof, create a function that takes a list and a key, and returns an object with that key as an index."
},
{
"name": "og:url",
"content": "/images/blog/indexes.avif"
},
{
"name": "og:image",
"content": "/images/blog/indexes.avif"
}
]'

---

Today, I want to unveil a powerful technique in TypeScript that allows you to transform a list of objects into an indexable object using a specified key. This is particularly handy when you need to quickly access items in a list without having to traverse through it. Here's how we can achieve this.

First thing first lets define a list of users:

```typescript
interface User {
    id: number;
    name?: string;
}

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 3, name: 'Jack' },
    { id: 4, name: 'Jill'}
];
```

Then, we'll define a mapped type Mapped. This allows us to specify what property we want to use as the key to index our final object.

```javascript
type Mapped<T, Key extends keyof T> = Record<`${Key & string}`, T>;
```

Next, we'll craft a function that takes a list of objects and a key, returning an object indexed by that key.

```javascript
const getMappedObject = <T, K extends keyof T>(list:T[], key:K): Mapped<T,K> => {
    return list.reduce((mappedObject:Partial<Mapped<T,K>> , item) => {
        const stringifiedKey = `${item[key]}`;
        return {
            ...mappedObject,
            [stringifiedKey]: item,
        };
    }, {});
};
```

Now, we can utilize this function to transform our user list into an object indexed using the id field.

```javascript
const mappedUsers = getMappedObject(users,'id');
```

The result is an object where each user is indexed by their id. This enables us to quickly access any user by their id, making our operations much more efficient.

What is the benefit? Instead of traversing through the list like this:

```javascript
const jack = users.find(user => user.id === 3);
```

You will be able to simply do the following and immediately get the user you are looking for, making it super efficient:

```javascript

const jack = mappedUsers[3]
```

This approach reduces the need to iterate through the entire list and allows instant access to the required element. In large lists, this can lead to significant performance improvements.