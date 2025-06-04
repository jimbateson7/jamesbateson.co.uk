---
layout: layouts/post.njk
title: Netlify CMS content cursor fix
metaTitle: Netlify CMS content cursor fix
metaDesc: I've finally found a fix for a frustrating issue I've been having in
  my CMS for a while.
socialImage: /images/social-share-default.jpg
date: 2025-06-03T19:58:42.330Z
---
On this site I use Netlify CMS as my backend. I've looked into replacing it a good few times over the last year or so, however, keep putting it off as it just does what I want it to. One issue that was building frustration though was a particular one in the WYSIWYG editors.

When editing content (trying to type anywhere but at the end of a line) the cursor always jumped to the end of the line. This meant I was kind of having to type content outside of the block I wanted to edit and then cut and paste it back in.

Not sure how or why I put up with it for so long to be honest, but building a side project with the same stack caused me to search around for a solution or at least fix.

Turns out that it wasn't just something to do with my stack, or a dependency I might have etc. A few people seemed to have reported the same thing. Thankfully I stumbled across [a fix in this Github thread.](https://github.com/decaporg/decap-cms/issues/5092#issuecomment-1256321540)

It makes little sense to me to be honest, but it works, so I'm appeased for now in my use of Netlify.

For anyone reading this that might have the same issue, add this `<style>` block into the `<head>` of the file you load the Netlify CMS JavaScript in:

```css
<style>
    [data-slate-editor] { 
      -webkit-user-modify: read-write !important; 
    }
</style>
```

As mentioned, I'm not sure what's going on here or why it's needed. It's not pretty but it does the job.