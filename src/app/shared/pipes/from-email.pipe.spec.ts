import { FromEmailPipe } from './from-email.pipe';

describe('FromEmailPipe', () => {
  it('create an instance', () => {
    const pipe = new FromEmailPipe();
    expect(pipe).toBeTruthy();
  });
});
