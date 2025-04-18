---
layout: layouts/post.njk
title: Draggable component accessibility considerations
metaTitle: Draggable component accessibility considerations
metaDesc: A look at a couple of examples I've seen recently for providing
  alternative pointer and keyboard functionality to components that primarily
  rely on dragging interactions.
socialImage: /images/social-share-default.jpg
date: 2025-04-18T09:15:51.474Z
---
Over the last couple of days I've seen examples of providing alternative ways of interacting with components that primary rely on dragging functionality that I thought were interesting. I decided to take a look into them and also learn a bit more about how the WCAG (Web Content Accessibility Guidelines) define success within the criteria they have that covers this functionality.

WCAG 2.2 introduced a success criteria that specifically deals with components that require dragging movements to work. There are a few types of component that could fall under this, probably most common are things like sortable lists and drag and drop features.

Here's what [WCAG 2.2 - 2.5.7](https://www.w3.org/TR/WCAG22/#dragging-movements) states: 

> Level AA\
> \
> All [functionality](https://www.w3.org/TR/WCAG22/#dfn-functionality "processes and outcomes achievable through user action") that uses a [dragging movement](https://www.w3.org/TR/WCAG22/#dfn-dragging-movements "New") for operation can be achieved by a [single pointer](https://www.w3.org/TR/WCAG22/#dfn-single-pointer "an input modality that only targets a single point on the page/screen at a time – such as a mouse, single finger on a touch screen, or stylus.") without dragging, unless dragging is [essential](https://www.w3.org/TR/WCAG22/#dfn-essential "if removed, would fundamentally change the information or functionality of the content, and information and functionality cannot be achieved in another way that would conform") or the functionality is determined by the [user agent](https://www.w3.org/TR/WCAG22/#dfn-user-agents "any software that retrieves and presents web content for users") and not modified by the author.

Along with this, there are also other success criteria that would be directly relevant to components using dragging:

* [2.1.1 Keyboard](https://www.w3.org/TR/WCAG/#keyboard)
* [2.3.3 Animation from Interactions](https://www.w3.org/TR/WCAG/#animation-from-interactions)
* [2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG/#pointer-cancellation)

## The examples

Whilst neither of these examples are perfect, I did find them interesting in their approach to trying to make the interactions more useable. I'm going to note the techniques used and if/how they satisfy the guideline criteria.

### Sortable list

The first example was found a sports news site. It was a list of 10 football players that allowed users drag them vertically into the order they considered them the "best".

![](/images/screenshot-2025-04-18-at-14.44.36.png)

It's worth noting that upon inspecting the code, this is actually within an iframe coming from a third party source, however, the accessibility of that content still falls upon the site owner.

For people able to perform precise dragging movements with a mouse, this component functions as you would expect, you move around the items to the correct order and submit that. However, I didn't seem to be able to identify a way to do this with a single pointer event.

Interestingly when I opened the same page on my phone, it seemed more useable with a single pointer. On desktop to the right of the list item there is a hamburger icon and the current rank/order of the item. On mobile however, this becomes a control with arrows you can tap to move the list item up and down in increments of one. I couldn't see this feature when I shrunk down my browser on desktop so assuming that some kind of user agent detection was in place.

![](/images/img_1930.png)

For me, it would have made sense to also have that functionality on desktop as well, that would have satisfied the success criteria. On mobile I also noticed it was too easy to accidentally reorder the list when swiping down the page as well.

#### Keyboard

Making the draggable component work with keyboard does not satisfy 2.5.7, as it's not a single pointer event. People may be using desktop touch screen devices with no access to a physical keyboard with arrows etc.

I did like the idea of the instructions they provided for how to use the functionality with keyboard alone though, and it did (sort of seem to work). Using the space bar when focus was on a list item and then the up and down arrow keys, did allow me to reorder it. However, actually getting keyboard focus to all of the items did not initiall seem doable. A quick inspection or the code, shows each item is a div with some tabindex switching. I eventually figured out that to switch focus you needed to use the up and down arrow key to change the tabindex value (no visual indication of this) then use tab or shift tab to focus that one. This isn't something that was easy to figure out, or would I have been able to without inspecting.

#### Screen reader

It's worth noting that I'm not an advanced screen reader user, but wanted to try the experience using one. As on a Mac, I used VoiceOver with Safari.

As good keyboard functionality is important to a good screen reader experience, the fact that it doesn't seem possible to focus on each list item, again makes this very difficult to use. 

When focusing onto the first list item (that you can) there was no announcement that the item was sortable. Just that it was clickable and selectable text. Not massively helpful. As the keyboard helper text is at the bottom of the content, it could be easy to miss and come too late.

As I knew the key controls to use, I tried reordering an item, and the item text and it's new position in the list was announced.

#### In summary

Overall a fairly poor experience trying to use this component without the ability to drag items with a mouse. By using the mobile reordering functionality on desktop however, it would be much better.

The ability to switch item focus is quite confusing and not explained or a pattern I have come across before, however, I've not had to build a component like this, so could just be one I'm not experienced with.

### CSS overflow list

This one is interesting as 2.5.7 doesn't actually apply to this overflow dragging technique.

>  This criterion does not apply to scrolling enabled by the user-agent. Scrolling a page is not in scope, nor is using a technique such as CSS overflow to make a section of content scrollable.

However, I did notice a feature to aid people using the keyboard to navigate the content.

The component consisted of a list of product cards that overflowed the container. With a mouse you can drag horizontally to moved the cards along, or use the browser scrollbar.

![Screenshot showing a list of two product cards. The third is slightly in view but overflowing to the right hand side. Underneath the list there is some helper text which reads "Scroll for more" with an icon.](/images/screenshot-2025-04-18-at-15.40.56.png)

As with the sortable list, there was little bit of component UX helper text below, to encourage people to scroll left and right to show more product cards.

When navigating with keyboard, I noticed that when the component received focus, this messaging changed to be more relevant to the keyboard controls you might use to navigate along the list. Although not strictly needed as could tab along the product names (linked), I thought it was a nice touch, and could be especially useful for more complex components.

![Screenshot showing a list of two product cards. The third is slightly in view but overflowing to the right hand side. The component has focus and has an outline indicating this. Underneath the list there is some helper text which reads "Use arrow keys for more" with an icon.](/images/screenshot-2025-04-18-at-15.44.59.png)

## Summary

This article probably isn't of much use to anyone, and more of my scribbling some things down I have learned from having a dig around in some components I found interesting.

But it is something that I will refer to in the future if I have to build any components that require dragging, or specific keyboard functionality even.

The sortable list was especially frustrating and very much had me empathising with people who may rely on assistive technology to use this kind of component when these considerations haven't been taken into account. This was only a 'fun' ranking type thing, however, if it was important functionality, it would be a barrier. 

## Further Reading

* U[nderstanding WCAG 2.2 - 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html)
* [Screen readers and drag and drop](https://www.darins.page/articles/screen-readers-drag-drop-1)
* The first part of  [a road to accessible drag and drop series from TGPi](https://www.tpgi.com/the-road-to-accessible-drag-and-drop-part-1/) (the other parts are linked within there)
* [4 major patterns for accessible drag and drop](https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09) (on Medium)