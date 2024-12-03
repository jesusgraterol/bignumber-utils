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

## API Reference

### Value Processors

<details>
  <summary><code>getBigNumber</code></summary>
  
  Instantiates `BigNumber` from a valid numeric value.
  ```typescript
  import { BigNumber } from 'bignumber.js';
  import { getBigNumber } from 'bignumber-utils';

  getBigNumber(355).dividedBy(113).toString();
  getBigNumber('355').dividedBy(113).toString();
  getBigNumber(BigNumber(355)).dividedBy(113).toString();
  // '3.14159292035398230088'
  ```
</details>

<details>
  <summary><code>processValue</code></summary>
  
  Processes and outputs a value to match the requirements specified in the configuration (if any).
  ```typescript
  import { processValue } from 'bignumber-utils';

  processValue(100.585) // 100.59
  processValue(110.55, { type: 'number' }) // 110.55
  processValue(110.55, { type: 'string', decimalPlaces: 1 }) // '110.6'
  processValue(110.55, { type: 'bignumber' }) // BigNumber
  ```
</details>

<details>
  <summary><code>prettifyValue</code></summary>
  
  Generates the string representation of a value after being processed and formatted to match the requirements specified in the configuration (if any).
  ```typescript
  import { prettifyValue } from 'bignumber-utils';

  prettifyValue(
    15426525.846545124, 
    { 
      processing: { 
        decimalPlaces: 8 
      }, 
      format: { 
        prefix: 'BTC ' 
      } 
    }
  ); // 'BTC 15,426,525.84654512'
  ```
</details>





### Helpers

<details>
  <summary><code>isBigNumber</code></summary>
  
  Verifies if the value is a `BigNumber` Instance.
  ```typescript
  import { isBigNumber, getBigNumber } from 'bignumber-utils';

  isBigNumber(getBigNumber(123)); // true
  isBigNumber(123); // false
  isBigNumber('123'); // false
  ```
</details>

<details>
  <summary><code>isNumber</code></summary>
  
  Verifies if the value is a `number` in any of the supported types (`IBigNumberValue`).
  ```typescript
  import { isNumber, getBigNumber } from 'bignumber-utils';

  isNumber(NaN); // false
  isNumber(getBigNumber(123)); // true
  isNumber(123); // true
  isNumber('123'); // true
  ```
</details>

<details>
  <summary><code>isInteger</code></summary>
  
  Verifies if the value is an `integer` in any of the supported types (`IBigNumberValue`).
  ```typescript
  import { isInteger, getBigNumber } from 'bignumber-utils';

  isInteger(getBigNumber(123)); // true
  isInteger(getBigNumber(123.551)); // false
  isInteger(54122); // true
  isInteger('241.44332'); // false
  ```
</details>

<details>
  <summary><code>isFloat</code></summary>
  
  Verifies if the value is a `float` in any of the supported types (`IBigNumberValue`).
  ```typescript
  import { isInteger, getBigNumber } from 'bignumber-utils';

  isFloat(getBigNumber(123)); // false
  isFloat(getBigNumber(123.551)); // true
  isFloat(54122); // false
  isFloat('241.44332'); // true
  ```
</details>





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





<br/>

### BigNumber API

Since this library is built on top of `bignumber.js`, whenever you invoke `getBigNumber(value)` or `buildNumber(value, { buildType: 'bignumber' })` you can make use of any method within the BigNumber Instance. 

The list of methods can be found [here](https://mikemcl.github.io/bignumber.js/).





<br/>

## Types

### BigNumber

<details>
  <summary><code>IBigNumber</code></summary>
  
  The instance of a BigNumber. It can be generated via the constructor `new BigNumber(value)` or by simply invoking it as a function `BigNumber(value)`. When using this library, it can be generated via the `getBigNumber(value)` function.
  ```typescript
  import { BigNumber } from 'bignumber.js';

  type IBigNumber = BigNumber;
  ```
</details>

<details>
  <summary><code>IBigNumberRoundingModeName</code> & <code>IBigNumberRoundingMode</code></summary>
  
  The type of rounding that will be used when processing a value. The supported modes are:
  - **ROUND_UP(0):** rounds away from zero
  - **ROUND_DOWN(1):** rounds towards zero
  - **ROUND_CEIL(2):** rounds towards Infinity
  - **ROUND_FLOOR(3):** rounds towards -Infinity
  - **ROUND_HALF_UP(4)*:** rounds towards nearest neighbour. If equidistant, rounds away from zero (Default)
  - **ROUND_HALF_DOWN(5):** rounds towards nearest neighbour. If equidistant, rounds towards zero
  - **ROUND_HALF_EVEN(6):** rounds towards nearest neighbour. If equidistant, rounds towards even neighbour
  - **ROUND_HALF_CEIL(7):** rounds towards nearest neighbour. If equidistant, rounds towards Infinity
  - **ROUND_HALF_FLOOR(8):** rounds towards nearest neighbour. If equidistant, rounds towards -Infinity
  ```typescript
  type IBigNumberRoundingModeName = 'ROUND_UP' | 'ROUND_DOWN' | 'ROUND_CEIL' | 'ROUND_FLOOR' | 'ROUND_HALF_UP' | 'ROUND_HALF_DOWN' | 'ROUND_HALF_EVEN' | 'ROUND_HALF_CEIL' | 'ROUND_HALF_FLOOR';

  type IBigNumberRoundingMode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  ```

  <br/>

  More information:
  - https://mikemcl.github.io/bignumber.js/#rounding-mode
  - https://mikemcl.github.io/bignumber.js/#constructor-properties
</details>

<details>
  <summary><code>IBigNumberValue</code></summary>
  
  The types that can be used to instantiate BigNumber. Moreover, any of these types can be obtained when processing a value by setting it in the configuration object (`type` prop).
  ```typescript
  type IBigNumberValue = string | number | BigNumber;
  ```
</details>

<details>
  <summary><code>IBigNumberFormat</code></summary>
  
  The configuration object that is applied to the toFormat method which is used to prettify values.
  Available settings are:
  - **prefix:** string to prepend. Default: `''`
  - **decimalSeparator:** decimal separator. Default: `'.'`
  - **groupSeparator:** grouping separator of the integer part. Default: `','`
  - **groupSize:** primary grouping size of the integer part. Default: `3`
  - **secondaryGroupSize:** secondary grouping size of the integer part. Default: `0`
  - **fractionGroupSeparator:** grouping separator of the fraction part. Default: `' '`
  - **fractionGroupSize:** grouping size of the fraction part. Default: `0`
  - **suffix:** string to append
  ```typescript
  type IBigNumberFormat = {
    prefix?: string;
    decimalSeparator?: string;
    groupSeparator?: string;
    groupSize?: number;
    secondaryGroupSize?: number;
    fractionGroupSeparator?: string;
    fractionGroupSize?: number;
    suffix?: string;
  };
  ```

  <br/>

  More information:
  - https://mikemcl.github.io/bignumber.js/#toFor
</details>


### General

<details>
  <summary><code>IType</code></summary>
  
  When a value is processed, it can output an IBigNumberValue type in order to meet the project's requirements and overcome JavaScript's numeric limitations.
  ```typescript
  type IType = 'string' | 'number' | 'bignumber';
  ```
</details>

<details>
  <summary><code>IConfig</code></summary>
  
  The configuration that will be used to process a value.
  ```typescript
  type IConfig = {
    // the maximum number of decimals that will be present in the output
    decimalPlaces: number; // Default: 2

    // determines how the value will be rounded (in case it has decimals)
    roundingMode: IBigNumberRoundingModeName; // Default: 'ROUND_HALF_UP'

    // the output's type
    type: IType; // Default: 'number'
  };
  ```
</details>

<details>
  <summary><code>IOutput<T></code></summary>
  
  A generic type that sets the return type for the function that processes value based on the provided configuration (type prop).
  ```typescript
  type IOutput<T> =
    T extends { type: 'string' } ? string
      : T extends { type: 'number' } ? number
        : T extends { type: 'bignumber' } ? IBigNumber
          : number;
  ```
</details>




<br/>

## Built With

- TypeScript




<br/>

## Running the Tests

```bash
npm run test:unit
```





<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Deployment

Install dependencies:
```bash
npm install
```


Build the library:
```bash
npm start
```


Publish to `npm`:
```bash
npm publish
```
