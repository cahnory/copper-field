import DateType, {
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameDayOfMonth,
  isSameDayOfWeek,
  isSameMonth,
  isSameMonthOfYear,
  isSameYear,
} from '../date';

describe('DateType.validate', () => {
  it('handles dates expressed as number', () => {
    expect(DateType.validate(-1)).toBe(true);
    expect(DateType.validate(0)).toBe(true);
    expect(DateType.validate(1)).toBe(true);
    expect(DateType.validate(null)).toBe(false);
    expect(DateType.validate(undefined)).toBe(false);
  });
  it('handles dates expressed as number string', () => {
    expect(DateType.validate('-1')).toBe(true);
    expect(DateType.validate('0')).toBe(true);
    expect(DateType.validate('1')).toBe(true);
  });
  it('handles dates expressed as string', () => {
    expect(DateType.validate('Tue Feb 12 1985 01:00:00 GMT+0100')).toBe(true);
    expect(DateType.validate('Tue Feb 32 1985 01:00:00 GMT+0100')).toBe(false);
    expect(DateType.validate('Tue, 12 Feb 1985 00:00:00 GMT')).toBe(true);
    expect(DateType.validate('Tue, 32 Feb 1985 00:00:00 GMT')).toBe(false);
    expect(DateType.validate('1985-02-12T00:00:00.000Z')).toBe(true);
    expect(DateType.validate('1985-02-32T00:00:00.000Z')).toBe(false);
  });
  it('handles dates expressed as Date', () => {
    expect(DateType.validate(new Date())).toBe(true);
    expect(DateType.validate(new Date('1985-02-32T00:00:00.000Z'))).toBe(false);
  });
  it('rejects non date inputs', () => {
    expect(DateType.validate('abc')).toBe(false);
    expect(DateType.validate('')).toBe(false);
    expect(DateType.validate(NaN)).toBe(false);
    expect(DateType.validate(null)).toBe(false);
    expect(DateType.validate(undefined)).toBe(false);
    expect(DateType.validate(true)).toBe(false);
    expect(DateType.validate(false)).toBe(false);
  });
});

describe('DateType.parse', () => {
  const expectValid = (input, time) => {
    const result = DateType.parse(input);
    expect(result).toBeInstanceOf(Date);
    expect(result.getTime()).toEqual(time);
  };
  const expectInvalid = input => {
    expect(DateType.parse(input)).toEqual(undefined);
  };

  it('handles dates expressed as number', () => {
    expectValid(-1, -1);
    expectValid(0, 0);
    expectValid(1, 1);
  });
  it('handles dates expressed as number string', () => {
    expectValid('-1', -1);
    expectValid('0', 0);
    expectValid('1', 1);
  });
  it('handles dates expressed as string', () => {
    expectValid('Tue Feb 12 1985 01:00:00 GMT+0100', 477014400000);
    expectValid('Tue, 12 Feb 1985 00:00:00 GMT', 477014400000);
    expectValid('1985-02-12T00:00:00.000Z', 477014400000);
    expectInvalid('Tue Feb 32 1985 01:00:00 GMT+0100');
    expectInvalid('Tue, 32 Feb 1985 00:00:00 GMT');
    expectInvalid('1985-02-32T00:00:00.000Z');
  });
  it('handles dates expressed as Date', () => {
    expectValid(new Date('1985-02-12T00:00:00.000Z'), 477014400000);
    expectInvalid(new Date('1985-02-32T00:00:00.000Z'));
  });
  it('rejects non date inputs', () => {
    expectInvalid('abc');
    expectInvalid('');
    expectInvalid(NaN);
    expectInvalid(null);
    expectInvalid(undefined);
    expectInvalid(true);
    expectInvalid(false);
  });
});

describe('number rule', () => {
  it('isAfter', () => {
    expect(isAfter(new Date(2), new Date(1))).toBe(true);
    expect(isAfter(new Date(1), new Date(2))).toBe(false);
    expect(isAfter(new Date(1), new Date(1))).toBe(false);
  });
  it('isBefore', () => {
    expect(isBefore(new Date(1), new Date(2))).toBe(true);
    expect(isBefore(new Date(2), new Date(1))).toBe(false);
    expect(isBefore(new Date(1), new Date(1))).toBe(false);
  });
  it('isEqual', () => {
    expect(isEqual(new Date(1), new Date(1))).toBe(true);
    expect(isEqual(new Date(1), new Date(2))).toBe(false);
  });
  it('isSameDay', () => {
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-12T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-12T00:00:00.000Z'),
      ),
    ).toBe(false);
    expect(
      isSameDay(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameDayOfMonth', () => {
    expect(
      isSameDayOfMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-01-12T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDayOfMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-13T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameDayOfWeek', () => {
    expect(
      isSameDayOfWeek(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-19T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameDayOfWeek(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-20T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameMonth', () => {
    expect(
      isSameMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonth(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameMonthOfYear', () => {
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameMonthOfYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
  it('isSameYear', () => {
    expect(
      isSameYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1985-01-13T12:00:00.000Z'),
      ),
    ).toBe(true);
    expect(
      isSameYear(
        new Date('1985-02-12T00:00:00.000Z'),
        new Date('1984-02-12T00:00:00.000Z'),
      ),
    ).toBe(false);
  });
});
