## Fetch from the db

select only given fields

```js
userRepository.find({
  select: {
    firstName: true,
    lastName: true,
  },
});
```

Using Where clause

```js
userRepository.find({
  where: {
    firstName: 'Timber',
    lastName: 'Saw',
  },
});
```

