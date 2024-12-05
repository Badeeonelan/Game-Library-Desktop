import './gamesItem.css';

export default class GamesItem {
    constructor(name, genre, posterURL, id, appState) {
        this.name = name;
        this.genre = genre;
        this.posterURL = posterURL;
        this.id = id;
        this.appState = appState;
    }

    checkFavourite() {
        if (this.appState.favorites.find(e => e.id == this.id)) {
            return true;
        } 
        return false;
    }

    render() {
        let favoriteClass = '';
        if (this.checkFavourite()) {
            favoriteClass = 'favourite-active';
        }
        const gameCard = document.createElement('li');
        gameCard.setAttribute('data-id', this.id)
        gameCard.classList.add('search-result__item');
        gameCard.innerHTML = `
            <div class='game-item__image-wrapper'>
                <img src='${this.posterURL}' class='game-item__image'/>
            </div>
            <div class='game-item__info'>
                <div class='game-item__description'>
                    <div class='game-item__genre'>${this.genre}</div>
                    <div class='game-item__name'>${this.name}</div>
                </div>
                <button class='game-item__favourite ${favoriteClass}' id='favourite-btn'>
                </button>
            </div>
        `;

        return gameCard;
    }
}