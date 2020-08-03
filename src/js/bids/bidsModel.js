export default class Bids {
    constructor(){

    }

    async getBids(){        
        try {
            const queryStrings = `http://jsproject.webcademy.ru/bids`;
            const result = await fetch(queryStrings);
            const data = await result.json();
            this.bids = await data;            
        } catch (error) {
            alert('Error with getting Bids');
            console.log(error);
        }
    }

}