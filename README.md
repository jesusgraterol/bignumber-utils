# BigNumber Utils

The `bignumber-utils` package empowers developers to effortlessly perform accurate and reliable decimal and non-decimal arithmetic in JavaScript, leveraging the robust foundation of the [bignumber.js](https://github.com/MikeMcl/bignumber.js) library.

This package provides a streamlined interface for working with arbitrary-precision numbers, eliminating the limitations and potential inaccuracies associated with standard JavaScript number representation. With `bignumber-utils`, you can confidently handle complex calculations, financial transactions, scientific computations, and more, ensuring precise results every time.



</br>

## Getting Started

Install the package:
```bash
$ npm install -S bignumber-utils
```





</br>

## Usage

@TODO

```typescript
// ...
```





</br>

## API

- `getBigNumber: (value: IBigNumberValue) => IBigNumber`
- `buildNumber: <T extends Partial<IBuildConfig>>(value: IBigNumberValue, configuration?: Partial<T>) => IBuildOutput<T>`



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
