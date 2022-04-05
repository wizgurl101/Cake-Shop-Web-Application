import { determinePrice, determineSize } from '../../helpers/PriceSizeHelpers';

describe('determinePrice', () => {
  test('should return 14.99 if sm is passed', () => {
    const result = determinePrice('sm');
    expect(result).toEqual(14.99);
  });

  test('should return 16.99 if med is passed', () => {
    const result = determinePrice('med');
    expect(result).toEqual(16.99);
  });

  test('should return 18.99 if lg is passed', () => {
    const result = determinePrice('lg');
    expect(result).toEqual(18.99);
  });
});

describe('determineSize', () => {
  test('should return sm if 14.99 is passed', () => {
    const result = determineSize(14.99);
    expect(result).toEqual('sm');
  });

  test('should return med if 16.99 is passed', () => {
    const result = determineSize(16.99);
    expect(result).toEqual('med');
  });

  test('should return lg if 18.99 is passed', () => {
    const result = determineSize(18.99);
    expect(result).toEqual('lg');
  });
});
