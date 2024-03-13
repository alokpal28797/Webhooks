import mongoose from "mongoose";

const webhooksSchemqa = new mongoose.Schema({

    commit: {
        type: Array,
    },
    push: {
        type: Array,
    },
    merge: {
        type: Array,
    }, 
}, { timestamp: true });


const Webhooks = new mongoose.model('webhooks',webhooksSchemqa)

export default Webhooks;