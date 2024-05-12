import { ShortNamePipe } from './short-name.pipe';

describe('ShortNamePipe', () => {
  let pipe: ShortNamePipe;

  beforeEach(() => {
    pipe = new ShortNamePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform full name to short name', () => {
    const fullName = 'Test Name';
    const shortName = pipe.transform(fullName);

    expect(shortName).toBe('TN');
  });

  it('should handle empty full name', () => {
    const fullName = '';
    const shortName = pipe.transform(fullName);

    expect(shortName).toBe('');
  });


  // Add more test cases as needed
});
