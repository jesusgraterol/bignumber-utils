# BigNumber Utils

The `bignumber-utils` package empowers developers to effortlessly perform accurate and reliable decimal and non-decimal arithmetic in JavaScript, leveraging the robust foundation of the [bignumber.js](https://github.com/MikeMcl/bignumber.js) library.

This package provides a streamlined interface for working with arbitrary-precision numbers, eliminating the limitations and potential inaccuracies associated with standard JavaScript number representation. With `bignumber-utils`, you can confidently handle complex calculations, financial transactions, scientific computations, and more, ensuring precise results every time.



</br>

## Getting Started

Install the package:
```bash
npm install -S bignumber-utils
```





</br>

## Usage

@TODO

```typescript
// ...
```





</br>

## API

### Number Builders

- **`getBigNumber`** instantiates BigNumber based on a given value
- **`buildNumber`** builds a number based on given configuration (if any)
- **`prettifyNumber`** returns the string representation of a number value after being built and formatted based on the provided configs (if any)



### Helpers

- **`isBigNumber`** verifies if a given value is a BigNumber Instance
- **`isNumber`** returns `true` if the given value is a number in any of the supported types (`IBigNumberValue`)
- **`isInteger`** returns `true` if the given value is an integer in any of the supported types (`IBigNumberValue`)
- **`isFloat`** returns `true` if the given value is a float in any of the supported types (`IBigNumberValue`)



### Essential Calculations

- **`calculateSum`** calculates the SUM for a given list of numeric values
- **`calculateMin`** identifies and returns the smallest value in an array
- **`calculateMax`** identifies and returns the largest value in an array
- **`calculateMean`** calculates and returns the mean of an array of values
- **`calculateMedian`** calculates and returns the median of an array of values



### Advanced Calculations

@TODO


### BigNumber Methods

Since this library is built on top of `bignumber.js`, whenever you invoke `getBigNumber(value)` or `buildNumber(value, { buildType: 'bignumber' })` you can make use of any method within the BigNumber Instace. 

The list of methods can be found [here](https://mikemcl.github.io/bignumber.js/)






<br/>

## Built With

- TypeScript




<br/>

## Running the Tests

```bash
$ npm run test:unit
```





<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Acknowledgments

- [bignumber.js](https://github.com/MikeMcl/bignumber.js)



<br/>

## @TODOS

- [ ] Improve the docs





<br/>

## Deployment

Install dependencies:
```bash
$ npm install
```


Build the library:
```bash
$ npm start
```


Publish to `npm`:
```bash
$ npm publish
```
