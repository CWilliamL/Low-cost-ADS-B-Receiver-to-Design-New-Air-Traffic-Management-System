# Low-cost-ADS-B-Receiver-to-Design-New-Air-Traffic-Management-System
FYP project to visualize and develop algorithm to optimize the airspace usage in Hong Kong International Airport

This Final Year Project was to develop low cost ADS-B Receiver, visualize collected data and develop sorting algorithm to optimize the airspace usage in Hong Kong International Airport. 

# Hardware Setup

The low cost ADS-B Receiver is to use antenna, ADS-B Receiver and Raspberry Pi to develop a low cost receiver to collect the ADS-B signal emitted from aircraft. Then used Dump1090, a software written by antirez https://github.com/antirez/dump1090, to collect the data from aircraft and save into a CSV file. From collected data, we could knew the aircraft's position, altitude, speed, vertical speed, heading, squawk, flight No., ICAO address, received and transmitted time. Those data were useful for visualization and algorithm development.
![datacollection](https://user-images.githubusercontent.com/75830784/146626058-2139d2af-2109-4bea-b5c3-22429be7697a.png)

# Visualization and Sorting Approach Sequence
The program in this repository can load the flight data from CSV file and visualize on the Google Map. The map is imported to the program using Google provided Google Map API. 

To load the CSV file, click the "Load control bar" button to load. But make sure the data format in the CSV file should be corrected. After the file is loaded, the bar on top right can be draged, which is time range fetched from the CSV file. Click the "Play in animation" button to visualize the aircraft position on the map in animation. 
![image](https://user-images.githubusercontent.com/75830784/146626350-a2cf7b21-9893-4d90-9a89-662168796920.png)

The table on right hand side will shows the recommand speed and sequence for landing based on the algorithm that we designed in the FYP. Based on the minimal time seperation of each aircrafts and their current positions, we designed an algorithm to reduce the distance separation of each aircrafts. Hopes to reduce unwanted flying time which leads to reduce fuel consumption and operating cost.
![image](https://user-images.githubusercontent.com/75830784/146626560-b62e9a1f-50c5-4185-b2b7-a709eb6cc254.png)

# How to Run
1. Git clone the repository
2. Download Web Server for Chrome in Chrome App Store https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb/related
3. Select the repository in Web Server for Chrome

![image](https://user-images.githubusercontent.com/75830784/146626807-e02da99e-62b9-4bf7-ad6f-d2d5940f23a1.png)

# Demo Video
https://youtu.be/97maHJHCqTc
