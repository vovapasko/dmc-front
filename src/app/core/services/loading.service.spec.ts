import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    service = new LoadingService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create loading subject', () => {
    expect(service.loading$).toBeTruthy();
  });

  it('should start loading', (done: DoneFn) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBeTruthy();
      done();
    });
    const payload = {data: {value: true}};
    service.startLoading(payload);
  });

  it('should stop loading', (done: DoneFn) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalsy();
      done();
    });
    const payload = {data: {value: false}};
    service.stopLoading(payload);
  });
});
