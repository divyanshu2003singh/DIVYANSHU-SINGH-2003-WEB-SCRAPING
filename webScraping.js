const request = require("request");
const cheerio = require("cheerio");
const mongoose = require('mongoose');

mongoose.connect('your mongoDB url goes here', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database.');
});

const announcementSchema = new mongoose.Schema({
    type: String,
    announcementDate: String,
    submissionDeadline: String,
    corporateDebtor: String,
    applicant: String,
    insolvencyProfessional: String,
    publicAnnouncement: String,
    remarks: String,
});

const Announcement = mongoose.model('Announcement', announcementSchema);

let shouldContinueScraping = true;

async function fetchPageData(pageNumber) {
    const pageURL = `https://ibbi.gov.in/en/public-announcement?page=${pageNumber}`;
    return new Promise((resolve, reject) => {
        request(pageURL, async (error, response, html) => {
            if (error) {
                reject(error);
                return;
            }

            const $ = cheerio.load(html);
            const announcements = [];

            $('.table-responsive table tbody tr').each((index, element) => {
                const columns = $(element).find('td');
                const type = columns.eq(0).text().trim();
                const announcementDate = columns.eq(1).text().trim();
                const submissionDeadline = columns.eq(2).text().trim();
                const corporateDebtor = columns.eq(3).text().trim();
                const applicant = columns.eq(4).text().trim();
                const insolvencyProfessional = columns.eq(5).text().trim();
                const remarks = columns.eq(7).text().trim();

                const pdfElement = columns.eq(6).find('a');
                const pdfLink = pdfElement.attr('onclick').match(/'(.*?)'/)[1].trim();

                announcements.push({
                    type,
                    announcementDate,
                    submissionDeadline,
                    corporateDebtor,
                    applicant,
                    insolvencyProfessional,
                    publicAnnouncement: pdfLink,
                    remarks,
                });

                // Check if the current announcement matches the desired ID
               
            });

            // Store data in MongoDB
            try {
                await Promise.all(announcements.map(async (announcement) => {
                    const newAnnouncement = new Announcement(announcement);
                    await newAnnouncement.save();
                    console.log('Saved Announcement:', announcement);
                }));
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });
}

async function scrapeDataWithPagination() {
    let currentPage = 1;
    const maxPages = 400; // Set the maximum number of pages to scrape

    async function scrapePages(pageNumber) {
        if (shouldContinueScraping) {
            await fetchPageData(pageNumber);
        }
        if (pageNumber < maxPages) {
            await scrapePages(pageNumber + 1);
        } else {
            console.log('Scraping completed and data stored.');
            mongoose.disconnect();
        }
    }

    // Start fetching data from the first page
    await scrapePages(currentPage);
}

scrapeDataWithPagination().catch(error => console.error('Error during scraping:', error));

module.exports = Announcement;
