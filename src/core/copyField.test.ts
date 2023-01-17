import { Field } from './Field';
import { copyField } from './copyField';

jest.mock('./Field');
const { fieldGenerator } = require('./Field');

describe('Check copy field', () => {
  it('Object.is should be different, data is the same', () => {
    const prevField = fieldGenerator(9) as Field;
    const nextField = copyField(prevField);

    expect(prevField).not.toBe(nextField);
    expect(prevField).toEqual(nextField);
  });
});
