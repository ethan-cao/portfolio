---
title: JavaScript Concurrency Model
description: JavaScript Concurrency Model
date: 2020-01-10
path: /JavaScript-Concurrency-Model
featuredImage: 
---

Given browser runtime, JavaScript uses a single-threaded execution model called Event loop. When callstack is empty, tasks kick in and they are processed one at a time, and after a task starts executing, it can’t be interrupted by another task. After finsihed processing a couple of tasks, browser re-render. The ideal frenqunecy is 60 fps, that is to render a frame every 16 ms. If single event-loop iteration (1 macrotask + all microtasks) takes more than 16 ms, rendering is blocked (slow UI).

Tasks can be futher categoried into Macrotask and Microtask. Macrotask includes tasks like parsing HTML, JS execution, DOM event, timer, requestAnimationFrame, I/O, UI rendering, network events, URL change etc.. Microtask includes tasks like Promises, process.nextTick, Object.observe, MutationObserver etc..


In short, for 1 single loop iteration,   
    1 macrotask at most is processed  
    then all microtasks are processed  
    then UI is re-rendered if UI render update is required  