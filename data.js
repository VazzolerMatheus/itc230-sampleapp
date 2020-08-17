// console.log('data imported')

let albums = [
	{title:'Born this way', artist:'Lady Gaga', year:'2010', tracks:'14'},
	{title:'111', artist:'Pabllo Vittar', year:'2020', tracks:'7'},
	{title:'Nao Para Nao', artist:'Pabllo Vittar', year:'2019', tracks:'10'},
	{title:'Norman Rockwell', artist:'Lana Del Rey', year:'2019', tracks:'12'},
	{title:'ArtPop', artist:'Lady Gaga', year:'2016', tracks:'11'}
]


exports.getAll = () => {
	return albums
}

exports.getItem = (title) => {

    return albums.find((albums) => {

    return albums.title === title;

    })
};

exports.addItem = (addAlbum) => { 

    
    albums.push(addAlbum)

    return { 'success': true }
    }


exports.deleteItem = (title) => {

    if (albums.some(item => item.title === title) === false) {
        return { 'success': false }

    }

    else {

        let newAlbum = albums.filter(albums => albums.title !== title)
        return { 'success': true }
    }
}