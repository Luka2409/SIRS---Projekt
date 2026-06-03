//Uvoz biblioteka i priprema servera
const express=require("express");
const axios=require("axios");
const cors=require("cors");
const path=require("path");
const app=express();
const PORT=3000;

//Aktiviranje cors-a
app.use(cors());

//Postavljanje mape za posluživanje statičnih datoteka
app.use(express.static(path.join(__dirname, '')));

//Ruta za početnu stranicu
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Ruta za dohvaćanje podataka za eure
app.get('/euro', async(req, res)=> {
    try {
        const odgovor=await axios.get('https://v6.exchangerate-api.com/v6/c88120567d438416755a5dfb/latest/EUR');
        res.json({
        izvor:'https://app.exchangerate-api.com/dashboard',
        marka:odgovor.data.conversion_rates.BAM,
        dolar:odgovor.data.conversion_rates.USD,
        funti:odgovor.data.conversion_rates.GBP
        });
    }
    catch(error) {
        res.status(500).json({error:"Greška pri dohvatu"});
    }
});

//Ruta za dohvaćanje podataka za marke
app.get('/marka', async(req, res)=> {
    try {
        const odgovor=await axios.get('https://v6.exchangerate-api.com/v6/c88120567d438416755a5dfb/latest/BAM');
        res.json({
        izvor:'https://app.exchangerate-api.com/dashboard',
        euro:odgovor.data.conversion_rates.EUR,
        dolar:odgovor.data.conversion_rates.USD,
        funti:odgovor.data.conversion_rates.GBP
        });
    }
    catch(error) {
        res.status(500).json({error:"Greška pri dohvatu"});
    }
});

//Ruta za dohvaćanje podataka za dolare
app.get('/dolar', async(req, res)=> {
    try {
        const odgovor=await axios.get('https://v6.exchangerate-api.com/v6/c88120567d438416755a5dfb/latest/USD');
        res.json({
        izvor:'https://app.exchangerate-api.com/dashboard',
        marka:odgovor.data.conversion_rates.BAM,
        euro:odgovor.data.conversion_rates.EUR,
        funti:odgovor.data.conversion_rates.GBP
        });
    }
    catch(error) {
        res.status(500).json({error:"Greška pri dohvatu"});
    }
});

//Ruta za dohvaćanje podataka za funte
app.get('/funti', async(req, res)=> {
    try {
        const odgovor=await axios.get('https://v6.exchangerate-api.com/v6/c88120567d438416755a5dfb/latest/GBP');
        
        res.json({
        izvor:'https://app.exchangerate-api.com/dashboard',
        marka:odgovor.data.conversion_rates.BAM,
        dolar:odgovor.data.conversion_rates.USD,
        euro:odgovor.data.conversion_rates.EUR
        });
    }
    catch(error) {
        res.status(500).json({error:"Greška pri dohvatu"});
    }
});

app.listen(PORT, ()=> {
    console.log(`Server radi na portu ${PORT}`);
});