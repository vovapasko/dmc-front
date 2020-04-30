import { PaginationService } from './pagination.service';
import { data } from '../mocks/pagination.mock';
import { PaginationType } from '../constants/pagination';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    service = new PaginationService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should create page behavior subject', () => {
    expect(service.page$).toBeTruthy();
  });

  it('should create page getter', () => {
    expect(service.page).toEqual(1);
  });

  it('should create page setter', () => {
    service.page = 2;
    expect(service.page).toEqual(2);
  });

  it('should create pageSize behavior subject', () => {
    expect(service.pageSize$).toBeTruthy();
  });

  it('should create pageSize getter', () => {
    expect(service.pageSize).toEqual(10);
  });

  it('should create pageSize setter', () => {
    service.pageSize = 20;
    expect(service.pageSize).toEqual(20);
  });

  it('should create startIndex behavior subject', () => {
    expect(service.startIndex$).toBeTruthy();
  });

  it('should create startIndex getter', () => {
    expect(service.startIndex).toEqual(1);
  });

  it('should create startIndex setter', () => {
    service.startIndex = 2;
    expect(service.startIndex).toEqual(2);
  });

  it('should create endIndex$ behavior subject', () => {
    expect(service.endIndex$).toBeTruthy();
  });

  it('should create endIndex$ getter', () => {
    expect(service.endIndex).toEqual(10);
  });

  it('should create endIndex$ setter', () => {
    service.endIndex = 20;
    expect(service.endIndex).toEqual(20);
  });

  it('should create totalSize$ behavior subject', () => {
    expect(service.totalSize$).toBeTruthy();
  });

  it('should create totalSize getter', () => {
    expect(service.totalSize).toEqual(10);
  });

  it('should create totalSize setter', () => {
    service.totalSize = 20;
    expect(service.totalSize).toEqual(20);
  });

  it('should create totalRecords$ behavior subject', () => {
    expect(service.totalRecords$).toBeTruthy();
  });

  it('should create totalRecords$ getter', () => {
    expect(service.totalRecords.length).toEqual(0);
  });

  it('should create paginatedData$ behavior subject', () => {
    expect(service.paginatedData$).toBeTruthy();
  });

  it('should create paginatedData getter', () => {
    expect(service.paginatedData.length).toEqual(0);
  });

  it('should create paginatedData$ setter', () => {
    service.paginatedData = (data as unknown as PaginationType[]);
    expect(service.paginatedData.length).toEqual(data.length);
  });

  it('should change page and set page', (done: DoneFn) => {
    service.page$.subscribe((page) => {
      expect(page).toBeTruthy();
      done();
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.onPageChange(2);
  });

  it('should change page and set start index', (done: DoneFn) => {
    service.startIndex$.subscribe((startIndex) => {
      expect(startIndex).toBeTruthy();
      done();
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.onPageChange(2);
  });

  it('should change page and set end index', (done: DoneFn) => {
    service.endIndex$.subscribe((endIndex) => {
      expect(endIndex).toBeTruthy();
      done();
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.onPageChange(2);
  });

  it('should apply pagination and set start index', (done: DoneFn) => {
    service.startIndex$.subscribe((startIndex) => {
      if (startIndex) {
        expect(startIndex).toBeTruthy();
        done();
      }
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.applyPagination();
  });

  it('should apply pagination and set end index', (done: DoneFn) => {
    service.endIndex$.subscribe((endIndex) => {
      expect(endIndex).toEqual(10);
      done();
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.applyPagination();
  });

  it('should apply pagination and set pagination data', (done: DoneFn) => {
    service.paginatedData$.subscribe((paginatedData) => {
      if (paginatedData) {
        expect(paginatedData).toBeTruthy();
        done();
      }
    });
    service.paginatedData = (data as unknown as PaginationType[]);
    service.applyPagination();
  });
});
