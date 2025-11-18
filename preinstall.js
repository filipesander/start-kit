/**
 * Do NOT allow using `npm` as package manager.
 */
 if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.error('You must use Yarn to install dependencies:');
  console.error('  $ yarn install');
  console.error('https://classic.yarnpkg.com/lang/en/docs/install');
  process.exit(1);
}
