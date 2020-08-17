const expect = require("chai").expect;
const albums = require("./data");


describe('getItem test', function () {
    //success condition
    it('Returns requested item', function () {
        let result = { title: '111', artist: 'Pabllo Vittar', year: '2020', tracks: '7'}
        expect(result).to.deep.equal(albums.getItem('111'));
    });
    //failure condition
    it('Item does not exist', () => {
        let result = albums.getItem("Chromatica");
        expect(result).to.be.undefined;
    })
});


describe('addItem test', function () {

    it('Adds item to albums', function () {
        let result = albums.addItem({ title: 'Chromatica', artist: 'Lady Gaga', year: '2020', tracks: '10' })
        expect(result.success).to.be.true;
    });

});



describe('deleteItem test', function () {

    it('Deletes item', function () {
        let result = albums.deleteItem("ArtPop")
        expect(result.success).to.be.true;
    });

    it('Item not found', function () {
        let result = albums.deleteItem("Cry Baby")
        expect(result.success).to.be.false;
    });
});