
How JavaScript Works Behind Scenes
==================================

How Our Code Is Executed: JavaScript Parsers and Engines
--------------------------------------------------------

JavaScript is always hosted in some environment (most typically a browser). The browser is where JavaScript runs. There can also be other hosts such as NodeJS web server or even some applications that accept JavaScript code input. But for now, we will always just focus on the browser. So, when you write our JavaScript code, and you want to run it, there's a lot of stuff happening behind the scenes explained in brief in the next list:

1. Our JavaScript host has a **JavaScript Engine** that takes our code an executes it. There are many different engines out there according to the browser. Chrome uses V8 engine and Firefox use SpiderMonkey, for example.
2. The first thing that happens inside the engine is that the JavaScript code is parsed by a **Parser** which reads our code line by line and checks if the syntax of the code that you gave it is correct. So, the parser knows the JavaScript rules and how it has to be written in order to be valid. 
	- The parser doesn't find mistakes,
		- The parser produce a data structure called *Abstract Syntax Tree* which is then translated into *machine code*.
	- The parser find mistakes.
		- Throws an error and stops the execution.

Machine code is no longer JavaScript code, it's a set of instructions that can be executed directly by the computer's processor. It's only when your code already converted to machine code, actually run and does it works. That is the basic idea of what actually happens one you choose to run your code.