const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '../content');
if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir);
}

const dataFile = path.join(__dirname, '../data/siteContent.json');
const rawData = fs.readFileSync(dataFile, 'utf8');
const data = JSON.parse(rawData);

const files = {
    'company.json': {
        company: data.company,
        history: data.history,
        values: data.values,
        policies: data.policies,
        certificates: data.certificates
    },
    'homepage.json': {
        hero: data.hero,
        homeWhoWeAre: data.homeWhoWeAre,
        homeCapabilities: data.homeCapabilities,
        whyChooseUs: data.whyChooseUs,
        homeIndustries: data.homeIndustries,
        sectors: data.sectors,
        homeCta: data.homeCta
    },
    'about.json': {
        about: data.about,
    },
    'services.json': {
        capabilitiesOverview: data.capabilitiesOverview,
        services: data.services
    },
    'careers.json': {
        jobs: data.jobs
    },
    'contact.json': {
        contact: data.contact
    },
    'settings.json': {
        navVisibility: data.navVisibility,
        media: data.media
    }
};

for (const [filename, fileData] of Object.entries(files)) {
    fs.writeFileSync(path.join(contentDir, filename), JSON.stringify(fileData, null, 2));
    console.log(`Created ${filename}`);
}
