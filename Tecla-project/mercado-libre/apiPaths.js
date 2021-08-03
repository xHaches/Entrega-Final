const baseUrl = 'https://api.mercadolibre.com';

const SITE_ID = 'MLM';

const CATEGORY_ID = 'MLM1648';

const trendsUrl = (SITE_ID, CATEGORY_ID) => `${baseUrl}/trends/${SITE_ID}/${CATEGORY_ID}`;

const searchByNameUrl = (SITE_ID, NAME) => `${baseUrl}/sites/${SITE_ID}/search?q=${NAME}`;

const getCategoriesUrl = (SITE_ID) => `${baseUrl}/sites/${SITE_ID}/categories`;

module.exports = {
    SITE_ID,
    CATEGORY_ID,
    trendsUrl,
    searchByNameUrl,
    getCategoriesUrl
}