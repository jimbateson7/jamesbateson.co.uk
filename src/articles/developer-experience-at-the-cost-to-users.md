---
layout: layouts/post.njk
title: Developer experience at the cost to users?
metaTitle: Developer experience at the cost to users?
metaDesc: "No config build tools can be a draw for people due to efficiency, but
  can they pass on the cost to users? "
socialImage: /images/social-share-default.jpg
date: 2025-07-16T11:53:00.000+01:00
---
The draw and benefits of low/zero config build tools are pretty obvious and to be honest, fair when deciding on a stack to sort a new project. But is it sustainable to use one just for ease of setup or for developer experience? I've been working on a project recently that uses one and I'm here to vent.

First off as I've touched upon I absolutely understand why they are used, and there are some good tools out there. This isn't a dig at certain tools or people choosing to use them. Just confusion and frustration at the issues they can create.

In my project case, it was Create React App (CRA) that had been used with React Bootstrap.  I had completed a QA report on the site and I was tasked with remediating the issues I'd found, which included trying to improve performance benchmarking I had done. There are a few issues I came across that caused me frustration and ultimately ended it me having to pass the cost on to the end user:

* Assets being treated as an afterthought
* Abstraction/magic box
* Dependency management/impact
* Tooling flexibility

## Handling assets

Something that has often puzzled me with these tools is assets in public, src, static or whatever? You seem to be able to access certain directories from certain files but not others. In my case I was trying to preload a couple of font files in my HTML `<head>\` but it didn't seem to be able to access them as they were in \`src/fonts` but they needed to be in public for me to reference them. Sounds like an easy file move, but oh no, then the paths in the Sass and how they were processed relative to src and public directories didn't work...more on that in the next section.

### Font files

As for the font files themselves, I was curious as to why the browser was only requesting WOFF fonts and not the more efficient WOFF2 files even though they were included in the fonts directory. On further investigation the WOFF2 files were also in the \`@font-face\` CSS rule, and it turns out being requested by the browser, but triggering a warning about them not being able to be decoded. My next thought was, let's take a look at what the browser is getting, so I looked at the preview of the network request in devtools, and the content of these WOFF2 files was "You need JavaScript to run this app". \*sigh\*.

What exactly was going on here I never really got to the bottom of. I suspect it was a combination of the file hashing that CRA webpack does with some caching in the projects Amplify builds. I tried a few fixes, including making sure webpack knew about these files by importing them into TypeScript file (!?) why that needs to know about my static assets such as fonts is beyond me, and one of the main reasons that for me modern front end frameworks and tooling just take the joy out of building things.

The thing that really confused me and threw me off was the fact that there was:

* No indication locally that this would be an issue
* No build error or hint that it wasn't writing these files correctly

Admittedly this was the first time I've used CRA, and it looks there was a way to serve the production build locally, that would have identified the font file issue, however, I was just building locally and the WOFF2 fonts were loading and rendering correctly. I even made the decision to remove the WOFF fonts as [WOFF2 is well supported ](https://caniuse.com/woff2)(for the support of this project at least). This ended up breaking all the fonts on production as I had no idea about the issue until I deployed.

## Images

There were a few images on the site that were hardcoded into the codebase (logo, other random decorational ones etc), so I decided that some quick wins might come from optimising these. So I added some widths and heights inline to aid with layout shifts, reduced the size of them and also converted them to \`webp\` a more efficient image format than the current \`png\`. Again, all good locally it would seem, had made some good savings. Pushed to production, images not loading. 

The issue seemed to be that there was a mismatch in the file hash webpack had added to the file in the folder and the file it was looking for in the markup. As with the fonts, this could have been a stale/cached Amplify build, but no amount of forced builds seemed to resolve the issue. Again no warning of this in any builds, just fail silently and discover in production.

## Abstraction/magic box

The issues I faced with my assets and the frustrations I had in trying to resolve them highlighted how little I know about what was actually happening when the site was built, what was CRA doing with my assets, what was going on with webpack? Whilst there is documentation, support and means such as stack overflow and AI to try and find out more. On the surface it seems to me that it's pretty hard to determine what might be happening when none of it exposed, it's all happening behind the scenes. Which is all well and good when things are just working. But if they go wrong, rather than little fixes and optimisations, things can soon turn into time consuming investigations. With the result more often than not being a smelly solution, or having to make major compromises.

In my case, I just could not get the images to load, I couldn't get whatever webpack was doing to output my WOFF2 fonts correctly and I couldn't change the way a dependency of React Bootstrap rewrote file paths in the Sass without causing all kinds of regressions and needing rewrites. This resulted in me running out of time and patience trying to do things that should without this tooling in the way, be the bread and butter of web development. With no fix to be had, I had to revert my changes. Which means now the user:

* Is left loading font files that are no the most efficient, in a less-than efficient way
* Loads images that are not the most efficient file types

Maybe this isn't a big deal, but when people may need to consume this content on low-data plans or poor connections, it could have a real impact. If the search mafia measures the sites metrics a little more negatively, how will SEO be affected?

## Dependency management/impact
