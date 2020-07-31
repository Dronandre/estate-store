import singleItem from "./../singleItem/singleItemController"

export default function (state){
    // Очищаем контейнер
    document.querySelector("#app").innerHTML = '' ;
    // Запускаем контроллер
    singleItem(state);

}