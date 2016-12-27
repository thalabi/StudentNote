import { StudentNotePage } from './app.po';

describe('student-note App', function() {
  let page: StudentNotePage;

  beforeEach(() => {
    page = new StudentNotePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
