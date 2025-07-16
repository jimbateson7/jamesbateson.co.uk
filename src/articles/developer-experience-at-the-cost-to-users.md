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

In my project case, it was Create React App that had been used with React Bootstrap.  I had completed a QA report on the site and I was tasked with remediating the issues I'd found, which included trying to improve performance benchmarking I had done. There are a few issues I came across that caused me frustration and ultimately ended it me having to pass the cost on to the end user:

* Assets being treated as an afterthought
* Abstraction/magic box
* Dependency management/impact
* Tooling flexibility

## Handling assets

Something that has already puzzled me with these tools is assets in public, src, static or whatever? You seem to be able to access certain directories from certain files but not others. In my case I was trying to preload
