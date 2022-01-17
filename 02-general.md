# Typeguards

We are approaching one of our frequent code reviews, and we have targeted our typeguards as requiring a refresh.

1. Please look at the isStruct function, and work out what the weaknesses of this function are, and how you would improve this typeguard, if at all.

2. Please look at the overloaded functions (isUnion, isIntersection), and tell us how you might improve these, and what the weaknesses of this type of function are.

3. Please examine the isStruct function, and write a function in whatever language you think appropriate to generate an isStruct typeguard function from a Typescript type definition input (this may be easier to do by parsing text). Your function should be able to cope with as many of the types included in the file as possible.

## Constraints

This typeguard is used on both the front-end and the back-end, and each backend request will require at least one typeguard to be run.

We employ a strict 'type-checking at runtime boundaries' approach, so there cannot be too much flexibility in the typeguards.
