import { DivComponent } from "../../common/div-component";
import GamesItem from "../gamesItem/gamesItem";

export default class FavList extends DivComponent {
    constructor(appState) {
        super();
        this.appState = appState;
    }

    renderTitle() {
        const title = document.createElement('h2');
        title.classList.add('search-result__title');
        title.innerText = `Избранных игр - ${this.appState.favorites.length}`;

        return title;
    }

    renderList() {
        const list = document.createElement('div');
        list.classList.add('search-result__wrapper');
        const elementsList = this.appState.favorites.map(function(game) {
            let genre = null;
            if (game.data.genres.length > 0) {
                genre = game.data.genres[0].name;
            } else {
                genre = 'Жанр отсутствует';
            }
            const item = new GamesItem(game.data.name, genre, game.data.background_image, game.id, this.appState).render();
            return item;
        }.bind(this))
        list.innerHTML = `
            <ul class="search-result__list">
                ${
                    [...elementsList].map(element => element.outerHTML).join('')
                }
            </ul>`
        
        return list;
    }

    render() {
        const title = this.renderTitle();
        const list = this.renderList();
        this.el.classList.add('search-result');
        this.el.prepend(title);
        this.el.append(list);

        return this.el;
    }
}