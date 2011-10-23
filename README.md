Burning Boots Javascript Library
=====================

A [Burning Boots](http://www.burningboots.co.uk) Javascript library that has some useful functions for development.

Releases
--------
1. Install [GIT Extras](https://github.com/visionmedia/git-extras).
2. Run `ant release`.  This will commit the history and tag the commit.
3. Update `bb.version` in `burning-boots.js` to the next version
4. Commit again
5. Check everything is OK. `git tag -n` and `git log`
6. `git push`
7. `git push --tags`
