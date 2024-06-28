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

**Husky**
I am using huskys precommit to run my prettier config.


**Assignment Date**
[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/IgL9I_w2)
