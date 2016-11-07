### Instructions

The objective of this project is to use the Angular framework to create a website using the Reddit API.

#### Resources
[reddit docs](https://www.reddit.com/dev/api)

### Basic Req's
Install your dependencies using `npm install` and start your local server using `npm start`. 
Your web application will be exposed at http://localhost:3000

* Use the Reddit API to get a list of reddits. May use any endpoint.
	-example api endpoint: https://www.reddit.com/r/aww.json
    -the format is: https://www.reddit.com/r/[subreddit_name].json
* App.js - initialize app and configure router
* Models: define types for reddit items, details
* Services:
	-getRedditList() function:
		- use the host string from base service to get all entries for your chosen subreddit from the reddit api
		- the function should return an array of data on success
		- the function should handle any errors

* Repository:
	-getRedditList() function:
		- calls the getRedditList() service function, filters data (minimum needed is author, id, title, url) and returns an array
        - HINT: Instead of giving your ViewControl the array with that massive amount of unused information, return just an array of objects that contain that that small amount of data (author, id, title, url).

* Viewcontrols:
	-enable user to switch between views
	-listview to display a list of all reddits.
	-detail view to display the details of the reddit clicked
		- should display info like author, title, and link to the actual reddit item.
        - NOTE: There is no way to get a single reddit entry from the reddit api. You will need to create a function in your repository to look through the array of all reddit items, and return the one that matches the id requested.
	-controller should call functions from the respective respository to handle actions
