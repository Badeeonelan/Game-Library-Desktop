import { AbstractView } from '../../common/view.js';
import onChange from 'on-change';
import { Header } from '../../components/header/header.js';
import { Search } from '../../components/search/search.js';
import BooksList from '../../components/booksList/booksList.js';

export class MainView extends AbstractView {
	state = onChange({
		list: [],
		loading: false,
		searchQuery: undefined,
		offset: 0
	}, this.stateHook.bind(this));

	constructor(appState) {
		super();
		this.appState = onChange(appState, this.appStateHook.bind(this));
		this.setTitle('Поиск книг');
		this.app.addEventListener('click', this.addToFavourite.bind(this));
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render();
		}
	}

	async stateHook(path) {
		if (path === 'searchQuery') {
			this.state.loading = true;
			const list = await this.loadList(this.state.searchQuery);
			this.state.loading = false;
			this.state.list = list.results;
		}

		if (path === 'loading' || path === 'list') {
			this.render();
		}
	}

	async loadList(q) {
		const res = await fetch(`https://api.rawg.io/api/games?key=d87b7d3f951f4634bf7f87be318c5d93&search=${q}`);
		return res.json();
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
				
				console.log(this.appState)
			}


		}
	}

	render() {
		const main = document.createElement('div');
		main.prepend(new Header(this.appState).render());
		main.append(new Search(this.state).render());
		main.append(new BooksList(this.appState, this.state).render());
		this.app.innerHTML = '';
		this.app.append(main);
	}

	destroy() {
		this.app.removeEventListener('click', this.addToFavourite);
		console.log('Произошел дестрой')
	}
}