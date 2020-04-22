import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;
  const mockServerError = {
    status: 404,
    error: {
      message: 'Not found',
    },
  };

  beforeEach(() => {
    service = new ErrorService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create error subject', () => {
    expect(service.error$).toBeTruthy();
  });

  it('should set error', (done: DoneFn) => {
    service.error$.subscribe((data) => {
      expect(data).toEqual(mockServerError);
      done();
    });
    service.error = mockServerError;
  });

  it('should clear all errors', (done: DoneFn) => {
    service.error$.subscribe((data) => {
      expect(data).toBeFalsy();
      done();
    });
    service.clear();
  });
});
