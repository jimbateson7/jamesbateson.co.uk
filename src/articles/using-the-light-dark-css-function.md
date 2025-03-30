---
layout: layouts/post.njk
title: Using the light-dark() CSS function
socialImage: /images/social-share-default.jpg
date: 2025-03-30T08:37:52.592Z
tags:
  - CSS
---
State of the Browser conference took place yesterday. Whilst I was unfortunately wasn't able to attend in person, I still watched on the live stream. All of the speakers were brilliant, with engaging, thoughtful and informative talks. One in particular came at a good time for me. Niya Dobazova (who you could not tell was relatively new to public speaking) gave a talk on using the CSS `light-dark()` function.

I﻿'ve recently being making some UI tweaks to this site, including some little brand tweaks provided by the brilliant Angela Bradley. One thing that I wanted to add was colours that would update based on the users OS light/dark/auto theme preferences.

I﻿n the past I've had a toggle on this site for it. This used a toggle button and some JavaScript to detect the OS preference, set the theme, and then users could toggle this if they wished. Whilst I was very happy with the solution and interaction of the button, you don't need JavaScript to do this though.

## Implementation

F﻿irstly support for the function must be added. This is typically done on the `:root`.

```css
:root {
  color-scheme: light dark;
}
```

`light-dark` takes two values. The colour for light theme and dark theme separated by a comma.