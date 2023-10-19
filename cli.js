const program = require('commander');
const scrapeData = require('./webScraping').scrapeData;;
const exportData = require('./exportData');
const {
    addAnnouncement,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
} = require('./crudOperations');

const yargs = require("yargs");

// Scrape data and store in the database
yargs.command({
    command: 'scrape',
    describe: 'Scrape data from the website and store it in the database',
    handler: scrapeData
});

// Export data in CSV or Excel format
yargs.command({
    command: 'export',
    describe: 'Export data in CSV or Excel format',
    builder: {
        format: {
            describe: 'Export format (CSV or Excel)',
            demandOption: true,
            type: 'string'
        },
        output: {
            describe: 'Output directory',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        exportData(argv.format, argv.output);
    }
});

// Create a new announcement
yargs.command({
    command: 'create',
    describe: 'Create a new announcement',
    builder: {
        title: {
            describe: 'Title of the announcement',
            demandOption: true,
            type: 'string'
        },
        date: {
            describe: 'Date of the announcement',
            demandOption: true,
            type: 'string'
        },
        description: {
            describe: 'Description of the announcement',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        addAnnouncement(argv.title, argv.date, argv.description);
    }
});

// Update an existing announcement
yargs.command({
    command: 'update',
    describe: 'Update an existing announcement',
    builder: {
        id: {
            describe: 'ID of the announcement to update',
            demandOption: true,
            type: 'string'
        },
        title: {
            describe: 'New title of the announcement',
            type: 'string'
        },
        date: {
            describe: 'New date of the announcement',
            type: 'string'
        },
        description: {
            describe: 'New description of the announcement',
            type: 'string'
        }
    },
    handler: (argv) => {
        updateAnnouncement(argv.id, argv.title, argv.date, argv.description);
    }
});

// Get an announcement by ID
yargs.command({
    command: 'get',
    describe: 'Get an announcement by ID',
    builder: {
        id: {
            describe: 'ID of the announcement to retrieve',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        getAnnouncementById(argv.id);
    }
});

// Delete an announcement by ID
yargs.command({
    command: 'delete',
    describe: 'Delete an announcement by ID',
    builder: {
        id: {
            describe: 'ID of the announcement to delete',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        deleteAnnouncement(argv.id);
    }
});

yargs.argv;
