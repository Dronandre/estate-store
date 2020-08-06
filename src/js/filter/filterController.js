import Filter from './filterModel';
import * as view from './filterView';

export default async function(state){
    
    // Создаем объект фильтра
    if (!state.filter) state.filter = new Filter();
    // Получаем данные для фильтра
    await state.filter.getParams();

    view.render(state.filter.params);

    // Запрос на сервер
    await state.filter.getResults();
    state.results = state.filter.result;

    // Обновляем кнопку
    view.changeButtonText(state.filter.result.length);

    // Прослушка объектов формы
    const form = document.querySelector('#filter-form');

    form.addEventListener('change', async function(e){
        e.preventDefault();
        state.filter.query = view.getInput();
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);
    })

    form.addEventListener('reset', async function(){
        state.filter.query = '';
        await state.filter.getResults();
        state.results = state.filter.result;
        view.changeButtonText(state.filter.result.length);
    })

    form.addEventListener('submit', function(e){
        e.preventDefault();
        state.emitter.emit('event:render-listing', {});
    })
}