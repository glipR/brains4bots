---
title: Dictionaries and Functions
date: 2021-01-01 12:00:00 +1100
math: true
code: true
actual_prev:
  title: Lists and Compass
  url: /posts/lists
---

At this point, you've covered all of the sensors you can use in the simulator (and all of the sensors normally used in soccer and rescue competitions). Additionally, you have all the programming tools you need to write whatever program you desire. **However**, if you only use these sensors in their most basic functionality, and only use the programming tools we've shown so far, you'd be a very messy and limited programmer, and you wouldn't be getting the most out of your sensors.

On this page, we'll start fixing both of these problems. You'll learn how to fully utilise the colour sensor, and some more programming tools to help with that.

## Dictionaries

In the last lesson, with lists, remember that in some puzzles, we needed to search through the list to find a particular item. For example, in the Locations puzzle:

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

This is our first indicator that lists aren't the only ways we should be storing collections of items. We need a different collection that allows us to (just like variables) give names to data, and retrieve data based on that name (So we can store data for `Hotel`, and retrieve data for `Hotel`).

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

Dictionaries are written with curly `{}` brackets rather than square `[]` ones. Just like a real dictionary, where you can lookup a word to find it's meaning, you can look up a word in a Python dictionary to find the linked item. So in a real life dictionary, if you looked up the word `Hotel`, you would find the definition of `Hotel` is `[42, 84]`.

The only extra thing to note is that `:` separates to 'word' from it's definition (Look at the first few lines of code above). As you can see it keeps a lot of the style of lists (accessing and changing elements with indexing using `[word]`).

**TODO Rewrite this specific locations implementation to use a dictionary, also do your own**

## Accurate Colour Sensing, and using two Colour Sensors

So far the most we've done with colour sensors is just to distinguish red, green and blue, which the colour sensor already does for us, for the most part. What if there are other colours we need our robot to figure out?

For now, let's just think about introducing one more colour, yellow. At the moment, depending on how you've written your colour sensing code, your robot might think yellow is red, green or none of the three colours (but hopefully not blue!). This is because, using that Red, Green, Blue composition that the colour sensor uses, Yellow is 255 for red, 255 for green, and 0 for blue (aroundabout, obviously pure yellow in real life is hard to come by, and the colour sensors will be slightly off).

So how can we add some extra code to achieve this?

**Task: Given that you know yellow should have big red/green, with no blue, try to change this rgb code so that it can spot the difference between blue, green, red, yellow.**

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

So for yellow, we have code that checks that the red and green components are large, and the blue component is small.
For red, we have code that checks that the red component is large, and the green and blue components are small.

In general, we can try doing a similar think for lots of colours: The colour we are looking at is similar to some specific colour (like red, green, blue, yellow) if the r, g, b components are similar.

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

You might notice that in the last script above, there is no `else`, and so we never print `I have no idea!`.
This is because `min_difference` is always one of `yellow_difference`, `red_difference`, and so on.

If we did want to have a case where we print `I have no idea!`, you'd have to add another check beforehand, something like:

* If the `min_difference` was too big, or preferably:
* If the two smallest differences were close together.

If you're up for the challenge, try implementing this into your code in the next puzzle!

</div>

**TODO: Looping over dictionaries of colours**

**Task: Using a dictionary, write some code to pick which colour you are looking at (Task prints "First, pure white" ,"Sea Blue", (15, 75, 240)).**
ev3simc://drive.google.com/uc?export=download&id=1yzezZt94uZNcR9CR0NijzHjAGQimGj7o

/assets/img/dynamic_color.gif

**Note: HSL is more stable for these reasons. Think about how you could use it for colour sensing.**

## Functions

**What are functions, where have we seen them?**

**Double sensor following**

**Project: On/Off Line follower + State Machine with rules?**
