---
title: Dictionaries and Functions
date: 2021-01-01 12:00:00 +1100
math: true
code: true
actual_prev:
  title: Lists and Compass
  url: /posts/lists
---

<!-- GRAMMAR CHECK DONE -->

<div id="dialog_entry" markdown="1">
By the end of this page, you'll be able to distinguish colours much better, and you will have discovered two powerful programming tools!

<div markdown="1" style="text-align: center">
  ![test2](/assets/img/coloured_directions.gif){: width="70%"}
</div>
</div>

At this point, you've covered all of the sensors you can use in the simulator (and all of the sensors generally used in soccer and rescue competitions). Additionally, you have all the programming tools you need to write whatever program you desire. **However**, if you only use these sensors in their most basic functionality and only use the programming tools we've shown so far, you'd be a very messy and limited programmer, and you wouldn't be getting the most out of your sensors.

On this page, we'll start fixing both of these problems. You'll learn how to fully utilise the colour sensor and some more programming tools to help with that.

## Dictionaries

On the last page, with lists, remember that we needed to search through the list to find a particular item in some puzzles. For example, in the Locations puzzle:

<div class="code_container" markdown="1">

```python
my_locations = [
    # Name, Distance, Degrees
    ["Hospital", 30, 135],
    ["Hotel", 42, 84],
    ["Restaurant", 25, 285],
]

# I want to find the distance and degrees of the hotel.
# But I don't always know the Hotel is at index 1.
# So let's search for it.
for location in my_locations:
    if location[0] == "Hotel":
        print("Distance is", location[1], "and bearing is", location[2])
    else:
        print(location[0], "is not Hotel!")
```

```text
### Output ###
>>> Hospital is not Hotel!
>>> Distance is 42 and bearing is 84
>>> Restaurant is not Hotel!
```

</div>

This is our first indicator that lists aren't the only ways we should be storing collections of items. We need a different collection that allows us to (just like variables) give names to data, and retrieve data based on that name (So we can store data for `Hotel` and retrieve data for `Hotel`).

Once again, Python saves the day! In comes the dictionary:

<div class="code_container" markdown="1">

```python
my_locations = {
  "Hospital": [30, 135],
  "Hotel": [42, 84],
}

my_locations["Restaurant"] = [25, 285]

print(my_locations["Hotel"])
print("Distance is", my_locations["Hotel"][0], "and bearing is", my_locations["Hotel"][1])
```

```text
### Output ###
>>> [42, 84]
>>> Distance is 42 and bearing is 84
```

</div>

Dictionaries are written with curly `{}` brackets rather than square `[]` ones. Like a real dictionary, you can look up a word to find its meaning. In Python terms,  you can supply a key to a dictionary to find the linked item. So in a real-life dictionary, if you looked up the word `Hotel`, you would find the definition of `Hotel` is `[42, 84]`.

The only extra thing to note is that `:` separates the 'word' from its definition (Look at the first few lines of code above). As you can see, it keeps a lot of the style of lists (accessing and changing elements with indexing using `[word]`).

<div class="puzzle" title="Locations Fixing" markdown="1">

You can download the puzzle [here](ev3simc://drive.google.com/uc?export=download&id=1Nwcu56QkSfwCmKsIXsgMAoI2PV309IUW).

You've been given a solution to the "Locations" puzzle from earlier. You need to change the solution so that it uses a dictionary for `commands`, rather than a list.

If you'd like, you can do this with your own solution as well.

</div>

## Accurate Colour Sensing

So far, the most we've done with colour sensors is just to distinguish red, green and blue, which the colour sensor already does for us, for the most part. What if there are other colours we need our robot to figure out?

For now, let's just think about introducing one more colour, yellow. Depending on how you've written your current colour sensing code, your robot might think yellow is red, green, or none of the three colours (but hopefully not blue!). This is because, using that Red, Green, Blue composition that the colour sensor uses, yellow is 255 for red, 255 for green, and 0 for blue (around about, obviously pure yellow in real life is hard to come by, and the colour sensors will be slightly off).

So how can we add some extra code to achieve this?

<div class="puzzle" title="Colour Triple Yellow" markdown="1">

You can download the puzzle [here](ev3simc://drive.google.com/uc?export=download&id=1GYVOEgaUoENDjRYKC8NCzDpWlLF3EhCj).

Earlier on, we had a puzzle where 3 colours flashed up, and you had to print whether they were red, green or blue.
Now, we are doing the same task, but adding yellow to the mix.

![](/assets/img/colour_triple_yellow.gif)

<div>

<div class="hint" key="colour-triple-1" title="Hint 1" markdown="1">

Notice that when looking at the variables `r`, `g` and `b`, yellow always has `r` and `g` rather big, and `b` rather small.
Is there a condition we can write that will catch this?

</div>

</div>

</div>

<div class="continue"> </div>

<div class="note" title="An approach" markdown="1">

One way you could do this is by checking separately if red and green are very big, in comparison to blue:

```python
r, g, b = color_sensor.rgb

# Yellow check - rather lenient but still shouldn't mispick red or green.
if r > 150 and g > 150 and b < 50:
    print("Yellow!")
elif r > g + b:
    print("Red!")
elif g > r + b:
    print("Green!")
elif b > r + g:
    print("Blue!")
else:
    print("I have no idea!")
```

</div>

One possible solution for sensing yellow is the code in the note above, have a quick read and understand what it does.

So for yellow, we have code that checks that the red and green components are large and the blue component is small.
For red, we have code that checks that the red component is large and the green and blue components are small.

In general, we can try doing a similar thing for lots of colours: The colour we are looking at is similar to some specific colour (like red, green, blue, yellow) if the r, g, b components are similar:

```python
r, g, b = color_sensor.rgb

# abs is a neat function that makes a number positive (-3 becomes 3, etc.)

# What is the difference from 255, 255, 0?
yellow_difference = abs(r - 255) + abs(g - 255) + abs(b - 0)
# What is the difference from 255, 0, 0?
red_difference = abs(r - 255) + abs(g - 0) + abs(b - 0)
# What is the difference from 0, 255, 0?
green_difference = abs(r - 0) + abs(g - 255) + abs(b - 0)
# What is the difference from 0, 0, 255?
blue_difference = abs(r - 0) + abs(g - 0) + abs(b - 255)

# min is another neat function, that returns the minimum of a collection of items.
min_difference = min(yellow_difference, red_difference, green_difference, blue_difference)
if yellow_difference == min_difference:
    print("Yellow!")
elif red_difference == min_difference:
    print("Red!")
elif green_difference == min_difference:
    print("Green!")
elif blue_difference == min_difference:
    print("Blue!")
```

<div class="note" title="" markdown="1" title="No color">

You might notice that there is no `else` in the last script above, so we never print `I have no idea!`.
This is because `min_difference` is always one of `yellow_difference`, `red_difference`, and so on.

If we did want to have a case where we print `I have no idea!`, you'd have to add another check beforehand, something like:

* If the `min_difference` was too big, or preferably:
* If the two smallest differences were close together.

If you're up for the challenge, try implementing this into your code in the next puzzle!

</div>

### Looping over dictionaries

So, we might write a similar version of our code above to store many different colours in a dictionary and then decide which of these colours is closest to what the colour sensor sees.

But to do this, we need some way to execute the code for every entry in the dictionary!

Luckily, since a dictionary is a collection of items, we can use a `for` loop:

<div class="code_container" markdown="1">

```python
my_colours = {
    "Red": [255, 0, 0],
    "Green": [0, 255, 0],
    "Blue": [0, 0, 255],
}

for key in my_colours:
    print(key, "has rgb", my_colours[key])
```

```text
### Output ###
>>> Red has rgb [255, 0, 0]
>>> Green has rgb [0, 255, 0]
>>> Blue has rgb [0, 0, 255]
```

</div>

<div class="puzzle" title="Dynamic Colours" markdown="1">

You can download the puzzle [here](ev3simc://drive.google.com/uc?export=download&id=1yzezZt94uZNcR9CR0NijzHjAGQimGj7o)

Now, rather than sensing reds, greens and blues, you need to sense a range of different colours!

Your robot will first be placed on a pure white square, and the message "This is what white looks like" gets printed. Once you are ready to learn what colours you are looking for, print "Ready!".

After this, you'll be given some instructions through input, describing each of the colours. Then, the colour beneath your robot will change, and you need to print which of these colours you see.

![Example gif of the puzzle being completed](/assets/img/dynamic_color.gif)

<div>

<div class="hint" key="dynamic-1" title="Hint 1" markdown="1">

First, focus on parsing all of the input and placing the information in a dictionary. So the end result might look like:

```python
colours = {
    "Aqua": [20, 10, 255],
    "White": [255, 255, 255]
}
```

But rather than writing these values out, you are creating this dictionary based on `input`.

</div>

<div class="hint" key="dynamic-2" title="Hint 2" markdown="1">

Look at the suggested solution for sensing with yellow in the note above. Can we generalise this to use our dictionary?

</div>

</div>

</div>

<div class="note" title="HSV Colour" open="1" markdown="1">

This example is just one way to sense colours accurately, and there are problems that this simple approach has.

For example, this relies heavily on good calibration and understanding what each colour looks like. If the green is slightly brighter than usual, it might be mistaken for white, purely from the distance in RGB.

A better solution might be to use the [HSV encoding](https://www.wikiwand.com/en/HSL_and_HSV#/Basic_principle) of colour, which `ev3dev2` [actually supports](https://ev3dev-lang.readthedocs.io/projects/python-ev3dev/en/stable/sensors.html#ev3dev2.sensor.lego.ColorSensor.hsv). Although if you were to use HSV over RGB, rather than using the distance in HSV space, you might want to use the S and V values for a threshold and only compute which colour based on Hue.

</div>

## Functions

### What are they?

So far in our programming, we've seen many different tools that used the `()` to get something done. Examples you've seen before include `print`, `input`, `on_for_seconds`, and many others. We've given them many different names throughout these pages (tools, things, methods, functions). And you might have been wondering how you can make your own.

These things are called functions, and they let you package little snippets of Python into their own self-contained bits that you can reuse.
For example, let's revisit how we calculated the colour differences before:

```python
r, g, b = color_sensor.rgb

# What is the difference from 255, 255, 0?
yellow_difference = abs(r - 255) + abs(g - 255) + abs(b - 0)
# What is the difference from 255, 0, 0?
red_difference = abs(r - 255) + abs(g - 0) + abs(b - 0)
# What is the difference from 0, 255, 0?
green_difference = abs(r - 0) + abs(g - 255) + abs(b - 0)
# What is the difference from 0, 0, 255?
blue_difference = abs(r - 0) + abs(g - 0) + abs(b - 255)
```

Notice how a lot of the code is very similar, it is just that the constant 0 and 255 that are changing.
Rather than having all of this repeated and hard to read code, we can use functions!

```python
def colour_difference(colour1, colour2):
    return abs(colour1[0] - colour2[0]) + abs(colour1[1] - colour2[1]) + abs(colour1[2] - colour2[2])

r, g, b = color_sensor.rgb

yellow_difference = colour_difference([r, g, b], [255, 255, 0])
red_difference = colour_difference([r, g, b], [255, 0, 0])
green_difference = colour_difference([r, g, b], [0, 255, 0])
blue_difference = colour_difference([r, g, b], [0, 0, 255])
```

A function always starts with the `def` keyword, followed by the name of the function (`colour_difference`). After that, you've got round `()` brackets, which contain `arguments` of a function. `arguments` are like variables that you can change before running the function (So `colour1` gets set to `[r, g, b]` and `colour2` gets set to `[255, 255, 0]` for `yellow_difference`).

Then, indented just like we've seen before is the code the function contains. Now, whenever we write this function name, running the function is the same as running the code inside.

The last thing a function does is `return`. Whatever is `return`ed from a function then becomes the value wherever the function is written, so `yellow_difference` becomes `abs(colour1[0] - colour2[0]) + abs(colour1[1] - colour2[1]) + abs(colour1[2] - colour2[2])`, where `colour1=[r, g, b]` and `colour2=[255, 255, 0]`.

<div class="continue"> </div>

<div class="puzzle" title="Customer Service" markdown="1">

You can download the puzzle [here](ev3simc://drive.google.com/uc?export=download&id=1IJ_vYMGUtRTS4m_lqYlKywgptOHcGpC7)

Joseph is writing a bot to handle many different customer service requests.
In this environment, users are allocated to plans, and these plans can change.

Joseph already has most of the code written, but there are a few bugs in his code, which means that some actions aren't correctly completed. Can you help him?

![](/assets/img/customer.gif)

<div>

<div class="hint" key="customer-1" title="Hint 1" markdown="1">

There is one problem with `create_user`, one problem with `set_user_plan`, and one problem somewhere in the `while True` block.

</div>

<div class="hint" key="customer-2" title="Hint 2" markdown="1">

* The `create_user` bug causes a user's `plan` entry to be incorrect.
* The `set_user_plan` bug causes a plan list to contain less user ids than it should.
* The `while True` bug causes an error with reading the messages.

</div>

</div>

</div>


### But why?

Functions at first might seem a bit useless, but as your programs grow longer and longer, you'll grow to love them.
They allow you to separate little bits of your program into tidy packages that can then be used all over your robot.

Additionally, it makes you give a name to a portion of the code, making it much easier to understand.

The type of function seen on the motors, like `my_motor.on_for_seconds`, is slightly different and will be discussed in some of the gauntlet pages.

### Project time

<div class="project" title="Coloured Directions" markdown="1">

You can download the project [here](ev3simc://drive.google.com/uc?export=download&id=1oX_Hy9lJMM2iv98a31J54zTYdP-XWwUG).

This project is broken up into small parts.

**Part 1**: Write a function, `rotate_to(d)` which will rotate your bot `d` degrees counterclockwise. Test this on the bot provided in the project. (Use the Location Puzzle solution if you want)

**Part 2**: Write a function `get_color()`, that will return the correct colour of a square, provided you already have calibrated for white, and have a dictionary of colour keys, with r, g, b values. (Use the Dynamic Colours Puzzle solution if you want)

**Part 3**: Using the previous function, write a program which does the following:

* Reads in a set of colour definitions and rules ("Blue is 0, 0, 255 and means you must move NWWNW")
* Repeatedly:
    * Sense the colour below you
    * Match it to one of the colour definitions you've been given (Blue)
    * Follow the appropriate rules (We must move North, West, West, North, West)
* When the colour sensed is pure black, stop.

The first colour you are on will always be pure white.

![Example of the Project being Completed](/assets/img/coloured_directions.gif)

<font size="2">The gif above is sped up</font>

<div>

<div class="hint" key="project" title="Hint" markdown="1">

This is just a slightly more complicated version of the colour sensing puzzle you did earlier.

* Sense the colour with `get_color`.
* Get the correct movement string, based on this colour (NWWNW).
* Use a dictionary, or `if` statements, to turn each of these into a compass bearing.
* Rotate to this compass bearing with `rotate_to`.
* Move forward.

</div>

</div>

</div>
