const mongoose = require("mongoose"),

    schema = mongoose.Schema,

    projetoSchema = new schema({
        id: {
            type: schema.Types.String,
            required: false,
        },
        img: {
            type: schema.Types.Mixed,
            value: String,
            name: String,
            required: true
        },
        titulo: {
            type: schema.Types.Mixed,
            value: String,
            name: String,
            required: true
        },
        texto: {
            type: schema.Types.Mixed,
            value: String,
            name: String,
            required: true
        }
    });

module.exports = mongoose.model("projeto", projetoSchema);