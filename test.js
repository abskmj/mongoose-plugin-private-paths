const expect = require("chai").expect;
const mongoose = require('mongoose');

const plugin = require('./index');

describe('Plugin', () => {

    beforeEach(() => {
        // clear all mongoose models
        mongoose.deleteModel(/.+/);
    })

    it('should remove path starting with prefix', () => {
        const schema = new mongoose.Schema({ name: String, _age: Number });
        schema.plugin(plugin);

        const Model = mongoose.model('model', schema);

        const model = new Model();

        model.name = 'abskmj';
        model._age = 100;

        expect(model.toObject()).not.to.have.property('_age');
    });

    describe('options', () => {

        it('should change prefix', () => {
            const schema = new mongoose.Schema({ name: String, $age: Number });
            schema.plugin(plugin, { prefix: '$' });

            const Model = mongoose.model('model', schema);

            const model = new Model();

            model.name = 'abskmj';
            model.$age = 100;

            expect(model.toObject()).not.to.have.property('$age');

        });

        it('should retain path in ignore list', () => {

            const schema = new mongoose.Schema({ name: String, _age: Number });
            schema.plugin(plugin, {
                ignore: ['_age']
            });

            const Model = mongoose.model('model', schema);

            const model = new Model();

            model.name = 'abskmj';
            model._age = 100;

            expect(model.toObject()).to.have.property('_age');
            expect(model.toObject()).to.have.property('_id');

        })

    })


});
