
import { publish } from 'gh-pages';

publish(
    'build', // path to public directory

    {
    branch: 'gh-pages',
    repo: 'https://github.com/Banzobotic/banzobotic.github.io.git', // Update to point to your repository
    user: {
    name: 'Banzobotic', // update to use your name
    email: '78510207+Banzobotic@users.noreply.github.com' // Update to use your email
    },

    dotfiles: true
    },

    () => {
    console.log('Deploy Complete!');
    }
);