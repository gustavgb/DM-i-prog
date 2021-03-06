# Problem B: Big Brother

You have come up with a new brilliant idea of automatically keeping track of how much (or little) your employees are working in the office: face recognition! By installing some advanced CCTV cameras in the office you will be able to automatically detect when the staff arrives or leaves, are taking breaks etc, thus reducing the need for manual administrative work. No more stamping clocks.
A good CCTV camera is expensive, so ideally you would only use one. It would obviously have to be placed somewhere where the entire office floor can be overlooked, so there are no walls blocking some dark corner of the floor where your workforce might hide.

While looking at the floor map, which can be modelled as a simple polygon, you are not sure if this is possible. Since the task is way above the paygrade of everyone else in the company you will have to write the program figuring this out yourself. If it is possible, you also want to know the area of the surface where the camera could be placed. See Figure 1 for an example.

![](img-0002.png)

## Input
The first line of input contains an integer n (3≤n≤500000), the number of vertices describing the polygon representing the office floor. Then follow n lines containing the integer coordinates x,y of the polygon in clockwise order (0≤x,y≤107).

## Output
Output the area of the region of the map where a CCTV camera could be placed so that the rest of the office can be observed. (If it is not possible to put the camera anywhere, this area is 0.)

The answer must be correct with a relative of at most 10−6, or an absolute error of at most 0.1.

**Sample Input 1**

8
0 0
0 1
1 1
1 2
2 2
2 1
3 1
3 0

**Sample Output 1**

1.0

**Sample Input 2**

8
0 0
0 2
1 2
1 1
2 1
2 2
3 2
3 0

**Sample Output 2**

0.0

**Sample Input 3**

6
140 62
97 141
68 156
129 145
153 176
130 109

**Sample Output 3**

48.80349500
