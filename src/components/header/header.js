import { DivComponent } from '../../common/div-component';
import './header.css';

export class Header extends DivComponent {
	constructor(appState) {
		super();
		this.appState = appState;
	}

	render() {
		this.el.innerHTML = '';
		this.el.classList.add('header');
		this.el.innerHTML = `
			<div>
				<img src="/static/logo.svg" alt="Логотип" />
			</div>
			<div class="menu">
				<a class="menu__item ${location.hash == '' ? 'bold' : ''}" href="#">
					<img src="/static/search.svg" alt="Поиск иконка" />
					Поиск книг
				</a>
				<a class="menu__item ${location.hash == '#favorites' ? 'bold' : ''}" href="#favorites">
					<img src="/static/favorites.svg" alt="Избранное иконка" />
					Избранное
				</a>
				<div class="menu__counter">
					${this.appState.favorites.length}
				</div>
			</div>
		`;
		return this.el;
	}
}