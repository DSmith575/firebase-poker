## Deploy link
[Firebase deploy](https://adv-app-dev-assignment.web.app/)


**bugs**
- Sometimes, when joining a game it won't properly load and requires refreshing.
- A few time the end screen will show a no winner found/no outcome, not sure why this is triggering when tests past.
- When unselecting a card, the last card unselected doesn't seem to trigger and so when you submit, it still removes it, not sure where it's going wrong.

**Emulator Tests**
To run the emulator tests, start the emulator with  
`npm run emulator`
then run `npm run test emulator.test.js`  

**Tests**
to run all normal tests  
`npm run test`
Emulator tests will fail using this, if the emulator is not  
started.  
