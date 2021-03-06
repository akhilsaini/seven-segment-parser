## Application

<h2>Simple application to parse the seven Segment files and Marco-polo numbers.</h2>
<h2>Marco-polo Problem</h2>
<p>To solve this problem we need to check whether the numbers is divisible by the 4 and 7 if yes then we mark that number as marco-polo number,if not then we check if it's only divisible by 4 then we mark the number as marco and if it's divisible by only 7 then we mark it as polo otherwise keep the number as it is.</p>
<h2>Seven-Segment Problem</h2>
<p>To solve this problem we need to uniquely define the each and every segment of the seven-segment,for that we have named the each segment uniquely using characters from <b>a</b> to <b>g</b>. Please refer the below image.</p>
![alt text](https://github.com/akhilsaini/seven-segment-parser/blob/master/logo/ss.png)

<p>Now to uniquely define the segments we need to give them specific numbers which we have given a,b,c,d,e,f,g respectively 1,2,4,8,16,32,64. This numbering is done just to get the hexadecimal equivalent of each and every number.</p>
<p>Refer the below list for each and every number from 0 to 9 in seven segment display.</p>

<p>63: 0, // 0x3F(a+b+c+d = 15, e+f = 48) likely for all the numbers</p>
<p>6: 1, // 0x06</p>
<p>91: 2, // 0x5B</p>
<p>79: 3, // 0x4F</p>
<p>102: 4, // 0x66</p>
<p>109: 5, // 0x6D</p>
<p>125: 6, // 0x7D</p>
<p>7: 7, // 0x07</p>
<p>127: 8, // 0x7F</p>
<p>111: 9 // 0x67</p>


## Quick Start Guide

## Remotely

  The quickest way to get started with application is just go the archive directory of the repository and download both files. Now use import the postman requests json file in your postman tool and hit the api using default parameters set there. You might also need the txt file (you just downloaded) for the testing the seven-segment parser. Those postman requests will hit to the remotely deployed application on heroku.


## Locally

  Follow the below menioned steps for quick starting with application locally.

  1. git clone https://github.com/akhilsaini/seven-segment-parser
  2. cd seven-segment-parser
  3. npm start

  Now you can check the services just by replacing the remote host <b>https://stark-hollows-81884.herokuapp.com</b> with <b>localhost:3000</b> in your postman requestst.

  Note : Assuming node.js,npm working properly. recommended Node version : 6.9.4, recommended npm version : 3.10.10

  Once you do the npm start command it'll automatically install the application dependency and start the application on the given port of 3000( default port).

## Test Cases

	You can run the test cases using <b>npm test</b> command.

## Benchmarking

	Benchmarking of the application is done on my local system with configuration <b>windows 64,8 GB Ram,500 GB HDD</b>. 
	You can refer the <b>benchmark</b> directory for the same.

	Also benchmarking can be done on your local system also assuming <b>ab</b> tool installed on your local machine.
	To bechmark the services just run the <b>gulp</b> command.

  

## Specific Mention
	
	archive directory : For testing the services remotely/locally and seven-segment file also.
	benchmark directory : For checking the bechmark results
	test directory : For test cases.



<p><b>Author : Akhilesh Saini</b></p>
<p><b>Email : akhileshdumca@gmail.com</b></p>
  

