# Notepad

This is a notepad of ideas/suggestions/flows that don't really belong anywhere else

## Priority sort order

It should be possible to define priority as strings as well as numbers. In `minitask.json`, it should be possible to define a sort order for priority, to define how the priority values should be sorted. For example, let's say the user has defined the following priorities:

```
    "priorities": {
        "urgent",
        "high",
        "medium",
        "low"
    }
```

The sort order should be equal to the order of the priorities as they have been defined. So in the example above, the highest priority will be `urgent` and lowest will be `low`, and when sorted, they will be sorted appropriately, in accordance to the order how they were defined in `minitask.json` 