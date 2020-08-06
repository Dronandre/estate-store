import * as view from './listingView';

export default function(state){
    view.render();

    state.results.forEach(item => {
        view.renderCard(item, state.favourites.isFav(item.id));
    });

    addToFavsListiner()

    state.emitter.subscribe('event:render-listing', ()=>{
        
        view.clearListingContainer();

        state.results.forEach(item => {
            view.renderCard(item, state.favourites.isFav(item.id));
        });

        addToFavsListiner()
    });

    function addToFavsListiner(){
        Array.from(document.getElementsByClassName('card__like')).forEach((item)=>{
            item.addEventListener('click', (e)=>{
                e.preventDefault();
                const currentId = e.target.closest('.card').dataset.id;
                state.favourites.toggleFav(currentId);
                view.toggleFavoriteIcon(e.target.closest('.card__like'), state.favourites.isFav(currentId));
            })
        });
    }

    


}