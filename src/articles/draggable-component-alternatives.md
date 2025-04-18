---
layout: layouts/post.njk
title: Draggable component accessibility
metaTitle: Draggable component accessibility
metaDesc: A look at a couple of examples I've seen recently for providing
  alternative pointer and keyboard functionality to components that primarily
  rely on dragging interactions.
socialImage: /images/social-share-default.jpg
date: 2025-04-18T09:15:51.474Z
---
Over the last couple of days I've seen examples of providing alternative ways of interacting with components that primary rely on dragging functionality that I thought I would make a note of.

W﻿CAG 2.2 introduced a success criteria that specifically deals with components that require dragging movements to work. There are a few types of component that could fall under this, probably most common are things like sortable lists and drag and drop features.

H﻿ere's what [WCAG 2.2 - 2.5.7](https://www.w3.org/TR/WCAG22/#dragging-movements) states: 

> L﻿evel AA\
> \
> All [functionality](https://www.w3.org/TR/WCAG22/#dfn-functionality "processes and outcomes achievable through user action") that uses a [dragging movement](https://www.w3.org/TR/WCAG22/#dfn-dragging-movements "New") for operation can be achieved by a [single pointer](https://www.w3.org/TR/WCAG22/#dfn-single-pointer "an input modality that only targets a single point on the page/screen at a time – such as a mouse, single finger on a touch screen, or stylus.") without dragging, unless dragging is [essential](https://www.w3.org/TR/WCAG22/#dfn-essential "if removed, would fundamentally change the information or functionality of the content, and information and functionality cannot be achieved in another way that would conform") or the functionality is determined by the [user agent](https://www.w3.org/TR/WCAG22/#dfn-user-agents "any software that retrieves and presents web content for users") and not modified by the author.

A﻿long with this, there are also other success criteria that would be directly relevant to components using dragging:

* [2.1.1 Keyboard](https://www.w3.org/TR/WCAG/#keyboard)
* [2.3.3 Animation from Interactions](https://www.w3.org/TR/WCAG/#animation-from-interactions)
* [2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG/#pointer-cancellation)

## T﻿he examples

W﻿hilst neither of these examples are perfect, I did find them interesting in their approach to trying to make the interactions more useable. I'm going to note the techniques used and how they worked/didn't work.

### S﻿ortable list

T﻿he first example was found a sports news site. It was a list of 10 football players that allowed users drag them vertically into the order they considered them the "best".

![](/images/screenshot-2025-04-18-at-14.44.36.png)

I﻿t's worth noting that upon inspecting the code, this is actually within an iframe coming from a third party source, however, the accessibility of that content still falls upon the site owner.

F﻿or people able to perform dragging movements with a mouse, this component functions as you would expect, you move around the items to the correct order and submit that.

I