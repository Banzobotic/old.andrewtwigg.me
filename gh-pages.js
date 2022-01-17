import { publish } from 'gh-pages';

publish(
 'build',
 {
  branch: 'gh-pages',
  repo: 'https://github.com/Banzobotic/banzobotic.github.io.git',
  user: {
   name: 'Banzobotic',
   email: '78510207+Banzobotic@users.noreply.github.com'
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);
