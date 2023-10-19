const mongoose = require('mongoose');
const Announcement = require('./webScraping');


let stopScraping = false;
async function addAnnouncement(data) {
    const newAnnouncement = new Announcement(data);
    await newAnnouncement.save();
    return newAnnouncement;
}

async function getAnnouncementById(id) {
    try {
        const announcement = await Announcement.findOne({ _id: id });

        if (!announcement) {
            console.log('Announcement not found.');
            stopScraping = true; // Set the flag to stop scraping
        } else {
            console.log('Announcement found:', announcement);
            stopScraping = true; // Set the flag to stop scraping
        }
    } catch (error) {
        console.error('Error while retrieving announcement:', error);
        stopScraping = true; // Set the flag to stop scraping in case of error
    }
}

async function updateAnnouncement(id, newData) {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
    });
    return updatedAnnouncement;
}

async function deleteAnnouncement(id) {
    return await Announcement.findByIdAndDelete(id);
}

module.exports = {
    addAnnouncement,
    getAnnouncementById,
    updateAnnouncement,
    deleteAnnouncement,
};
