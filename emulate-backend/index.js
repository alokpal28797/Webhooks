import express from 'express';

const app = express();
const PORT = 5601;
app.use(express.json());
const message = []

app.post('/git-info', (req, res) => {
    try {
        const data = req.body;
        console.log("🚀 ~ app.post ~ data:", data)
        
        message.push(data);
        res.sendStatus(200);
    } catch (error) {
        console.log("🚀 ~ app.post ~ error:", error)

    }
})

app.get('/', (req, res) => {
    return res.json(message)
})


app.listen(PORT, () => console.log(`The port is running at ${PORT}`))