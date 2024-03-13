import express from 'express';
import Webhooks from './models/url.js';
import mongoose from 'mongoose';
import axios from 'axios';

const app = express();
const PORT = 5600;
app.use(express.json());

const webhooks = {
    COMMIT: [],
    PUSH: [],
    MERGE: []
}


app.post('/api/webhooks', async (req, res) => {
    try {
        const { payloadUrl, secret, eventTypes } = req.body;
        console.log("🚀 ~ app.post ~ eventTypes:", eventTypes)

        // eventTypes.forEach(async (eventType) => {

        //     const res = await Webhooks.create({
        //         [eventType]: {
        //             payloadUrl,
        //             secret
        //         }
        //     })
        //     console.log("🚀 ~ eventTypes.forEach ~ res:", res)
        // });


        eventTypes.forEach(eventType => {

            webhooks[eventType].push({ payloadUrl, secret });

        });

        return res.sendStatus(201);
    } catch (error) {
        console.log("🚀 ~ app.post ~ error:", error)

    }

})

app.post('/api/event-emulate', (req, res) => {
    try {

        const { type, data } = req.body;


        setTimeout(async () => {

            const WebhooksList = webhooks[type];
            for (let i = 0; i < WebhooksList.length; i++) {
                const webhook = WebhooksList[i];
                const { payloadUrl, secret } = webhook;
                try {
                    const res = await axios.post(payloadUrl, data, {
                        headers: {
                            'x-secret': secret
                        }
                    })
                } catch (error) {
                    console.log("🚀 ~ setTimeout ~ error:", error)

                }

            }


        }, 0)

        res.sendStatus(200);
    } catch (error) {
        console.log("🚀 ~ app.post ~ error:", error)

    }

})


app.get('/api/db', (req, res) => {
    res.json(webhooks)
})


mongoose.connect('mongodb://0.0.0.0:27017/short-url').then(() => console.log(`MongoDB connection established`));
app.listen(PORT, () => console.log(`The port is running at ${PORT}`))