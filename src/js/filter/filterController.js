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

    // Обновляем кнопку
    view.changeButtonText(state.filter.result.length);

    // Прослушка объектов формы
    const form = document.querySelector('#filter-form');

    form.addEventListener('change', function(e){
        e.preventDefault();
        state.filter.query = view.getInput();
        console.log("state.filter.query", state.filter.query)
    })
}