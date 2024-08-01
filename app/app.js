const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Изначальные значения на сервере
let usdtInfo = 0;
let balanceInfo = 0;
let canDedInfo = 0;

app.get('/api/info', (req, res) => {
    res.json({ usdtInfo, balanceInfo, canDedInfo });
});

app.post('/api/update', (req, res) => {
    balanceInfo += 10;
    canDedInfo += 10;
    usdtInfo += 10;
    res.json({ usdtInfo, balanceInfo, canDedInfo });
});

app.post('/send-to-wallet', (req, res) => {
    const walletAddress = req.body.address;
    const amount = req.body.amount;

    if (!walletAddress) {
        return res.status(400).json({ success: false, message: 'Адрес кошелька не указан.' });
    }

    if (canDedInfo >= 20 && canDedInfo >= amount) {
        balanceInfo -= amount;
        canDedInfo -= amount;
        res.json({ success: true, message: `Средства успешно отправлены на адрес: ${walletAddress}.`, balanceInfo, canDedInfo });
    } else {
        res.json({ success: false, message: 'Недостаточно средств для списания.' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
