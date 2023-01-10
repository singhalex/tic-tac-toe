# Tic-Tac-Toe

![image](https://user-images.githubusercontent.com/115970252/211648472-808dcc49-4789-456f-967f-c269bb097de5.png)

A Tic Tac Toe game built with HTML, CSS, and JavaScript.

This was an exercise in using objects in order to minimize the amount of global variables. Using module patterns and factory functions,
I was able to eliminate all global functions from code and only expose the properties and methods of each object necessary for
functionality.

A user interface object controls the elements on the page. It hides and surfaces the necessary elements through event handlers on the buttons. 
This is mostly done by adding or deleting the 'hidden' class as necessary. It also calls methods from the other objects when game logic or board
state is needed.

The player objects are created using a factory function. It stores the name of the player, the symbol of the player, and the squares that the player
controls in an array. Two player objects are created, one for the 'X' symbol and one for the 'O' symbol.

A game logic object is used to assign the squares to the player, keep track of the active player, and to check for win conditions.

A board object is used to render the board. This is done by creating a 9 length array and creating a square for each index. Each square is also
assigned a data-attribute with a number. This number is assigned to the player when they claim the square to keep track of their control on the board.
