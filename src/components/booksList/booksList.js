import { DivComponent } from "../../common/div-component";
import GamesItem from "../gamesItem/gamesItem";
import './booksList.css';

export default class BooksList extends DivComponent {
    constructor(appState, parentState) {
        super();
        this.list = parentState.list;
        this.appState = appState;
        this.parentState = parentState;
    }

    renderTitle() {
        const title = document.createElement('h2');
        title.classList.add('search-result__title');
        title.innerText = `Найдено игр - ${this.list.length}`;

        return title;
    }

    renderList() {
        const list = document.createElement('div');
        list.classList.add('search-result__wrapper');
        const elementsList = this.list.map(function(game) {
            let genre = null;
            if (game.genres.length > 0) {
                genre = game.genres[0].name;
            } else {
                genre = 'Жанр отсутствует';
            }
            const item = new GamesItem(game.name, genre, game.background_image, game.id, this.appState).render();
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
        if (this.parentState.loading) {
            const loadElem = document.createElement('div');
            loadElem.classList.add('search-result__loading')
            loadElem.innerText = 'Идет загрузка';
            console.log('Произошла загрузка')
            return loadElem;
        }

        const title = this.renderTitle();
        const list = this.renderList();
        this.el.classList.add('search-result');
        this.el.prepend(title);
        this.el.append(list);

        

        return this.el;
    }
}