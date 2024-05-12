import { FirstLetterPipe } from './firstLetter.pipe';

describe('FirstLetterPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new FirstLetterPipe();
  });

  it('should run #transform()', async () => {

    pipe.transform('value');
    expect(pipe.transform('value')).toBeTruthy();
  });
});
