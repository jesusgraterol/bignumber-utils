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

```typescript
import {
  getBigNumber,
  isBigNumber,
  isInteger,
  isFloat
  prettifyValue,
  calculateSum,
} from 'bignumber-utils';

let value = getBigNumber('1456550199.54631546987123654159');


isBigNumber(value); // true


value = processValue(value, { 
  decimalPlaces: 18, 
  roundingMode: 'ROUND_HALF_UP',
  type: 'string'
});
// '1456550199.546315469871236542'

isBigNumber(value); // false
isInteger(value); // false
isFloat(value); // true


prettifyValue(value, { format: { prefix: '$' } });
// '$1,456,550,199.546315469871236542'

prettifyValue(value, { 
  format: { 
    groupSeparator: '.', 
    decimalSeparator: ',',
    suffix: ' BTC'
  } 
});
// '1.456.550.199,546315469871236542 BTC'


calculateSum([1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]);
// 8061

calculateSum(
  ['0.286304850273819327', '0.00290532', '0.00251940040614675', '0.03506759540691015'], 
  { decimalPlaces: 18, type: 'string' });
// '0.326797166086876227'
```





</br>

## API

### Value Processors

- **`getBigNumber`** instantiates `BigNumber` from a valid numeric value.

- **`processValue`** processes and outputs a value to match the requirements specified in the configuration (if any).

- **`prettifyValue`** generates the string representation of a value after being processed and formatted to match the requirements specified in the configuration (if any).



### Helpers

- **`isBigNumber`** verifies if the value is a `BigNumber` Instance.

- **`isNumber`** verifies if the value is a number in any of the supported types (`IBigNumberValue`).

- **`isInteger`** verifies if the value is an integer in any of the supported types (`IBigNumberValue`).

- **`isFloat`** verifies if the value is a float in any of the supported types (`IBigNumberValue`).



### Essential Calculations

- **`calculateSum`** calculates the sum for an array of values.

- **`calculateMin`** identifies the smallest value in an array.

- **`calculateMax`** identifies the largest value in an array.

- **`calculateMean`** calculates the mean for an array of values.

- **`calculateMedian`** calculates the median for an array of values.



### Percentage Calculations

- **`calculatePercentageChange`** calculates the percentage change experienced by a value.

- **`adjustByPercentage`** changes a value by a percentage.

- **`calculatePercentageRepresentation`** calculates the percentage representation of a value based on a total.



### Financial Calculations

- **`calculateExchange`** calculates the asset amount that will be received once the exchange executes.

- **`calculateExchangeFee`** calculates the fee amount that will be charged when executing a currency exchange based on a percentage.

- **`calculateWeightedEntry`** calculates the weighted average trade price when a position can have several entries at different prices for different amounts.



### BigNumber Methods

Since this library is built on top of `bignumber.js`, whenever you invoke `getBigNumber(value)` or `buildNumber(value, { buildType: 'bignumber' })` you can make use of any method within the BigNumber Instance. 

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
