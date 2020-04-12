import {LoadingService} from './loading.service';

describe('LoadingService', () => {
    let service: LoadingService;

    beforeEach(
        () => {
            service = new LoadingService();
        }
    );

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should create loading subject', () => {
        expect(service.loading$).toBeTruthy();
    });

    it('should start loading', (done: DoneFn) => {
        service.loading$.subscribe(
            (loading => {
                expect(loading).toBeTruthy();
                done();
            })
        );
        service.startLoading();
    });

    it('should stop loading', (done: DoneFn) => {
        service.loading$.subscribe(
            (loading => {
                expect(loading).toBeFalsy();
                done();
            })
        );
        service.stopLoading();
    });
});
