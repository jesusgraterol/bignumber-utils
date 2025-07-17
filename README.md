# BigNumber Utils

The `bignumber-utils` package empowers developers to effortlessly perform accurate and reliable decimal and non-decimal arithmetic in JavaScript, leveraging the robust foundation of the [bignumber.js](https://github.com/MikeMcl/bignumber.js) library.

This package provides a streamlined interface for working with arbitrary-precision numbers, eliminating the limitations and potential inaccuracies associated with standard JavaScript number representation. With `bignumber-utils`, you can confidently handle complex calculations, financial transactions, scientific computations, and more, ensuring precise results every time.



</br>

## Getting Started

Install the package:
```bash
npm i -S bignumber-utils
```

### Examples

Handle and format large numeric values with ease:
```typescript
import { getBigNumber, prettifyValue } from 'bignumber-utils';

let value = getBigNumber('1456550199.54631546987123654159');

value = processValue(value, { 
  decimalPlaces: 18, 
  roundingMode: 'ROUND_HALF_UP',
  type: 'string'
});
// '1456550199.546315469871236542'

prettifyValue(value, { format: { prefix: '$' } });
// '$1,456,550,199.55'

prettifyValue(value, { 
  processing: {
    decimalPlaces: 8,
    roundingMode: 'ROUND_HALF_DOWN'
  },
  format: { 
    groupSeparator: '.', 
    decimalSeparator: ',',
    suffix: ' BTC'
  } 
});
// '1.456.550.199,54631547 BTC'
```

Leverage the utility functions provided by this package:
```typescript
import { getBigNumber, calculateSum, adjustByPercentage } from 'bignumber-utils';

calculateSum(
  [1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]
);
// 8061

adjustByPercentage(56936.63, -35); // 37008.81
```

Access the full `bignumber.js` API directly using the getBigNumber function when needed for advanced operations:
```typescript
import { getBigNumber, processValue } from 'bignumber-utils';

const result = getBigNumber(14513.622145123884031).dividedBy(655.1232);
processValue(result,  { decimalPlaces: 18, type: 'bignumber' });
// BigNumber(22.154034760368558158)
```


</br>

## API Reference

### Value Processors

<details>
  <summary><code>getBigNumber</code></summary>
  </br>

  Instantiates `BigNumber` from a valid numeric value.
  
  ```typescript
  import { BigNumber } from 'bignumber.js';
  import { getBigNumber } from 'bignumber-utils';

  getBigNumber(355).dividedBy(113).toString();
  getBigNumber('355').dividedBy(113).toString();
  getBigNumber(BigNumber(355)).dividedBy(113).toString();
  // '3.14159292035398230088'
  ```
  </br>
</details>

<details>
  <summary><code>processValue</code></summary>
  </br>
  
  Processes and outputs a value to match the requirements specified in the configuration (if any).

  ```typescript
  import { processValue } from 'bignumber-utils';

  processValue(100.585) // 100.59
  processValue(110.55, { type: 'number' }) // 110.55
  processValue(110.55, { type: 'string', decimalPlaces: 1 }) // '110.6'
  processValue(110.55, { type: 'bignumber' }) // BigNumber(100.55)
  processValue(512.155, { roundingMode: 'ROUND_CEIL' }) // 513
  ```
  </br>
</details>

<details>
  <summary><code>prettifyValue</code></summary>
  </br>
  
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
  ); 
  // 'BTC 15,426,525.84654512'
  ```
  </br>
</details>





### Helpers

<details>
  <summary><code>isBigNumber</code></summary>
  </br>
  
  Verifies if the value is a `BigNumber` Instance.

  ```typescript
  import { isBigNumber, getBigNumber } from 'bignumber-utils';

  isBigNumber(getBigNumber(123)); // true
  isBigNumber(123); // false
  isBigNumber('123'); // false
  ```
  </br>
</details>

<details>
  <summary><code>isNumber</code></summary>
  </br>
  
  Verifies if the value is a `number` in any of the supported types (`IBigNumberValue`).

  ```typescript
  import { isNumber, getBigNumber } from 'bignumber-utils';

  isNumber(NaN); // false
  isNumber(getBigNumber(123)); // true
  isNumber(123); // true
  isNumber('123'); // true
  ```
  </br>
</details>

<details>
  <summary><code>isInteger</code></summary>
  </br>
  
  Verifies if the value is an `integer` in any of the supported types (`IBigNumberValue`).

  ```typescript
  import { isInteger, getBigNumber } from 'bignumber-utils';

  isInteger(getBigNumber(123)); // true
  isInteger(getBigNumber(123.551)); // false
  isInteger(54122); // true
  isInteger('241.44332'); // false
  ```
  </br>
</details>

<details>
  <summary><code>isFloat</code></summary>
  </br>
  
  Verifies if the value is a `float` in any of the supported types (`IBigNumberValue`).

  ```typescript
  import { isInteger, getBigNumber } from 'bignumber-utils';

  isFloat(getBigNumber(123)); // false
  isFloat(getBigNumber(123.551)); // true
  isFloat(54122); // false
  isFloat('241.44332'); // true
  ```
  </br>
</details>





### Essential Calculations

<details>
  <summary><code>calculateSum</code></summary>
  </br>
  
  Calculates the sum for an array of values. It returns 0 if the array is empty.

  ```typescript
  import { calculateSum, getBigNumber } from 'bignumber-utils';

  calculateSum([1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]); 
  // 8061
  ```
  </br>
</details>

<details>
  <summary><code>calculateMin</code></summary>
  </br>
  
  Identifies the smallest value in an array. It returns 0 if the array is empty.

  ```typescript
  import { calculateMin, getBigNumber } from 'bignumber-utils';

  calculateMin([1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]); 
  // -800.65
  ```
  </br>
</details>

<details>
  <summary><code>calculateMax</code></summary>
  </br>
  
  Identifies the largest value in an array. It returns 0 if the array is empty.

  ```typescript
  import { calculateMax, getBigNumber } from 'bignumber-utils';

  calculateMax([1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]); 
  // 8041.66
  ```
  </br>
</details>

<details>
  <summary><code>calculateMean</code></summary>
  </br>
  
  Calculates the mean for an array of values. It returns 0 if the array is empty.

  ```typescript
  import { calculateMean, getBigNumber } from 'bignumber-utils';

  calculateMean([1, 86, '55', 46.33, '47.55', getBigNumber(8041.663321), 485, '99.11', getBigNumber(-800.654)]); 
  // 895.67
  ```
  </br>
</details>

<details>
  <summary><code>calculateMedian</code></summary>
  </br>
  
  Calculates the median for an array of values. It returns 0 if the array is empty.

  ```typescript
  import { calculateMedian, getBigNumber } from 'bignumber-utils';

  calculateMedian([1093.55, '711.41', getBigNumber(987.13), 342, '654.99', getBigNumber(84.32), '-55.99', 25132.33,]); 
  // 683.2
  ```
  </br>
</details>






### Percentage Calculations

<details>
  <summary><code>calculatePercentageChange</code></summary>
  </br>
  
  Calculates the percentage change experienced by a value. Note that if the value increased, the change will be positive. Otherwise, it will be negative. If there was no change, it returns 0. Moreover, the largest decrease supported by this library is -100%. If newValue is less than or equal to 0, -100 will be returned.

  ```typescript
  import { calculatePercentageChange } from 'bignumber-utils';

  calculatePercentageChange(100, 150); // 50
  calculatePercentageChange(1555.6544122, 554366.123124); // 35535.56
  calculatePercentageChange(745.655, 1225.446, { decimalPlaces: 4 }); // 64.3449
  calculatePercentageChange(
    '5412151.54561245487451',
    '78998154125.6632113',
    { decimalPlaces: 10, type: 'string' },
  ); 
  // '1459544.1629522691'
  ```
  </br>
</details>

<details>
  <summary><code>adjustByPercentage</code></summary>
  </br>
  
  Changes a value by a percentage. If the % is positive, it increases the value. Otherwise, it decreases it.

  ```typescript
  import { adjustByPercentage, getBigNumber } from 'bignumber-utils';

  adjustByPercentage(100, 50); // 150
  adjustByPercentage(100, -50); // 50
  adjustByPercentage(57700, 1); // 58277
  adjustByPercentage('12.536', getBigNumber(-0.00797703), { decimalPlaces: 3 }); // 12.535
  ```
  </br>
</details>

<details>
  <summary><code>calculatePercentageRepresentation</code></summary>
  </br>
  
  Changes a value by a percentage. If the % is positive, it increases the value. Otherwise, it decreases it.

  ```typescript
  import { calculatePercentageRepresentation } from 'bignumber-utils';

  calculatePercentageRepresentation(50, 100); // 50
  calculatePercentageRepresentation(100, 1000); // 10
  calculatePercentageRepresentation(50, 75, { decimalPlaces: 3 }) // 66.667
  ```
  </br>
</details>






### Financial Calculations

<details>
  <summary><code>calculateExchange</code></summary>
  </br>
  
  Calculates the asset amount that will be received once the exchange executes.
  - Example: calculateExchange(value = 100 USDT, rate = 65000 USDT/BTC) => 0.00154 BTC

  ```typescript
  import { calculateExchange } from 'bignumber-utils';

  calculateExchange(100, 65000, { decimalPlaces: 5 }); // 0.00154
  calculateExchange(158794.2755, 64813.99); // 2.45
  calculateExchange(0.08970286, 0.05409, { decimalPlaces: 4 }); // 1.6584
  ```
  </br>
</details>

<details>
  <summary><code>calculateExchangeFee</code></summary>
  </br>
  
  Calculates the fee amount that will be charged when executing a currency exchange based on a percentage.

  ```typescript
  import { calculateExchangeFee } from 'bignumber-utils';

  calculateExchangeFee(1000, 1); // 10
  calculateExchangeFee(25.2774561, 0.075, { decimalPlaces: 8 }); // 0.01895809
  ```
  </br>
</details>

<details>
  <summary><code>calculateWeightedEntry</code></summary>
  </br>
  
  Calculates the weighted average trade price when a position can have several entries at different prices for different amounts. If the array is empty, it returns 0. 
  
  Important: the trades' tuples must follow: `[price, amount]`.

  ```typescript
  import { calculateWeightedEntry } from 'bignumber-utils';

  calculateWeightedEntry([
    [15699.65, 0.13562],
    [15500.32, 0.24210],
    [16665.88, 0.16644],
    [19555.11, 0.2886],
    [24655.44, 0.16665],
    [22113.65, 0.2001],
    [28966.11, 0.13661],
    [33154.24, 0.1774],
    [36764.81, 0.266],
    [32145.46, 0.18546],
  ]);
  // 24637.82
  ```
  </br>
</details>


### BigNumber API

Since this library is built on top of `bignumber.js`, whenever you invoke `getBigNumber(value)` or `buildNumber(value, { buildType: 'bignumber' })` you can make use of any method within the BigNumber Instance. 

The list of methods can be found [here](https://mikemcl.github.io/bignumber.js/).





<br/>

## Types

### BigNumber

<details>
  <summary><code>IBigNumber</code></summary>
  </br>
  
  The instance of a BigNumber. It can be generated via the constructor `new BigNumber(value)` or by simply invoking it as a function `BigNumber(value)`. When using this library, it can be generated via the `getBigNumber(value)` function.

  ```typescript
  import { BigNumber } from 'bignumber.js';

  type IBigNumber = BigNumber;
  ```
  </br>
</details>

<details>
  <summary><code>IBigNumberRoundingModeName</code> & <code>IBigNumberRoundingMode</code></summary>
  </br>
  
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

  </br>
</details>

<details>
  <summary><code>IBigNumberValue</code></summary>
  </br>
  
  The types that can be used to instantiate BigNumber. Moreover, any of these types can be obtained when processing a value by setting it in the configuration object (`type` prop).

  ```typescript
  type IBigNumberValue = string | number | BigNumber;
  ```
  </br>
</details>

<details>
  <summary><code>IBigNumberFormat</code></summary>
  </br>
  
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
  - https://mikemcl.github.io/bignumber.js/#

  </br>
</details>


### General

<details>
  <summary><code>IType</code></summary>
  </br>
  
  When a value is processed, it can output an IBigNumberValue type in order to meet the project's requirements and overcome JavaScript's numeric limitations.

  ```typescript
  type IType = 'string' | 'number' | 'bignumber';
  ```
  </br>
</details>

<details>
  <summary><code>IConfig</code></summary>
  </br>
  
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
  </br>
</details>

<details>
  <summary><code>IOutput<T></code></summary>
  </br>
  
  A generic type that sets the return type for the function that processes value based on the provided configuration (type prop).

  ```typescript
  type IOutput<T> =
    T extends { type: 'string' } ? string
      : T extends { type: 'number' } ? number
        : T extends { type: 'bignumber' } ? IBigNumber
          : number;
  ```
  </br>
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
