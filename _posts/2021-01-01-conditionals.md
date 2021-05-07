---
title: Reactive Code with Conditionals, and interfacing with sensors
date: 2021-01-01 12:00:00 +1100
math: true
code: true
---

<div id="dialog_entry" markdown="1">
By the end of this page, you will understand how code can make decisions, and use this to create a robot that can expertly work its way out of a maze, with a cryptic password to boot!

![test2](/assets/img/mazeTask.gif)
</div>

## Conditionals

So far in our coding tasks our programs have really only been able to do a single task, no matter what input we provide to the program, such as move to a point or print some information.
Coming back to the similarities with a recipe book, some recipes give different instructions dependant on initial conditions (If using the optional basil, add it to the soup now for best flavour). We have a similar tool in our toolbox when writing Python programs: **Conditionals**.

```python
# Give me a number
x = int(input("Your number: "))

# Is x less than 10?
if x < 10:
    # It is! (Notice I'm *indented*)
    print("That is a pretty small number")

print(f"Your number was {x}.")

### Output ###
# First run
# >>> Your number: 11
# >>> Your number was 11.
# Second run
# >>> Your number: 3
# >>> That is a pretty small number
# >>> Your number was 3.
```

The example above showcases the first of these conditionals. The `if` keyword is followed by an expression, the character `:`, and then a block of code that is *indented with a tab* (Indented just means you've got some empty space before the line). The indented block will then only be run if the expression after the `if` keyword is true. So if `x=3`, then both `print`s would be run. And if `x = 11`, then only the second `print` would be run because it is not indented.

While what `x < 10` does is rather obvious, Python can evaluate many other expressions, such as the following:

* `x >= 10`: Greater than or equal to.
* `x == 10`: Exactly equal to (Note the two `=`s, to differentiate this expression from setting variables (`x = 10`)).
* `x < "abc"`: If `x` is a string, then is true if `x` is [lexically smaller](https://www.wikiwand.com/en/Lexicographic_order#/Motivation_and_definition).
* `0 < x <= 10`: x is larger than 0 but less than or equal to 10.

<div class="note" markdown="1" title="Expressions return data">

All of the above expressions evaluate to `True` or `False`. These values are data just like `5` or `"word"`, and so can be stored in a variable for later use or comparison.

```python
x = int(input("How old are you: "))

under_10 = x <= 10
over_18 = x >= 18

# This doesn't change the previous data
x = 20000

if over_18:
    print("You're quite the old student!")
if under_10:
    print("You're quite the young student!")
```

</div>

<div class="continue"></div>

<div class="warning" markdown="1" title="Test Warning">

Beware the beep boops

</div>

<div class="puzzle" markdown="1" title="Test Puzzle">

Beep

</div>

<div class="project" markdown="1" title="Test Project">

Boop

</div>

That's not the only tool we have however. Often you want to also do something if the expression is false:

@[code_include][python3](code/else_example.py)

The rules for this keyword are very similar. After the first indented block, you can add the `else` keyword, the character `:`, and then another indented block. This block then only gets run when the first statement is not true (aka false!).

@[task][10][Hidden Treasure](~
    Part 1: Understand what the following code is doing:

    @[code_include][python3](code/password_attempts.py)

    Part 2: How would we change the code to allow for 3 attempts, rather than 2?
~)

Not only do we have these tools, but because the indented blocks are just blocks of code themselves, we can add more `if` statements in the blocks, and indent further to check multiple expressions:

<div class="continue"></div>

@[code_include][python3](code/nest_example.py)

@[task][15][Weatherman Forecast](~
    Jake, A rather lazy weatherman has to read out a welcome message at the start of every day depending on the celcius reading. This graphic explains the correct response to give:

    ![Weatherman instructions](../img/python/weatherman.png)

    All coloured sections include the number on the left and exclude the number on the right, so on a day with a reading of 18 degrees, Jake should say "Have a great day!"

    Jake has written the following program to help him remember the responses, but his code has 3 bugs. Please fix them.

    @[code_include][python3](code/weatherman.py)

    *Hint 1 (Highlight text to reveal)*: <span class="white">Try entering the celsius for a few values and see when the output is incorrect. Then run through the code and see what is going wrong.</span>

    *Hint 2 (Highlight text to reveal)*: <span class="white">The code is wrong for 7, 18 and 26 celsius. Each of these are caused by a different bug.</span>

    *Hint 3 (Highlight text to reveal)*: <span class="white">The above celsius readings can be fixed by changing lines 4, 5 and 14 respectively (The last one requires you to make a new line, not just edit the old one).</span>
~)

Moving our code to the right everytime we nest conditionals can be a bit annoying though. For this we have yet another tool:

@[code_include][python3](code/elif.py)

The `elif` keyword (Shortening of `else` then `if`) can be placed after the indented block of an `if` statement, or another `elif` statement.
The indented block after an `elif` keyword is run only if the expression after the `elif` keyword is true, and all other previous expressions (in the `elif` or `if` statements above) are false. Note that this only checks up until the first `if` statement it spots:

@[code_include][python3](code/elif_chain.py)

## Sensors - Colour and Ultrasonic Sensors

So far you've just been running different code based on input you supply. Let's make this a bit more interesting and instead use the values of robot sensors in our conditionals.

<div style="width: 100%; overflow: auto;">
<div style="width: 40%; margin-top: 32px; float: left;" markdown="1">
Let's start by adding these sensors to your testing bot. You can do this by pressing the pencil icon on the bot menu, and selecting the device button (White square with red circle) from the left hand sidebar.
</div>
<div style="width: 60%; padding-left: 5%; padding-bottom: 32px; float: left; ">
<video width="100%" controls>
    <source src="../video/devices.mp4">
    Your browser does not support video playback.
</video>
</div>
</div>

Place a colour sensor, and set the port to `in1`, as well as an ultrasonic sensor, and set the port to `in2`.

Now, as we did with the motors, we can integrate these devices into our programs.

@[code_include][python3](code/sensor_start.py)

Just like motors, we import the code we need (`from ev3dev2...`), and then initialise each device to a variable (`ultrasonic = UltrasonicSensor(INPUT_2)`), which we can use to access it (`dist = ultrasonic.distance_centimeters`).

Each of these sensors really only have one datapoint of use, as shown in the example above:

* `color.rgb` gives 3 values, the red, green and blue components in the colour it currently sees. You can save these values to three different variables using commas, as the example code does.
* `ultrasonic.distance_centimeters` gives a single value, the estimated distance to the nearest object, measured in centimetres.

@[note][Colour RGB Space](~
    One way computers encode colour is through RGB components. Your computer monitor is actually built up of many small red, green and blue lights, and colour is presented to your monitor by turning these three lights on to different amounts (For example, purple is equal parts red and blue).

    The values returned by `color.rgb` aim to be somewhere from 0-255 in value, where 255 represents completely on and 0 represents completely off (So purple might be something like `r=200`, `g=10`, `b=220`). You can visualise this colour blend quite easily using any online colour picker such as [this one](https://image-color.com/color-picker.html). As you might see on that page, there are many different ways colour can be represented in text, but RGB is probably the simplest and is often used.
~)

@[task][5][Eek! Too close!](~
    Write a python script which will wait for 3 seconds, and then print one of two things:

    * 'Eek! Too close!' If the robot is less than 15 cm away from an object (Use the ultrasonic sensor).
    * 'Thanks for respecting my personal space' otherwise.

    In order to wait for 3 seconds, you first need to `import time` at the top of your file, and then call `time.sleep(3)`.
~)

One last tool we can use in our toolbox are the terms `and`, `or` and `not`. These give us a way to combine or modify expressions to make code easier to read.

@[code_include][python3](code/and_example.py)

@[checkpoint][20][Coloured Padlock](~
    You can download the checkpoint for this week [here](ev3simc://drive.google.com/uc?export=download&id=1zVbZbK0q-Ui9jhf_oXqe-DEuiBw-qAQM).

    The custom task you downloaded should spawn a robot in the top left corner of a maze. The rules of the maze are simple, there are three coloured squares at the bottom of the maze, each of these squares has 3 corresponding buttons, although only one of them works. The location of the working button is dependant on the colour of the square, a blue square will have a working button just above, a green square will have the button slightly higher up, and a red square will have the button all the way to the top of the maze. All three buttons must be pushed (Your robot should go on top of them) for the exit at the bottom right of the maze to open up.

    ![Example gif of the task being completed](../img/ev3/padlockTask.gif)

    To make the process a bit less tedious, here are some measurements of the field:

    ![Measurements](../img/ev3/maze_proportions.png)

    Edit the contents of `code.py` to complete the task!

    *Hint 1 (Highlight text to reveal)*: <span class="white">Provided you calculated the robot speed in the previous lesson, you can reuse this with the measurements above.</span>

    *Hint 2 (Highlight text to reveal)*: <span class="white">First try moving to the first coloured square, and printing its colour (red, green or blue). Use the color.rgb values to determine which colour it is. Do you get the colour values you expect? You might need to wait a bit before getting color.rbg by using time.sleep(0.1).</span>

    *Hint 3 (Highlight text to reveal)*: <span class="white">Depending on the colour, all you want to alter is how high up the map you should move. The rest of the actions required (Move left then right to activate the button, move back down, and then shift over to the next colour) should be the same.</span>
~)
