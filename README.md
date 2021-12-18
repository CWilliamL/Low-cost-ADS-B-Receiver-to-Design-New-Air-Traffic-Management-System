# Low-cost-ADS-B-Receiver-to-Design-New-Air-Traffic-Management-System
FYP project to visualize and develop algorithm to optimize the airspace usage in Hong Kong International Airport

This Final Year Project was to develop low cost ADS-B Receiver, visualize collected data and develop sorting algorithm to optimize the airspace usage in Hong Kong International Airport. 

**Hardware Setup**
The low cost ADS-B Receiver is to use antenna, ADS-B Receiver and Raspberry Pi to develop a low cost receiver to collect the ADS-B signal emitted from aircraft. Then used Dump1090, a software written by antirez https://github.com/antirez/dump1090, to collect the data from aircraft and save into a CSV file. From collected data, we could knew the aircraft's position, altitude, speed, vertical speed, heading, squawk, flight No., ICAO address, received and transmitted time. Those data were useful for visualization and algorithm development.
![datacollection](https://user-images.githubusercontent.com/75830784/146626058-2139d2af-2109-4bea-b5c3-22429be7697a.png)

**Visualization and Sorting Approach Sequence**

