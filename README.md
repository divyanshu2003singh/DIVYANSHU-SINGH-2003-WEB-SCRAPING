# Web Scraping and CRUD Operations Readme

This repository contains a Node.js application for web scraping public announcements from a website and performing CRUD operations (Create, Read, Update, Delete) on the scraped data using a MongoDB database. The application allows you to scrape data from a specific website, store it in a MongoDB database, export the data in CSV or Excel format, create new announcements, update existing announcements, retrieve announcements by ID, and delete announcements by ID.

## Prerequisitesm 

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Download and install Node.js from [https://nodejs.org/](https://nodejs.org/).
- **MongoDB**: Install MongoDB and set up a database. You can download MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).

## Installation

1. Clone the repository to your local machine:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd <project-folder>
   ```

3. Install the required dependencies:

   ```
   npm install
   ```
4. change the mongodb URL with your URL in webScraping.js
## Usage

### 1. Web Scraping

To scrape data from the website and store it in the MongoDB database, run the following command:

```
node cli.js scrape
```

This command will start scraping data and store it in the MongoDB database.

### 2. Export Data

To export scraped data in CSV or Excel format, use the following command:

```
node cli.js export --format <csv or excel> --output <output-directory>
```

Replace `<csv or excel>` with the desired export format ('csv' or 'excel') and `<output-directory>` with the directory where you want to save the exported file.

### 3. CRUD Operations

#### Create a New Announcement

To create a new announcement, use the following command:

```
node cli.js create --title <announcement-title> --date <announcement-date> --description <announcement-description>
```

Replace `<announcement-title>`, `<announcement-date>`, and `<announcement-description>` with the respective values for the new announcement.

#### Update an Announcement

To update an existing announcement, use the following command:

```
node cli.js update --id <announcement-id> --title <new-title> --date <new-date> --description <new-description>
```

Replace `<announcement-id>` with the ID of the announcement you want to update and provide the new values for title, date, and description.

#### Get an Announcement by ID

To retrieve an announcement by its ID, use the following command:

```
node cli.js get --id <announcement-id>
```

Replace `<announcement-id>` with the ID of the announcement you want to retrieve.

#### Delete an Announcement by ID

To delete an announcement by its ID, use the following command:

```
node cli.js delete --id <announcement-id>
```

Replace `<announcement-id>` with the ID of the announcement you want to delete.

## Code Explanation

- **webScraping.js**: Contains the web scraping logic using the `request` and `cheerio` libraries. Scraped data is stored in a MongoDB database using Mongoose.

- **exportData.js**: Exports data from the MongoDB database in either CSV or Excel format using `csv-writer` and `exceljs` libraries.

- **crudOperations.js**: Contains functions for performing CRUD operations on the MongoDB database, including adding, updating, retrieving, and deleting announcements.

- **cli.js**: Command-line interface for interacting with the application. Supports scraping, exporting, creating, updating, retrieving, and deleting announcements through command-line commands.

