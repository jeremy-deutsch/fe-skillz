# Front End Skill Assessment

The [original prompt can be found below.](#original-prompt)

## Run locally

- Dev build: `yarn && yarn dev`
- Production build: `yarn && yarn build && yarn start`

## Summary

Here's a summary I've written up of my experience with this skills assessment. Overall, what I tried to optimize for most on this assessment was the actual experience of using the site. Jank, especially on mobile, really gets under my skin, and so I focused most on making sure the site was responsive, resilient, and accessible.

### Technologies Used

- **NextJS**: My experience recently is mostly with React Native, so I feel most comfortable writing sites in React. NextJS, which serves pages as static pre-rendered HTML, lets me do that without sacrificing initial load times or SEO.
- **TypeScript**: I just like TypeScript. It doesn't bring much to the table here, but I tend to use it by default for personal projects, and NextJS supports it out of the box.
- **CSS Modules**: In React Native, you pass JS style objects directly to components, and using CSS modules feels a lot like the flow for writing styles in React Native, so it fit right into my comfort zone.

### Notes

- If I were to add more components to this, I would start organizing them into more sub-directories. I tried to keep it simple for now, though.
- I avoided using composition-style components (<MyThing>Inner Text</MyThing>), since those tend to end up making localization really annoying (compared to <MyThing innerText="Inner Text" />, which can be changed to be passed a localization key).
- I used flexbox all over the place, once again since I'm used to React Native, where elements can only have `display: flex` or `display: none`.
- The stylesheets have a lot of colors defined inline - I'm not sure the best way to mitigate that without using Less or Sass or something like that.
- I tested the mobile site on an Android emulator just to be sure, and the mobile experience seems pretty good. I made sure it still worked fine if a user zoomed in or dragged the screen a weird way, and added a focus highlight to the links so a user sees a response after tapping on one.
- For accessibility, I started out by just making sure to follow general best practices (semantic elements, aria popup attributes). I made the desktop navbar fully tabbable at first, but realized tabbing through every dropdown option was exhausting, so I implemented full arrow key navigation for the navbar.
- The performance of the page seems good (no obvious optimizations/memoization needed on the JS side), but loading the JS bundle from NextJS does take the browser a while, even though the page is served static and then hydrated with JS.

## Original Prompt

Below you will find images of a header that contains sub-nav items. On desktop, sub-nav items should drop down upon hover of the parent nav item. On Mobile the sub-nav should expand and collapse on click events.

We'd like you to build it. Sounds simple right? The layout is easy, heck you could pull up bootstrap and knock this out in under an hour. That is a valid approach but it won't get you very far with us.

The point of this Skill Assessment is for you to show us what you believe good development looks like. Are you into polish and visual detail? Refine the design, add some finesse. Are you a test finatic? Show us your TDD process. Love data and multi-teir designs? Let us see how you redux. Are you a build ninja? Let see those muscles flexed.

Here are some things we want to see. How do you layout your project and what tools you use? How does the project progress? What does your git history look like? Finally how you handle loose requirements - what you bring to the table? Here are some things we value; performance, reproducibility, testing, accessibility, multi-channel deliverability ( SEO, Social, Desktop, Mobile, etc...). You should assume the data is separate than the presentation.

Fork this repo into your github or push it into your prefered git provider and make sure it is open. Fill this otherwise empty repo with goodness. You have 72 hours to submit your completed project.

Good luck.

---

## Assessment Images:

**Desktop - Default**  
![Wonderful Desktop](./wonderful-desktop.png)

**Desktop - Active Subnav**  
![Wonderful Desktop Active Subnav](./wonderful-desktop-active-subnav.png)

**Mobile - Default**  
<img src="./wonderful-mobile.png" alt="Wonderful Mobile" width="350"/>

**Mobile - Active Menu**  
<img src="./wonderful-mobile-active-menu.png" alt="Wonderful Mobile Active Menu" width="350"/>

**Mobile - Active Subnav**  
<img src="./wonderful-mobile-active-subnav.png" alt="Wonderful Mobile Active Subnav" width="350"/>

---

## Style Guide

**fonts**  
font-family: Arial

**mobile body**  
font-size: 14px

**mobile menu button**  
font-size: 12px

**desktop body**  
font-size: 12px

**Colors**  
white: #ffffff  
black: #000000  
gold: #d1a04f  
beige: #79766b  
dark grey background: #151515  
extra dark grey: #202020  
dark grey: #353535  
medium grey: #323232
