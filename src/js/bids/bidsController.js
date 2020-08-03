import * as view from './bidsView.js';
import Bids from './bidsModel.js'

export default async function(state){   
    // Создаем объект модели с заявками
    if( !state.bids) state.bids = new Bids();
    // Получение данных заявок с сервера 
    await state.bids.getBids();
    // Рендерим заявки
    view.renderBids(state.bids.bids);
}