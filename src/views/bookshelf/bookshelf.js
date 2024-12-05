import { AbstractView } from "../../common/view";
import { Header } from "../../components/header/header";
import FavList from "../../components/favList/favList";


export default class BookShelfView extends AbstractView {
    constructor(appState) {
        super();
        this.appState = appState;
        this.app.addEventListener('click', this.addToFavourite.bind(this));
    }

    addToFavourite(e) {
		if (e.target.getAttribute('id') === 'favourite-btn') {
			const currentID = e.target.closest('li').getAttribute('data-id');

			if (this.appState.favorites.find(e => e.id == currentID)) {
				this.appState.favorites = this.appState.favorites.filter(e => e.id != currentID);
			} else {
				const currentGame = this.state.list.find(e => e.id == currentID);

				this.appState.favorites.push(
					{ 
						id: currentID,
						data: currentGame

					});
			}

            this.render();
		}
	}

    render() {
        const shelf = document.createElement('div');
        shelf.prepend(new Header(this.appState).render());
        shelf.append(new FavList(this.appState).render());
        this.app.innerHTML = '';
        this.app.append(shelf);
    }
}