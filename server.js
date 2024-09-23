const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const formatCurrency = (value) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
};

const calculateDiscount = (fullPrice, offeredPrice) => {
    return Math.round(((fullPrice - offeredPrice) / fullPrice) * 100);
};

const formatLevel = (level) => {
    const levels = {
        "bacharelado": "Graduação (bacharelado) 🎓",
        "tecnologo": "Graduação (tecnólogo) 🎓",
        "licenciatura": "Graduação (licenciatura) 🎓"
    };
    return levels[level];
};

const formatKind = (kind) => {
    return kind === 'presencial' ? 'Presencial 🏫' : 'EaD 🏠';
};

// Listagem de Ofertas
app.get('/offers', (req, res) => {
    let offers = data.offers;

    // Filtragem
    const { level, kind, minPrice, maxPrice, search, page = 1, limit = 10 } = req.query;

    if (level) {
        offers = offers.filter(offer => offer.level === level);
    }

    if (kind) {
        offers = offers.filter(offer => offer.kind === kind);
    }

    if (minPrice) {
        offers = offers.filter(offer => offer.offeredPrice >= parseFloat(minPrice));
    }

    if (maxPrice) {
        offers = offers.filter(offer => offer.offeredPrice <= parseFloat(maxPrice));
    }

    if (search) {
        offers = offers.filter(offer => offer.courseName.toLowerCase().includes(search.toLowerCase()));
    }

    // Paginação
    const totalOffers = offers.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    offers = offers.slice(startIndex, endIndex).map(offer => ({
        courseName: offer.courseName,
        rating: offer.rating,
        fullPrice: formatCurrency(offer.fullPrice),
        offeredPrice: formatCurrency(offer.offeredPrice),
        discount: `${calculateDiscount(offer.fullPrice, offer.offeredPrice)}% 📉`,
        kind: formatKind(offer.kind),
        level: formatLevel(offer.level),
        iesName: offer.iesName,
        iesLogo: offer.iesLogo
    }));

    res.json({
        total: totalOffers,
        page,
        limit,
        offers
    });
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
