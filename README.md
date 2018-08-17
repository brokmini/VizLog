# Vizlog
A timeline view of log files

This takes as input .txt log files and creates a timeline view of log data.

You can filter based on date, order ascending/descending based on time. 

Serves like grep where you can search for patterns and skew them accordingly. At any time, you can remove already applied pattern searches.

How to get started?
- Download and install Node.js
- From the command line navigate to where you want to store the code files 
- Run the below commands
  - npm install -g create-react-app
  - create-react-app **suitable-folder-name**
  - cd **suitable-folder-name-given**
  - You will find a src folder in there. Replace its contents with files from this repository
  - npm start
- The browser will open up automatically hosting the page

There is a sample test.txt log file in the repository that you could use for testing purposes. Very huge log files take time in loading the visual

Improvisation to look for in the future:
- Add time range based filtering in addition to the existing date filter
- Provide means to fetch files directly from the router
- Functionality similar to grep-c
