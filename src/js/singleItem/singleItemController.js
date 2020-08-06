import SingleItem from './singleItemModel.js';
import * as view from './singleItemView.js';

export default async function(state){
    // Создаем новый объект
    state.singleItem = new SingleItem(state.routeParams);
    // Получаем данные с сервера
    await state.singleItem.getItem();
    // Рендерим карточку
    view.render(state.singleItem.result, state.favourites.isFav(state.singleItem.id));

    
    // Запуск прослушки событий


    // Открытие модалки
    document.querySelector('.button-order').addEventListener('click', ()=>{
        view.showModal();
    });

    // Закрытие модалки 
    document.querySelector('.modal__close').addEventListener('click', ()=>{
        view.hideModal();
    });

    // Закрытие модалки - клик по оверлею
    document.querySelector('.modal-wrapper').addEventListener('click', (event)=>{
        if (event.target.closest('.modal')) {
            return null;
        } else {
            view.hideModal();
        } 
    });

    // Отправка форм
    document.querySelector('.modal__form').addEventListener('submit', async function(e){
        e.preventDefault();
        const formData = view.getInput();        
        await state.singleItem.submitForm(formData);

        const response = state.singleItem.response;

        if (response.message === 'Bid Created') {
            alert('Ваша заявка успешно принята!');
            view.hideModal();
            view.clearInput();
        } else if(response.message === 'Bid Not Created'){
            response.errors.forEach(item => {
                alert(item);
            });
        }
    });

    // Клик по кнопке добавить в избранное

    document.querySelector('#addToFavouriteBtn').addEventListener('click', ()=>{
        state.favourites.toggleFav(state.singleItem.id);
        view.toggleFavouriteBtn(state.favourites.isFav(state.singleItem.id));
    })


}