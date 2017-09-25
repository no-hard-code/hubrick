# Flow engine

Simple rule runner.

Test suites(rule sets) described in `flowEngine/__mocks__`

NPM tasks.

```
npm test - see how it works and log output
npm run build - get a library code
```

# Config structrue

```javascript
{
   0: { // Map key should be same as id
      id: 0,
      true_id: 1,
      false_id: 2,
      body: 'return !obj' // obj === this rule set. Here you have to describe body of function what will be evaluated
   },
   ...
}
```

# Description

Solution have to be adopted to usage as library.

Now you can change test suites to get different outputs.