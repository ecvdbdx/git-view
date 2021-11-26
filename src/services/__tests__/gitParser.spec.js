import GitReader from '../gitReader';

describe('Given a string of commit', () => {
  const gitIncommingCommits = `dff4044$$fix(contact, projects, about): responsive$$Sun Nov 21 19:20:35 2021 +0100$$teyz
  430fdcf$$feat(img): optimize pagespeed$$Sun Nov 21 07:30:52 2021 +0100$$teyz
  68dcd52$$feat(projects): add projects page features$$Sun Nov 21 07:15:10 2021 +0100$$teyz`;
  describe('When the string is correct', () => {
    it('Should return an Array of commit', () => {
      const gitReader = new GitReader();
      expect(gitReader.parser(gitIncommingCommits)).toStrictEqual([
        {
          sha: 'dff4044',
          message: 'fix(contact, projects, about): responsive',
          date: 'Sun Nov 21 19:20:35 2021 +010',
          author: 'teyz',
        },
        {
          sha: '430fdcf',
          message: 'feat(img): optimize pagespeed',
          date: 'Sun Nov 21 07:30:52 2021 +0100',
          author: 'teyz',
        },
        {
          sha: '68dcd52',
          message: 'feat(projects): add projects page features',
          date: 'Sun Nov 21 07:15:10 2021 +0100',
          author: 'teyz',
        },
      ]);
    });
  });
});
