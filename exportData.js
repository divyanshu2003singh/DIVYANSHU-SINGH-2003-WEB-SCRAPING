const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const exceljs = require('exceljs');

const Announcement = require('./webScraping')

async function exportData(format, outputPath) {
    try {
        const records = await Announcement.find();

        if (format === 'csv') {
            const csvWriter = createCsvWriter({
                path: `${outputPath}/output.csv`,
                header: [
                    { id: 'type', title: 'Type of PA' },
                    { id: 'announcementDate', title: 'Date of Announcement' },
                    { id: 'submissionDeadline', title: 'Last date of Submission' },
                    { id: 'corporateDebtor', title: 'Name of Corporate Debtor' },
                    { id: 'applicant', title: 'Name of Applicant' },
                    { id: 'insolvencyProfessional', title: 'Name of Insolvency Professional' },
                    { id: 'publicAnnouncement', title: 'Public Announcement' },
                    { id: 'remarks', title: 'Remarks' }
                ],
            });
            await csvWriter.writeRecords(records);
            console.log('CSV data exported successfully.');
        } else if (format === 'excel') {
            const workbook = new exceljs.Workbook();
            const worksheet = workbook.addWorksheet('Announcements');

            // Header row
            worksheet.addRow([
                'Type of PA',
                'Date of Announcement',
                'Last date of Submission',
                'Name of Corporate Debtor',
                'Name of Applicant',
                'Name of Insolvency Professional',
                'Public Announcement',
                'Remarks'
            ]);

            // Parse date strings correctly and write data to Excel
            records.forEach(record => {
                const [day, month, year] = record.announcementDate.split('-');
                const parsedDate = new Date(`${year}-${month}-${day}`);
                
                worksheet.addRow([
                    record.type,
                    parsedDate,
                    record.submissionDeadline,
                    record.corporateDebtor,
                    record.applicant,
                    record.insolvencyProfessional,
                    record.publicAnnouncement,
                    record.remarks
                ]);
            });

            await workbook.xlsx.writeFile(`${outputPath}/output.xlsx`);
            console.log('Excel data exported successfully.');
        } else {
            console.error('Invalid export format specified.');
        }
    } catch (error) {
        console.error('Error during data export:', error);
    }
}

module.exports = exportData;
